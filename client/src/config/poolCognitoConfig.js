// pool configuration 
const poolData = {
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    region: process.env.REACT_APP_DEFAULT_REGION
};

export default poolData 