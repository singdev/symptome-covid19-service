const jwt = require('jsonwebtoken');

const AccessTokenManager = require('../../application_business_rules/security/AccessTokenManagement');

const JWT_SECRETE_CODE = "sing2020";

module.exports = class extends AccessTokenManager {

    async generate(payload){
        return await jwt.sign(payload, JWT_SECRETE_CODE);
    }

    async decode(accessToken){
        return await jwt.verify(accessToken, JWT_SECRETE_CODE);
    }
}