
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = require('../config/poolCognitoConfig')

//pass our user pool data to identify cognito user pool 
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/*
* sign in cofiguration 
* */
const signIn = (req, res) => { 

  let email = req.query.email
  let password = req.query.password
  //console.log(email,password)
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
  
    new Promise((resolve, reject) => {
      
      //that is used to authenticate a user with their password  
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log(result)
          return res.send(result.accessToken.jwtToken);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // This callback is invoked when a user's password is expired or requires a reset
          // Here, you can prompt the user to provide a new password and then call cognitoUser.completeNewPasswordChallenge()
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

/*
* sign up cofiguration 
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


module.exports = {signIn, signUp}