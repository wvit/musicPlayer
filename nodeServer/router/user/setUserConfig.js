const {
  router
} = require("../../server/server");
const UserConfig = require('../../mongo/schema/userConfig');

//接受用户注册请求
router.post("/user/signUp", async ctx => {
  await savaUserConfig(ctx.request.query).then(data => {
    ctx.body = data;
  })
});

//保存用户设置数据
function savaUserConfig(reqData) {
  return new Promise(resolve => {
    UserConfig.findOne({
        // userId: reqData.
    }, (err, users) => {
        resolve(users);
    })
}).then(user => {
    const password = crypto.createHash('md5').update(reqData.password + '260817').digest('hex');
    const resData = {
        code: 0,
        data: {}
    }
    if (!user) {
        resData.code = 2;
        resData.data.text = '用户不存在';
    } else if (user.password !== password) {
        resData.code = -1;
        resData.data.text = '密码错误';
    } else {
        resData.data = {
            userInfo: {
                nickname: user.nickname,
                email: user.email,
                userId: user.userId
            },
            text: '登录成功，正在跳转...'
        }
    }
    return new Promise(resolve => {
        resolve(resData)
    })
})
}