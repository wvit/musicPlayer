const {
    router,
    mongoose
} = require("../../server/server");
const User = require('../../mongo/schema/user');
const userConfig = require('../../mongo/schema/userConfig');
const UserConfig = mongoose.model('config', userConfig);
const crypto = require('crypto');

//接受用户注册请求
router.post("/user/signUp", async ctx => {
    await savaUser(ctx.request.body).then(data => {
        ctx.body = data
    })
});

//保存用户注册数据
function savaUser(reqData) {
    return new Promise(resolve => {
        User.findOne({
            nickname: reqData.nickname
        }, (err, user) => {
            resolve(user);
        })
    }).then(queryUser => {
        const resData = {
            code: 0,
            data: '注册成功'
        }
        if (queryUser) {
            resData.code = 2;
            resData.data = '昵称已存在';
        } else {
            reqData.password = crypto.createHash('md5').update(reqData.password + '260817').digest('hex');
            reqData.userId = Date.now();
            new User(reqData).save((err, res) => {
                if (err) {
                    resData.code = -1;
                    resData.data = '注册失败';
                    return;
                }
                saveUserConfig(reqData.userId);
            });
        }
        return new Promise(resolve => {
            resolve(resData)
        })
    })
}

//保存用户设置
function saveUserConfig(userId) {
    new UserConfig({
        userId,
        mainColor: '#333'
    }).save();
}