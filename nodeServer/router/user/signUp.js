const {
    router
} = require("../../server/server");
const User = require('../../mongo/schema/userSchema');
const crypto = require('crypto');

//接受用户注册请求
router.post("/user/signUp", async ctx => {
    await savaUser(ctx.request.body).then(data => {
        ctx.body = data
    })
});

//保存user数据
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
            const user = new User(reqData);
            user.save((err, res) => {
                if (err) {
                    resData.code = -1;
                    resData.data = '注册失败';
                }
            });
        }
        return new Promise(resolve => {
            resolve(resData)
        })
    })
}