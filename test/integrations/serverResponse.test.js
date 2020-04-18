const axios = require('axios')
const chai = require('chai');

const expect = chai.expect;

describe('Server Is Launch', function(){

    let responseBody = {};
    let responseStatus = null;

    beforeEach( async () => {
        const response = await axios.get('http://127.0.0.1:20201/hello');
        responseStatus = response.status;
        responseBody =   response.data;
    })

    it('#Get Hello World', () => { 
        expect(responseStatus).to.equal(200)
        expect(responseBody).to.equal("Hello World")
    })
})