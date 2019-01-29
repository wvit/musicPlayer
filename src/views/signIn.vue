<template>
  <div>
    <title-head title="登录"></title-head>
    <div class="contentWrap">
      <el-input
        v-model="signIn.nickname"
        placeholder="请输入昵称"
        class="mt20"
      ></el-input>
      <el-input
        class="mt20"
        type="password"
        v-model="signIn.password"
        placeholder="请填写密码"
      ></el-input>
      <div class="gosignIn">
        还没有账号？
        <router-link
          to="/signUp"
          class="mainColor"
        >去注册</router-link>
      </div>
      <el-button
        type="success"
        class="sendBtn"
        @click="signInBtn"
      >登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      signIn: {
        //登录验证
        nickname: "",
        password: ""
      }
    };
  },
  components: {
    titleHead: () => import("@/components/public/titleHead.vue")
  },
  methods: {
    //登录
    signInBtn() {
      if (!this.$utils.judgeNull(this.signIn.nickname)) {
        this.$utils.showToast({ text: "请填写登录昵称" });
      } else if (!this.$utils.judgeNull(this.signIn.password)) {
        this.$utils.showToast({ text: "请填写登录密码" });
      } else {
        this.$axios.post("/user/signIn", this.signIn).then(res => {
          console.log("用户信息", res.data);
          this.$utils.showToast({ text: res.data.data.text }).then(() => {
            res.data.code === 0 ? this.$router.replace("/") : "";
          });
        });
      }
    }
  }
};
</script>
<style scoped>
.gosignIn {
  text-align: right;
}
.gosignIn {
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
