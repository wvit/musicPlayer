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
  //初始化颜色
  beforeMount() {
    this.$utils.setMainColor(this.$store.state.config.mainColor);
    this.$axios
      .get(`/user/getUserInfo?userId=${sessionStorage.getItem("userId")}`)
      .then(res => {
        console.log("用户数据", res.data);
        if (res.data.code === 0) {
          this.$store.commit("setMainColor", res.data.data.mainColor);
          this.$utils.setMainColor(this.$store.state.config.mainColor);
        }
      });
  }
};
</script>
<style scoped>
</style>
