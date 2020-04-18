const axios = require('axios')
const chai = require('chai');
const User = require('../../lib/enterprise_business_rules/entities/User')

const UserModel = require('../../lib/frameworks_drivers/database/models/UserModel');

const expect = chai.expect;

describe('User controller test', function(){
    let accessToken = null;

    const user = new User("test2", "123456")

    before( async () => {

        const response2 = await axios.post('http://localhost:20201/api/oauth/token', {
            username: user.username,
            password: user.password,
            grant_type: 'password'
        });

        accessToken = response2.data;
        console.log(accessToken);
    })  

    it("#AccessToken", () => {
        console.log(accessToken);
        expect(accessToken.length).greaterThan(0)
    })
})