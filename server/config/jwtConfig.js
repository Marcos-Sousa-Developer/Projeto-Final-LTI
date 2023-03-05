const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') })
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const CryptoJS = require("crypto-js");



const encryptID = (id) => {
    return CryptoJS.AES.encrypt(id, process.env.CLIENT_ID_TO_UID).toString();
}

const decryptID = (hashedUid) => {
    return CryptoJS.AES.decrypt(hashedUid, process.env.CLIENT_ID_TO_UID).toString(CryptoJS.enc.Utf8);
}

/**
 * Hash data with jwt 
 * return data hashed
 */
const generateAccessToken = (params) =>{

    return jwt.sign(params, process.env.JWT_SECRET_KEY, {
        expiresIn: '1800s'
    });
}

/**
 * Verify is token is validate
 * return type of code
 */ 
const verifyAccessTokenFromClient = (token) => {

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {

            if (err) {
                reject(err)
            }
            else {
                resolve(decoded)
            }
        })
    })
}

const getPubKey = (kid,jwks) => {
    
    // get signing key from jwks client
    return new Promise( (resolve, reject) => {

        jwks.getSigningKey(kid, (err, key) => {

            if(err) {
                reject(err)
            }
            else {
                resolve(key.getPublicKey());
            }
        })
    }); 
}


/**
 * @params client_token from client server
 * @return userCredentials
 */
const verifyUserAutentecity = async (client_token,client_id) => {

    const region = process.env.AWS_DEFAULT_REGION;
    const userPoolId = process.env.AWS_COGNITO_USER_POOL_ID;

    const jwks = jwksClient({
        jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
    });

    //when complete true is active return all the complete info
    const decodedAccessToken = jwt.decode(client_token, { complete: true });
    
    // "kid" field is used to indicate which key was used to sign the token
    const kid = decodedAccessToken.header.kid;  
    
    //verify user credentials
    const userCredentials = await getPubKey(kid,jwks).then( (response) => {
        return jwt.verify(client_token, response, { algorithms: ['RS256'] },
        function (err, decodedToken) {
            if (err) {
                return err;
            } else {
                return decodedToken;
            }
        });
    });

    return userCredentials.client_id === client_id || userCredentials.aud === client_id;
}

const jwtAccess = {generateAccessToken, verifyAccessTokenFromClient, 
                  verifyUserAutentecity, encryptID,
                  decryptID}

module.exports = jwtAccess;

