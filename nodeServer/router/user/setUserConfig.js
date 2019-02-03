const {
  router
} = require("../../server/server");
const UserConfig = require('../../mongo/schema/userConfig');

//接受用户请求
// router.get("/user/getConfig", async ctx => {
//   await queryUserConfig(ctx.request.query).then(data => {
//     ctx.body = data;
//   })
// });

// //获取用户设置数据
// function queryUserConfig(reqData) {
//   return new Promise(resolve => {
//     UserConfig.findOne({
//       userId: reqData.userId
//     }, (err, config) => {
//       resolve(config);
//     })
//   }).then(config => {
//     const resData = {
//       code: 0,
//       data: {
//         mainColor: config.mainColor
//       }
//     }
//     return new Promise(resolve => {
//       resolve(resData)
//     })
//   })
// }