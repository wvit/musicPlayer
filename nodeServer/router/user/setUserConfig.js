const {
  router
} = require("../../server/server");
const UserConfig = require('../../mongo/schema/userConfig');

//接受用户注册请求
router.get("/user/setConfig", async ctx => {
  await savaUserConfig(ctx.request.query).then(data => {
    ctx.body = data;
  })
});

//保存用户设置数据
function savaUserConfig(reqData) {
  return new Promise(resolve => {
    UserConfig.findOne({
      userId: reqData.userId
    }, (err, config) => {
      resolve(config);
    })
  }).then(config => {
    const resData = {
      code: 0,
      data: {}
    }
    return new Promise(resolve => {
      resolve(resData)
    })
  })
}