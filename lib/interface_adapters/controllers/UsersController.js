const CreateUser = require('../../application_business_rules/use_cases/CreateUser')
const GetUser = require('../../application_business_rules/use_cases/GetUser')
const UserRepositoryMongoDB = require('../storage/UserRepositoryMongoDB');
const BcryptEncryptManager = require('../security/BcryptEncryptManager');

module.exports = {

    async createUser(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            res.sendStatus(401);
            return;
        }

        const userRepository = new UserRepositoryMongoDB();
        const encryptManager = new BcryptEncryptManager();

        const hashPassword = await encryptManager.encrypt(password);

        try {
            const newUser = await CreateUser(username, hashPassword, { userRepository })

            if (newUser) {
                res.send({ newUser })
            } else {
                res.sendStatus(500);
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(403)
        }
    },

    async getUser(req, res, next) {
        const userRepository = new UserRepositoryMongoDB();

        if(!req.params.id){
            res.sendStatus(401);
            return;
        }

        const users = await GetUser(req.params.id, { userRepository });

        if (users) {
            res.send(users);
        } else {
            res.sendStatus(501)
        }
    }
}