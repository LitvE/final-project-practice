const jwtService = require("./jwtService");
const {DEVICES_PER_LIMIT} = require("./../constants");
const _ = require("lodash");

exports.createSession = async (userInstance) => {
    const {accessToken, refreshToken} = await jwtService.signTokenPair({
        id: userInstance.getDataValue("id"),
        role: userInstance.getDataValue("role")
    });
    if((await userInstance.countRefreshTokens()) >= DEVICES_PER_LIMIT){
        const [oldRefreshTokenInstance] = await userInstance.getRefreshTokens({
            order: [["updatedAt", "ASC"]],
        });
        await oldRefreshTokenInstance.update({
            token: refreshToken
        });
    } else{
        await userInstance.countRefreshTokens({
            token: refreshToken
        });
    }
    return{
        user: sendUser(userInstance),
        tokenPair: {
            accessToken,
            refreshToken
        }
    }
};

exports.refreshSession = async (refreshTokenInstance) => {
    const userInstance = await refreshTokenInstance.getUser();
    if(userInstance){
        const {accessToken, refreshToken} = await jwtService.signTokenPair({
            id: userInstance.getDataValue("id"),
            role: userInstance.getDataValue("role")
        });
        await refreshTokenInstance.update({
            token: refreshToken,
        });
        return{
            user: sendUser(userInstance),
            tokenPair: {
                accessToken,
                refreshToken
            }
        } 
    }    
};

function sendUser(userInstance){
    const data = userInstance.get();
    return _.omit(data, ["password"]);
} 