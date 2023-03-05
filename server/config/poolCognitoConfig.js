const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') })

// pool configuration 
const cognitoPoolData = {
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID,
  region: process.env.AWS_DEFAULT_REGION
};

module.exports = cognitoPoolData;