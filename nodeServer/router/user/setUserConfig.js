const {
  router,
  mongoose
} = require("../../server/server");
const userConfig = require('../../mongo/schema/userConfig');
const UserConfig = mongoose.model('config', userConfig)

// 接受用户设置请求
router.post("/user/setConfig", async ctx => {
  await setConfig(ctx.request.body).then(data => {
    ctx.body = data;
  })
});

// 更新用户设置
function setConfig(reqData) {
  return new Promise(resolve => {
    UserConfig.updateOne({
      userId: reqData.userId
    }, {
      mainColor: reqData.mainColor
    }, err => {
      if (err) {
        resolve({
          code: -1,
          msg: '更新失败'
        });
      } else {
        resolve({
          code: 0,
          msg: '更新成功'
        });
      }
    })
  })


}