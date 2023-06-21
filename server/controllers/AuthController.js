let dbConnection = require('./DatabaseController') 
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = require('../config/poolCognitoConfig')
const jwt = require('../config/jwtConfig')

//pass our user pool data to identify cognito user pool 
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/**
 * Verify token from client
 * @param  client_result 
 * @returns boolean (verify integrity)
 */
const verifyTokens = async (client_result) => {
  let isAccessTokenValid =  await jwt.verifyUserAutentecity(client_result.accessToken, client_result.client_id)
  let isIdTokenValid =  await jwt.verifyUserAutentecity(client_result.idToken, client_result.client_id)
  return isAccessTokenValid === isIdTokenValid
}

/**
 * @param {*} result 
 * @description set cookie for user
 * @returns list with uid and expire date
 */
const setCookie = async (result,res) => {

  let act = {accessToken: result.getAccessToken().getJwtToken()}

  let idt = {idToken: result.getIdToken().getJwtToken()}

  let rft = {refreshToken: result.getRefreshToken().getJwtToken}

  const accessToken = jwt.generateAccessToken(act)
  const idToken = jwt.generateAccessToken(idt)
  const refreshToken = jwt.generateAccessToken(rft) 

  const username = result.getIdToken().payload['cognito:username']; 

  const uid = jwt.encryptID(username)  

  let dateExpire = new Date(Date.now() + 7200000) //date now and more 30 minutes

  res.cookie("accessToken", accessToken, {
    httpOnly: true, 
    secure: true, 
    sameSite: 'None',
    expires: dateExpire
    
  })

  res.cookie("idToken", idToken, {
    httpOnly: true, 
    secure: true, 
    expires: dateExpire,
    sameSite: 'None' });
  
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, 
    secure: true, 
    expires: dateExpire,
    sameSite: 'None'});
  
  res.cookie("userSession", uid, {
    httpOnly: true, 
    secure: true, 
    expires: dateExpire,
    sameSite: 'None', });

}

/**
 * Handling user sign in
 * @param authenticationData
 * @param userData
 * @param client_result
 * @param response
 * @returns newPromise with succes or fail
 */
const handlerSignIn = async (authenticationData, userData,res) => { 

  // that represents the authentication details of a user who is attempting to authenticate with Amazon Cognito
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  //that represents a user in an Amazon Cognito user pool
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return await new Promise((resolve, reject) => {
      
    //that is used to authenticate a user with their password  
    cognitoUser.authenticateUser(authenticationDetails, {

      //if user is succeful authenticated
      onSuccess: (result) => {
        setCookie(result,res)
        resolve(true);
        
      },

      //if user fail to authenticate
      onFailure: (err) => {
        reject(false);
      },

      // This callback is invoked when a user's password is expired or requires a reset
      // Here, you can prompt the user to provide a new password and then call cognitoUser.completeNewPasswordChallenge()
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        cognitoUser.completeNewPasswordChallenge(password, [], {
          onSuccess: (result) => {
            setCookie(result,res)
            resolve(true);
          },
          onFailure: (err) => {
            reject(false);
          },
        });
      }

    });
  }); 

}

/**
* Sign in user
* @param req //request from client
* @param res //response from server
* @returns: a user data and token
* */
const signIn = async (req, res) => { 

  try {
    let email = req.query.email
    let password = req.query.password


    const authenticationData = {
      Username: email,
      Password: password
    };

    const userData = {
      Username: email,
      Pool: userPool
    };
    
    //const isValidTokens = await verifyTokens(client_result) 

   // ((if(isValidTokens) {

      let data = await handlerSignIn(authenticationData, userData, res)       
      
      return res.send(data) 
    //}

    //return res.send(false); 

  }

  catch (error){
    
    return res.status(500).json({ error: error, message: err.message });


  }

};


const registerUser = async (req,res) => { 

  try {

    let name = req.query.name
    let password = req.query.verify
    let email = req.query.email
    let user_type = req.query.user_type
    let uid = req.query.uid  
  
    let tokenFinal = jwt.encryptID(password)
  
    const statement = "INSERT INTO " +  user_type + "s (uid, verify, name, email) VALUES ?"; 
  
    let result = await dbConnection(statement, [[uid,tokenFinal, name,email]]);
  
    if (result === "error") {
      
  
    }
  
    return res.send("Consumer has been created");

  }

  catch {
    return res.send(null);
  }



}

