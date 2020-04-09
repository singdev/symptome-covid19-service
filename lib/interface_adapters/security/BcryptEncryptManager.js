const bcrypt = require('bcryptjs');

const EncryptManager = require('../../application_business_rules/security/EncryptManager');

module.exports = class extends EncryptManager {

    async encrypt(value){
        return await bcrypt.hash(value, 10);
    }

    async compare(value, hash){
        return await bcrypt.compare(value, hash);
    }
}