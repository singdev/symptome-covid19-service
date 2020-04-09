
module.exports = async (username, password, { userRepository, accessTokenManager, encryptManagement }) => {
    const user = await userRepository.getByUsername(username);

    if(!user){
        throw new Error("Bad credentials");
    }

    const result = await encryptManagement.compare(password, user.password)

    if(result){
        return await accessTokenManager.generate({ uid: user._id });
    } else {
        throw new Error("Bad credentials");
    }
}