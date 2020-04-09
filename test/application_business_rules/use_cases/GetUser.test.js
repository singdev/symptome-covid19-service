const chai = require('chai');

const CreateUser = require('../../../lib/application_business_rules/use_cases/CreateUser');
const GetUser = require('../../../lib/application_business_rules/use_cases/GetUser');
const UserModel = require('../../../lib/frameworks_drivers/database/models/UserModel')
const UserRepositoryMongoDB = require('../../../lib/interface_adapters/storage/UserRepositoryMongoDB')

const userRepositoryMongoDB = new UserRepositoryMongoDB();

const expect = chai.expect;

const MongoDB = require('../../../lib/frameworks_drivers/database/MongoDB');

MongoDB('testsymptomecovid19');

describe('GetUser', () => {

    const username = "test";
    const password = "123456";
    let userCreated = null;
    let userFind = null;

    before(async () => {
        await UserModel.deleteMany({});

        userCreated = await CreateUser(username, password,
            { userRepository: userRepositoryMongoDB });

        userFind = await GetUser(userCreated._id, { userRepository: userRepositoryMongoDB})  
    })

    after(async () => {
        await require('mongoose').disconnect();
    })

    it('userCreated should be equal to userFind', () => {
        expect(userCreated.username).to.equal(userFind.username)
        expect(userCreated.password).to.equal(userFind.password)
        expect(userCreated._id.toString()).to.equal(userFind._id.toString())
    })
})