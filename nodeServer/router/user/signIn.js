const {
    router
} = require("../../server/server");
const User = require('../../mongo/schema/userSchema')
const crypto = require('crypto');

//接受用户登录信息
router.post("/user/signIn", async ctx => {
    await findUser(ctx.request.body).then(({
        code,
        data
    }) => {
        ctx.body = {
            code,
            data
        }
    })
});

//查找验证用户登录
function findUser(reqData) {
    return new Promise(resolve => {
        User.findOne({
            nickname: reqData.nickname
        }, (err, users) => {
            resolve(users);
        })
    }).then(user => {
        const password = crypto.createHash('md5').update(reqData.password + '260817').digest('hex');
        let code = 0;
        let data = {};
        if (!user) {
            code = 2;
            data.text = '用户不存在';
        } else if (user.password !== password) {
            code = -1;
            data.text = '密码错误';
        } else {
            data.userInfo = {
                nickname: user.nickname,
                email: user.email,
                userId: user.userId
            };
            data.text = '登录成功，正在跳转...';
        }
        return new Promise(resolve => {
            resolve({
                code,
                data
            })
        })
    })
}