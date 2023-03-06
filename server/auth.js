const CognitoExpress = require('cognito-express')

const cognitoExpress = new CognitoExpress({
    region: process.env.AWS_DEFAULT_REGION, //my aws region
    cognitoUserPoolId: process.env.AWS_COGNITO_USER_POOL_ID, //my aws user pool id
    tokenUse: "access",
    tokenExpiration: 3600000 // 1 hour
}); 


// Middleware to check if a user is authenticated 
const authenticateUser = (req, res, next) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
    cognitoExpress.validate(accessToken, (err, response) => {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized'
        });
      }
      req.user = response;
      next();
    });
}; 

module.exports = authenticateUser;