/**
 * Verify password 
 * @params request from client
 * @return boolean
 */
const verifyPassword = async (req, res) => { 

  try {

    const uid_encrypt = req.cookies.userSession;
    let uid_decrypt = jwt.decryptID(uid_encrypt) 

    const statement = "SELECT * FROM users WHERE uid='"+uid_decrypt+"';"
    let result = await dbConnection(statement) 
    const user_type = result[0].user_type + "s"

    const statement2 = "SELECT * FROM " + user_type + " WHERE uid='"+uid_decrypt+"';"
    let result2 = await dbConnection(statement2) 
    const tokenDecrypt = jwt.decryptID(result2[0].verify)

    return res.send(tokenDecrypt === req.query.token);
  }

  catch {

    return res.send(false);
  }
  
}


const setChange = async (authenticationData,userData,oldPassword,newPassword) => {

    // that represents the authentication details of a user who is attempting to authenticate with Amazon Cognito
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    //that represents a user in an Amazon Cognito user pool
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);  

    return new Promise((resolve, reject) => { 
  
    cognitoUser.authenticateUser(authenticationDetails, {

    onSuccess: function(result) {

      cognitoUser.changePassword(oldPassword, newPassword, function(error, result) {
        if(error) {
          reject(false)
        }
        resolve(true)
      })
    },

    onFailure: function(error) {
      reject(false)
    }

    })

  });
}

/**
 * Chnage password 
 * @params request from client
 * @return boolean
 */
const changePassword = async (req, res) => { 

  try {

    const uid_encrypt = req.cookies.userSession;
    let uid_decrypt = jwt.decryptID(uid_encrypt) 

    const statement = "SELECT * FROM users WHERE uid='"+uid_decrypt+"';"
    let result = await dbConnection(statement) 
    const user_type = result[0].user_type + "s"

    const statement2 = "SELECT * FROM " + user_type + " WHERE uid='"+uid_decrypt+"';"
    let result2 = await dbConnection(statement2) 
    const tokenDecrypt = jwt.decryptID(result2[0].verify)

    const authenticationData = {
      Username: result2[0].email,
      Password: tokenDecrypt
    };

    const userData = {
      Username: result2[0].email,
      Pool: userPool
    };

    let boolean = await setChange(authenticationData,userData, tokenDecrypt, req.query.newToken) 

    if(boolean) {

      const statement = "UPDATE " +  user_type + " SET verify=" + "'" + jwt.encryptID(req.query.newToken) + "' "
                        +  "WHERE uid=" + "'" + uid_decrypt + "'"

      let result = await dbConnection(statement);

      if (result === "error") {
        return res.send(false);
      }
    }

    return res.send(boolean)

  }

  catch {

    return res.send(false)
    
  }
}

const setDelete = async (authenticationData,userData) => {

  // that represents the authentication details of a user who is attempting to authenticate with Amazon Cognito
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  //that represents a user in an Amazon Cognito user pool
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);  

  return new Promise((resolve, reject) => { 

  cognitoUser.authenticateUser(authenticationDetails, {

  onSuccess: function(result) {

    cognitoUser.deleteUser(function(error, result) {
      if(error) {
        reject(false)
      }
      resolve(true)
    })
  },

  onFailure: function(error) {
    reject(false)
  }

  })

});
}

/**
 * Chnage password 
 * @params request from client
 * @return boolean
 */
