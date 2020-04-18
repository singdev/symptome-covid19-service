const GetAccessToken = require('../../application_business_rules/use_cases/GetAccessToken');
const VerifyAccessToken = require('../../application_business_rules/use_cases/VerifyAccessToken');

const EncryptManagement =  require('../security/BcryptEncryptManager');
const UserRepository = require('../storage/UserRepositoryMongoDB');
const AccessTokenManager = require('../../interface_adapters/security/JwtAccessTokenManager');

module.exports = {

    async getAccessToken(request, response, next){
        
        const grantType = request.body.grant_type;
        const username = request.body.username;
        const password = request.body.password;

        if(!grantType || grantType !== 'password'){
            response.sendStatus(403);
            return;
        }

        const accessTokenManager = new AccessTokenManager();
        const encryptManagement = new EncryptManagement();
        const userRepository = new UserRepository();

        const accessToken = await GetAccessToken(username, password, { accessTokenManager, encryptManagement, userRepository});
        
        response.send(accessToken)
    },

    async verifyAccessToken(request, response, next){

        const header = request.headers['authorization'];

        if(!header || !header.includes('Bearer ')){
            response.sendStatus(401);
            return;
        }

        const accessToken = header.split(' ')[1];

        const accessTokenManager = new AccessTokenManager();

        const decoded = await VerifyAccessToken(accessToken, { accessTokenManager });
        
        request.auth = {
            credentials: decoded.uid,
            artifact: { accessToken }
        }
        next()
    }
}