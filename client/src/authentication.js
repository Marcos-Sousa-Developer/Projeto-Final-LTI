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
const serverVerifyLogin = async(email, password, result) => { 
    
    let params = {
        email : email,
        password: password,
        result: result,
    }
            
    return await new Promise((resolve,reject) => {
        
        axios.post('/signIn', null, {params: params})
    
        .then((response) => { 
            resolve(response.data)
        })
        
        .catch((error) => {
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
          let params = {
              accessToken: result.getAccessToken().getJwtToken(),
              idToken: result.getIdToken().getJwtToken(), 
              client_id: cognitoUser.pool.clientId
          }
          resolve( serverVerifyLogin(email, password, params))
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
    console.log(error)
    return false
  }
  

};

const register = async (params) => {


  return await new Promise((resolve,reject) => {


    axios.post('/registerUser', null, {params})
      
    .then((response) => { 
      console.log(response)
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
* @param {*} req //request from client
* @param {*} res //response from server
* @returns: boolean (is user created)
* */
const signUp = (email, password, user_type, name) => { 
  
    const attributeList = [];
  
    const dataEmail = {
      Name: 'email',
      Value: email
    };
    
    //AmazonCognitoIdentity.CognitoUserAttribute
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  
    attributeList.push(attributeEmail);
    
    return new Promise((resolve, reject) => {
      //register a new user in an Amazon Cognito user pool.
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } 
        else {
          resolve(register({uid: result.userSub, name: name, email: email, user_type: user_type}))
        }
      });
    });
};

const verifyEmail = async (email, code) => {

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return await new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log(err);
        reject(false);
      } else {
        console.log(result);
        resolve(true);
      }
    });
  });

}

export const authentication = {signIn, signUp, verifyEmail}