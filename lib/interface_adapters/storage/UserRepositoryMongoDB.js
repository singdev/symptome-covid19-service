
const UserRepository = require('../../application_business_rules/repositories/UserRepository')

const UserModel = require('../../frameworks_drivers/database/models/UserModel');

module.exports = class extends UserRepository {

    async persist(userEntity){
        const user = new UserModel(userEntity);
        const newUser = await user.save();
        return newUser;
    }

    async remove(userId){
        await UserModel.findOneAndDelete({ _id: userId });
    }

    async get(userId){
        const user = await UserModel.findById(userId);
        return user;
    }

    async getByUsername(username){
        return await UserModel.findOne({ username: username });
    }

    async find(){
        return await UserModel.find({});
    }


}