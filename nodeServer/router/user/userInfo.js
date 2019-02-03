const {
    router
} = require("../../server/server");
const mongoose = require('mongoose');
const User = require('../../mongo/schema/user');
const userConfig = require('../../mongo/schema/UserConfig');
const UserConfig = mongoose.model('config', userConfig);

//获取用户数据
router.get("/user/getUserInfo", async ctx => {
    await getUserData(ctx.request.query.userId).then(data => {
        ctx.body = data;
    })
});

//获取用户数据
function getUserData(userId) {
    return new Promise(resolve => {
        User.findOne({
            userId
        }, (err, user) => {
            getUserConfig(userId, user).then(data => {
                resolve(data)
            })
        })
    })
}

//获取用户设置
function getUserConfig(userId, user) {
    return new Promise(resolve => {
        UserConfig.findOne({
            userId
        }, (err, config) => {
            const resData = {
                code: 0,
                data: {
                    nickname: user.nickname,
                    email: user.email,
                    mainColor: config.mainColor
                }
            }
            resolve(resData);
        })
    }).then(data => {
        return new Promise(resolve => {
            resolve(data);
        })
    })
}