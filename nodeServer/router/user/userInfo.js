const {
    router
} = require("../../server/server");

//获取用户数据
router.get("/user/getUserInfo", async ctx => {
    ctx.body = ctx.request.query;
});