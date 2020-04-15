const chai = require('chai');

const CreateUser = require('../../../lib/application_business_rules/use_cases/CreateUser');
const GetAccessToken = require('../../../lib/application_business_rules/use_cases/GetAccessToken');
const VerifyAccessToken = require('../../../lib/application_business_rules/use_cases/VerifyAccessToken');
const UserModel = require('../../../lib/frameworks_drivers/database/models/UserModel')
const UserRepositoryMongoDB = require('../../../lib/interface_adapters/storage/UserRepositoryMongoDB')
const BcryptManager = require('../../../lib/interface_adapters/security/BcryptEncryptManager')
const JwtAccessTokenManager = require('../../../lib/interface_adapters/security/JwtAccessTokenManager');

const userRepository = new UserRepositoryMongoDB();
const encryptManagement = new BcryptManager();
const accessTokenManager = new JwtAccessTokenManager();

const expect = chai.expect;

const MongoDB = require('../../../lib/frameworks_drivers/database/MongoDB');

MongoDB('testsymptomecovid19');

describe('VerifyAccessToken', () => {

    const username = "testverifytoken";
    const password = "123456";
    let userCreated = null;
    let token = null;
    let payload = null;

    before(async () => {
        await UserModel.deleteMany({});

        const hash = await encryptManagement.encrypt(password);
        userCreated = await CreateUser(username, hash,
            { userRepository });
        token = await GetAccessToken(username, password, { userRepository, accessTokenManager, encryptManagement}) 
            
        payload = await VerifyAccessToken(token, { accessTokenManager })
    })

    after(async () => {
        await require('mongoose').disconnect();
    })

    it('Le mot de passe encrypte doit être idifférent du mot de passe de départ', () => {
        expect(userCreated.password.toString()).to.not.equal(password)
    })

    it('Le resultat doit être un token valide', () => {
        expect(payload.uid.toString()).to.equal(userCreated._id.toString());
    })
})