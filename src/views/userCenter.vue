<template>
  <div>
    <title-head title="用户中心"></title-head>
    <div>
      <router-link to="/signIn">登录</router-link>/
      <router-link to="/signUp">注册</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {
    titleHead: () => import("@/components/public/titleHead.vue")
  }
};
</script>
<style scoped>
</style>