const deleteAccount = async (req, res) => { 

  try {

    const uid_encrypt = req.cookies.userSession;
    let uid_decrypt = jwt.decryptID(uid_encrypt) 

    const statement = "SELECT * FROM users WHERE uid='"+uid_decrypt+"';"
    let result = await dbConnection(statement) 
    const user_type = result[0].user_type + "s"  

    let statement3 = ""
    let statement4 = "" 

    if(user_type === "suppliers") {
      statement3 = "SELECT * FROM orderedProducts WHERE product_owner_uid='"+uid_decrypt+"' AND (order_status='A confirmar' OR order_status='Enviado' OR order_status='Em preparação');"

    }
    else {
      statement3 = "SELECT * FROM orderedProducts WHERE product_buyer_uid='"+uid_decrypt+"' AND (order_status='A confirmar' OR order_status='Enviado' OR order_status='Em preparação');"
    }

    let result3 = await dbConnection(statement3) 

    if(result3.length > 0) {
      return res.send(false)
    }

    if(user_type === "suppliers") {
      statement4 = "SELECT * FROM ads WHERE supplier_id='"+result[0].id_user_type+"' AND status=1;"
      let result4 = await dbConnection(statement4)  
      if(result4.length > 0) {
        return res.send(false)
      }
    }

    const statement2 = "SELECT * FROM " + user_type + " WHERE uid='"+uid_decrypt+"';"
    let result2 = await dbConnection(statement2) 
    const tokenDecrypt = jwt.decryptID(result2[0].verify)

    const authenticationData = {
      Username: result2[0].email,
      Password: tokenDecrypt
    };

    const userData = {
      Username: result2[0].email,
      Pool: userPool
    };

    let boolean = await setDelete(authenticationData,userData) 

    if(boolean) {
      const deactivate = `UPDATE ` + user_type + ` SET status='0' WHERE uid='${uid_decrypt}'`;
      await dbConnection(deactivate);
      res.clearCookie('refreshToken', { httpOnly: true, path: '/' });
      res.clearCookie('identification', { httpOnly: true, path: '/' });
      res.clearCookie('idToken', { httpOnly: true, path: '/' });
      res.clearCookie('userSession', { httpOnly: true, path: '/' });
      res.clearCookie('accessToken', { httpOnly: true, path: '/' });
    }
    return res.send(boolean)

  }
    catch {
      return res.send(false)
    }

}


/**
 * Verify user type
 * @params request from client
 * @return userType
 */
const getUserType = async (req, res) => { 

  try {
    
    const uid_encrypt = req.cookies.userSession;

    let uid_decrypt = jwt.decryptID(uid_encrypt) 

    const statement = "SELECT * FROM users WHERE uid='"+uid_decrypt+"';"

    let result = await dbConnection(statement) 

    const user_type = result[0].user_type

    const name = result[0].name.split(" ")[0]

    return res.send([user_type,name]);
  }
  catch(error) {
    res.clearCookie('refreshToken', { httpOnly: true, path: '/' });
    res.clearCookie('identification', { httpOnly: true, path: '/' });
    res.clearCookie('idToken', { httpOnly: true, path: '/' });
    res.clearCookie('userSession', { httpOnly: true, path: '/' });
    res.clearCookie('accessToken', { httpOnly: true, path: '/' });
    return res.send(false);
}

}


const checkEmail = async (req, res) => { 

  try {
    const statement = "SELECT * FROM users WHERE email='"+req.query.email+"';" 
    let result = await dbConnection(statement)  

    if(result.length > 0) {
      return res.send(false)
    }
    return res.send(true)

  }
  catch (error) {
    return res.send(false)
  }

}

const checkUserDeactivated = async (req, res) => { 

  try {

    const uid_encrypt = req.cookies.userSession;

    let uid_decrypt = jwt.decryptID(uid_encrypt)  

    const statement = "SELECT * FROM users WHERE uid='"+uid_decrypt+"';"

    let result = await dbConnection(statement) 

    const user_type = result[0].user_type + "s"

    const statement2 = "SELECT * FROM " + user_type + " WHERE uid='"+uid_decrypt+"';"

    let result2 = await dbConnection(statement2)  

    if(result2[0].status === 0) {
      return res.send(true)
    }
    return res.send(false)
  }
  catch (error) {
    return res.send(true)
  }

}




const logout = async (req, res) => { 
  try {
    res.clearCookie('refreshToken', { httpOnly: true, path: '/' });
    res.clearCookie('identification', { httpOnly: true, path: '/' });
    res.clearCookie('idToken', { httpOnly: true, path: '/' });
    res.clearCookie('userSession', { httpOnly: true, path: '/' });
    res.clearCookie('accessToken', { httpOnly: true, path: '/' });
    res.status(200).send('LogOut');
  }
  catch (error) {
    res.status(500);
  }
}

module.exports = {signIn, registerUser, verifyPassword, changePassword, deleteAccount, getUserType, checkEmail, checkUserDeactivated, logout}