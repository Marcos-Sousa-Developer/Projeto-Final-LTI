import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';


function auth() {

    // pool configuration 
  const poolData = {
      UserPoolId: '<your-user-pool-id>',
      ClientId: '<your-client-id>'
  };

  //pass our user pool data to identify cognito user pool 
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  /*
  * sign in cofiguration 
  * 
  * */
  const signIn = (email, password) => {
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
    
      return new Promise((resolve, reject) => {
        
        //that is used to authenticate a user with their password  
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            resolve(result.accessToken.jwtToken);
          },
          onFailure: (err) => {
            reject(err);
          }
        });
      });
  };

  /*
  * sign up cofiguration 
  * 
  * */
  const signUp = (email, password) => {

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

}


export default auth