<template>
  <div>
    <titleHead title="用户中心"></titleHead>
    <user></user>
    <ul class="pd-lr10 handle">
      <li class="clearfix mt30">
        <em class="iconfont icon-colorPicker mainFontColor"></em>
        <span class="text-style">请选择颜色主题</span>
        <colorPicker></colorPicker>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {
    titleHead: () => import("@/components/public/titleHead.vue"),
    user: () => import("@/components/userCenter/user.vue"),
    colorPicker: () => import("@/components/userCenter/colorPicker.vue")
  }
};
</script>
<style scoped>
.handle > li {
  position: relative;
  padding-left: 25px;
}
.handle > li > span {
  float: left;
  margin-right: 10px;
}

.handle > li > em {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
