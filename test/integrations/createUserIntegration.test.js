const axios = require('axios')
const chai = require('chai');
const User = require('../../lib/enterprise_business_rules/entities/User')

const expect = chai.expect;

describe('User controller test', function(){

    let responseBody = {};
    let responseStatus = null;

    let responseStatusForNoPassword = null;

    const user = new User("orphee6", "123456")

    before( async () => {
        const response = await axios.post('http://127.0.0.1:20201/users', {
            username: user.username,
            password: user.password
        });

        responseStatus = response.status;
        responseBody =   response.data;

        const response2 = await axios.post('http://127.0.0.1:20201/users', {
            username: "nopassworduser",
        });

        responseStatusForNoPassword = response2.status;
    })

    it('#Response 200', () => {
        expect(responseStatus).to.equal(200)
    })

    it('#Response Contain new User infor', () => {
        expect(responseBody['newUser']).to.not.equal(undefined)
    })

    it('#Response Contain new User username', () => {
        expect(responseBody['newUser'].username.toString()).to.equal(user.username)
    })

    it('#Response Contain new User with not empty password', () => {
        expect(responseBody['newUser'].password.toString().length).greaterThan(user.password.length)
    })

    it('#Response Contain new User password encrypted', () => {
        expect(responseBody['newUser'].password).to.not.equal(user.password)
    }) 
  
    it('#Response 401 because no password', () => {
        expect(responseStatusForNoPassword).to.equal(401)
    })

})