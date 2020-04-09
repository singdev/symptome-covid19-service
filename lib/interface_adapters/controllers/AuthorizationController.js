const GetAccessToken = require('../../application_business_rules/use_cases/GetAccessToken');
const VerifyAccessToken = require('../../application_business_rules/use_cases/VerifyAccessToken');

const EncryptManagement =  require('../security/BcryptEncryptManager');
const UserRepository = require('../storage/UserRepositoryMongoDB');
const AccessTokenManager = require('../../interface_adapters/security/JwtAccessTokenManager');

module.exports = {

    async getAccessToken(request, response, next){
        
        const grantType = request.grant_type;
        const username = request.username;
        const password = request.password;

        if(!grantType || grantType !== 'password'){
            response.sendStatus(403);
        }

        const accessTokenManager = new AccessTokenManager();
        const encryptManagement = new EncryptManagement();
        const userRepository = new UserRepository();

        const accessToken = await GetAccessToken(username, password, { accessTokenManager, encryptManagement, userRepository});
        
        res.send(accessToken)
    },

    verifyAccessToken(request, response, next){

        const header = request.headers('authorization');

        if(!header && ! header.includes('Bearer ')){
            response.sendStatus(401);
        }

        const accessToken = header.splite(' ')[1];

        const decoded = VerifyAccessToken(accessToken, { accessTokenManager });
        
        req.auth = {
            credentials: decoded.uid,
            artifact: { accessToken }
        }
        next()
    }
}