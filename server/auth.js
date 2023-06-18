const CognitoExpress = require('cognito-express')
const jwt = require('./config/jwtConfig')
require("dotenv").config();


const cognitoExpress = new CognitoExpress({
    region: process.env.AWS_DEFAULT_REGION, //my aws region
    cognitoUserPoolId: process.env.AWS_COGNITO_USER_POOL_ID, //my aws user pool id
    tokenUse: "access",
    tokenExpiration: 3600000 // 1 hour
}); 


// Middleware to check if a user is authenticated 
const authenticateUser = async (req, res, next) => {
    const accessToken = req.headers["authorization"];
    const client_id = req.headers["client-id"];
    const idToken = req.headers["token-id"];
    const identification = req.headers.identification;
    if(identification) {
    
      if(jwt.decryptID(identification)===process.env.REACT_CLIENT_ID) {
        next()
      }
      else {
        return res.status(401).json({
          message: 'Unauthorized'
      });
      }
    }
    else if(accessToken && client_id && idToken) { 

        try {
          let newAccessToken = accessToken.replace('Bearer ', ''); 

          let isAccessTokenValid =  await jwt.verifyUserAutentecity(newAccessToken, client_id)
          let isIdTokenValid =  await jwt.verifyUserAutentecity(idToken, client_id)
          
          if(isAccessTokenValid === isIdTokenValid) {
            next()
          }
          else {
            return res.status(401).json({
              message: 'Unauthorized'
          });
        }

        }
        catch (error) {
          return res.status(401).json({
            message: 'Unauthorized'
          });
        }
    }
    else {
      return res.status(401).json({
        message: 'Unauthorized'
    });
    }

}; 

// Middleware to check if a user is authenticated 
const clientAuthenticate = async (req, res, next) => {

  const identification = req.headers.identification;
  if(identification) {
    if(jwt.decryptID(identification) === process.env.REACT_CLIENT_ID) {
      next()
    }
    else {
      return res.status(401).json({
        message: 'Unauthorized'
    });
    }
  }
  else {
    return res.status(401).json({
      message: 'Unauthorized'
  });
  }

}; 

module.exports = {authenticateUser, clientAuthenticate};
