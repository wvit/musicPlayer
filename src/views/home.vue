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
    const userId = sessionStorage.getItem("userId");
    let mainColor = sessionStorage.getItem("mainColor");
    if (userId) {
      this.$axios.get(`/user/getUserInfo?userId=${userId}`).then(res => {
        console.log("用户数据", res.data);
        if (res.data.code === 0) {
          mainColor = res.data.data.mainColor;
          this.$store.commit("setMainColor", mainColor);
          this.$utils.setMainColor(mainColor);
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
          sessionStorage.setItem("mainColor", mainColor);
        }
      });
    } else {
      mainColor
        ? this.$store.commit("setMainColor", mainColor)
        : (mainColor = this.$store.state.config.mainColor);
      this.$utils.setMainColor(mainColor);
    }
  }
};
</script>
<style scoped>
</style>
