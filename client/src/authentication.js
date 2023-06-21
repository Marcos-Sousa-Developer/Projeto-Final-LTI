import axios from 'axios'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import poolData from "./config/poolCognitoConfig"; 

//pass our user pool data to identify cognito user pool 
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/**
 * Verify login from user to server
 * @param email 
 * @param password 
 * @param result (tokens)
 * @returns boolean user is authenticated
 */
const serverVerifyLogin = async(email, password) => { 
    
    let params = {
        email : email,
        password: password,
    }
            
    return await new Promise((resolve,reject) => {
        
        axios.post('/signIn', null, {params: params})
    
        .then((response) => {
            localStorage.clear();
            console.log(response)
            resolve(response.data)
        })
        
        .catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

/**
* Sign in user
* @param email //request from client
* @param password //response from server
* @returns: a user data and token
* */
const signIn = async (email, password) => { 

  try {

    const authenticationData = {
      Username: email,
      Password: password
    };
    
    // that represents the authentication details of a user who is attempting to authenticate with Amazon Cognito
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  
    const userData = {
      Username: email,
      Pool: userPool
    };
      
    //that represents a user in an Amazon Cognito user pool
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    return await new Promise((resolve, reject) => {
        
        //that is used to authenticate a user with their password  
        cognitoUser.authenticateUser(authenticationDetails, {
  
        //if user is succeful authenticated
        onSuccess: (result) => {
          localStorage.clear();
          resolve( serverVerifyLogin(email, password))
        },
  
          //if user fail to authenticate
        onFailure: (err) => {
          reject(err);
        },
  
          // This callback is invoked when a user's password is expired or requires a reset
          // Here, you can prompt the user to provide a new password and then call cognitoUser.completeNewPasswordChallenge()
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          cognitoUser.completeNewPasswordChallenge(password, [], {
            onSuccess: (result) => {
              let params = {
                accessToken: result.getAccessToken().getJwtToken(),
                idToken: result.getIdToken().getJwtToken(), 
                client_id: cognitoUser.pool.clientId
            }
            localStorage.clear();
            resolve( serverVerifyLogin(email, password, params))
          },
            onFailure: (err) => {
                reject(err);
            },
          });
        }
      });
    }); 

  }

  catch (error) {
    if(error.name === "UserNotConfirmedException") {
      return null
    }
    return false
  }
  

};

/**
* register user
* @param params //response from server
* @returns: boolean if is registered
* */
const register = async (params) => {

  return await new Promise((resolve,reject) => {

    axios.post('/registerUser', null, {params})
      
    .then((response) => { 
      localStorage.clear();
      if(response === null) {
        resolve(false)
      }
      resolve(true) 

    })
  
    .catch((error) => {
        reject(error)
    })


  })
} 

/**
* Sign up user
* @param email 
* @param password 
* @returns: boolean (is user created)
* */
const signUp = async (email, password, user_type, name) => { 
  
    const attributeList = [];
  
    const dataEmail = {
      Name: 'email',
      Value: email
    };

    const params = {email: email}

    let isValidEmail = await axios.get('/checkEmail', null, {params})   

    if(!isValidEmail.data) {
      return false
    }
    
    //AmazonCognitoIdentity.CognitoUserAttribute
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  
    attributeList.push(attributeEmail);
    
    return await new Promise((resolve, reject) => {
      //register a new user in an Amazon Cognito user pool.
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } 
        else {
          resolve(register({uid: result.userSub, verify: password, name: name, email: email, user_type: user_type}))
        }
      });
    });
};

/**
* verified email of user
* @param email 
* @param code 
* @returns: boolean if email is verified
* */
const verifyEmail = async (email, code) => {

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return await new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(false);
      } else {
        localStorage.clear();
        resolve(true)
      }
    });
  });
}

/**
* Get API Credentials
* @param email //request from client
* @param password //response from server
* @returns: a user data and token
* */
const getAPICredentials = async (email, password) => { 

  try {

    const authenticationData = {
      Username: email,
      Password: password
    };
    
    // that represents the authentication details of a user who is attempting to authenticate with Amazon Cognito
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  
    const userData = {
      Username: email,
      Pool: userPool
    };
      
    //that represents a user in an Amazon Cognito user pool
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    return await new Promise((resolve, reject) => {
        
        //that is used to authenticate a user with their password  
        cognitoUser.authenticateUser(authenticationDetails, {
  
        //if user is succeful authenticated
        onSuccess: (result) => {
          resolve(result)
        },
  
          //if user fail to authenticate
        onFailure: (err) => {
          reject(err);
        },
  
          // This callback is invoked when a user's password is expired or requires a reset
          // Here, you can prompt the user to provide a new password and then call cognitoUser.completeNewPasswordChallenge()
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          cognitoUser.completeNewPasswordChallenge(password, [], {
            onSuccess: (result) => {
            resolve(result)
          },
            onFailure: (err) => {
                reject(err);
            },
          });
        }
      });
    }); 
  }

  catch (error) {
    if(error.name === "UserNotConfirmedException") {
      return null
    }
    return false
  }

};



export const authentication = {signIn, signUp, verifyEmail, getAPICredentials}