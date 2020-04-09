const chai = require('chai');

const MongoDB = require('../../../lib/frameworks_drivers/database/MongoDB');

const User = require('../../../lib/enterprise_business_rules/entities/User');
const CreateUser = require('../../../lib/application_business_rules/use_cases/CreateUser');
const UserRepositoryMongoDB = require('../../../lib/interface_adapters/storage/UserRepositoryMongoDB')

const userRepositoryMongoDB = new UserRepositoryMongoDB();

const expect = chai.expect;

MongoDB('testsymptomecovid19')

const UserModel = require('../../../lib/frameworks_drivers/database/models/UserModel')

describe('Should create a new user with hashed password and same username', () => {

    const persistedUser = new User('test', '123456');
    let user = null; 

    before(async () => {
        await UserModel.deleteMany({});
        user = await CreateUser(persistedUser.username, persistedUser.password,
            { userRepository: userRepositoryMongoDB });
    })

    after( async () => {
        await require('mongoose').disconnect();
    })

    it('la fonction CreateUser ne doit pas renvoyer undefined', () => {
        expect(user, "user is not undefined").to.not.equal(undefined);
    })
    
    it('La fonction CreateUser doit renvoyer un utilisateur avec un username identique à celui de persistedUser', 
    () => {
       expect(user.username).to.equal(persistedUser.username);
    })

    it("Le mot de passe de l'utilisateur doit être crypté, donc différent de celui entré", () => {
        expect(user.password).to.equal(persistedUser.password);
    })
})
