const CreateUser = require('../../application_business_rules/use_cases/CreateUser')
const GetUser = require('../../application_business_rules/use_cases/GetUser')
const userRepository = require('../storage/UserRepositoryMongoDB');

module.exports = {

    async createUser(req, res, next){
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password){
            res.sendStatus(401);
        }

        const newUser = await CreateUser(username, password, { userRepository })

        if(newUser){
            res.send({ newUser })
        } else {
            res.sendStatus(500);
        }
    },

    async getUser(req, res, next){
        const users = await GetUser(req.params.id, { userRepository });

        if(users){
            res.send(users);
        } else {
            res.sendStatus(501)
        }
    }
}