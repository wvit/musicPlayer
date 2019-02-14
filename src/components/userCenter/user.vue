<template>
  <div>
    <div class="pd-lr10">
      <div v-if="!userInfo">
        <router-link to="/signIn">登录</router-link>/
        <router-link to="/signUp">注册</router-link>
      </div>
      <div v-else>
        <a>{{userInfo.nickname}}</a>
        <a @click="signOut">退出当前</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
    };
  },
  methods: {
    //退出登录
    signOut() {
      this.userInfo = null;
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("userId");
    }
  }
};
</script>
<style scoped>
</style>
