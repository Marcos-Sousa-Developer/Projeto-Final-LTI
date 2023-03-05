import axios from 'axios'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import poolData from "./config/poolCognitoConfig";

//pass our user pool data to identify cognito user pool 
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @param {*} result (tokens)
 * @returns boolean user is authenticated
 */
const serverVerifyLogin = async(email, password, result) => { 
    
    let params = {
        email : email,
        password: password,
        result: result,
    }
            
    return new Promise((resolve,reject) => {
        
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
            resolve(serverVerifyLogin(email, password, params))

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

                resolve(result.getAccessToken().getJwtToken());
              },
              onFailure: (err) => {
                reject(err);
              },
            });
          }
  
        });
      }); 
  };
  
  /**
  * Sign up user
  * @param {*} req //request from client
  * @param {*} res //response from server
  * @returns: boolean (is user created)
  * */
  const signUp = (req, res) => { 
  
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
          } else {
            resolve(result.user);
          }
        });
      });
  };

export const authentication = {signIn, signUp}