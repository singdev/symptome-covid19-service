module.exports = async (accessToken, { accessTokenManager}) => {
    const decoded = await accessTokenManager.decode(accessToken);

    if(!decoded){
        throw new Error("Invalid token")
    }

    return { uid: decoded.uid };
}