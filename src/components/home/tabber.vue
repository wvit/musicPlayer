<template>
  <ul class="tabber clearfix">
    <li
      v-for="(item,index) of config"
      :key="index"
      :style="{width:`${100/config.length}%`}"
    >
      <router-link
        :to="item.url"
        class="tabber-item mainStyleOn mainStyleOff"
        active-class="tabber-active"
      ><span>{{item.text}} </span> <em :class="['iconfont',item.iconClass]"></em></router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    config: Array
  },
  //初始化
  mounted() {
    this.changePage();
  },
  methods: {
    //改变页面
    changePage() {
      const query = this.$utils.query;
      query(".tabber-item").forEach(item => {
        item.classList.add("mainStyleOn");
      });
      query(".tabber-active")[0].classList.remove("mainStyleOn");
    }
  },
  computed: {
    //获取背景颜色
    getMainColor() {
      return this.$store.state.config.mainColor;
    }
  },
  watch: {
    //监听路由变化，切换tab
    $route() {
      setTimeout(this.changePage, 100);
    }
  }
};
</script>
<style scoped>
.tabber {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  text-align: center;
}

.tabber li {
  float: left;
}

.tabber li a {
  float: left;
  position: relative;
  width: 100%;
  padding-top: 20px;
}

.tabber li a em {
  position: absolute;
  left: 50%;
  top: 7px;
  transform: translateX(-50%);
}

.tabber li a span {
  font-size: 14px;
  line-height: 36px;
}
</style>
