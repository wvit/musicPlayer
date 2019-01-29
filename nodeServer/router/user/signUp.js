const {
    router
} = require("../../server/server");
const User = require('../../mongo/schema/userSchema');
const crypto = require('crypto');

//接受用户注册请求
router.post("/user/signUp", async ctx => {
    await savaUser(ctx.request.body).then(({
        code,
        data
    }) => {
        ctx.body = {
            code,
            data
        }
    })
});

//保存user数据
function savaUser(reqData) {
    return new Promise(resolve => {
        User.find({
            nickname: reqData.nickname
        }, (err, users) => {
            resolve(users);
        })
    }).then(users => {
        let code = 0;
        let data = '注册成功';
        if (users.length > 0) {
            code = 2;
            data = '昵称已存在';
        } else {
            reqData.password = crypto.createHash('md5').update(reqData.password + '260817').digest('hex');
            reqData.userId = Date.now();
            const user = new User(reqData);
            user.save((err, res) => {
                if (!err) {
                    code = 0;
                    data = res;
                } else if (err) {
                    code = -1;
                    data = '注册失败';
                }
            });
        }
        return new Promise(resolve => {
            resolve({
                code,
                data
            })
        })
    })
}