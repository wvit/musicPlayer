<template>
  <div>
    <router-view></router-view>
    <tabber :config="config"></tabber>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: [
        {
          iconClass: "icon-home",
          text: "首页",
          url: "/index"
        },
        {
          iconClass: "icon-music",
          text: "歌单",
          url: "/musicList"
        },
        {
          iconClass: "icon-find",
          text: "发现",
          url: "/discovery"
        },
        {
          iconClass: "icon-userCenter",
          text: "我的",
          url: "/userCenter"
        }
      ]
    };
  },
  components: {
    titleHead: () => import("@/components/public/titleHead.vue"),
    tabber: () => import("@/components/home/tabber.vue")
  },
  //初始化肤色
  beforeMount() {
    this.$utils.setAppMainColor();
  }
};
</script>
<style scoped>
</style>
