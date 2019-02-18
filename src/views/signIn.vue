<template>
  <div>
    <titleHead title="登录"></titleHead>
    <div class="contentWrap mt30">
      <el-input
        v-model="signIn.nickname"
        placeholder="请输入昵称"
        class="mb20"
      ></el-input>
      <el-input
        class="mb20"
        type="password"
        v-model="signIn.password"
        placeholder="请填写密码"
      ></el-input>
      <div class="gosignIn">
        还没有账号？
        <router-link
          to="/signUp"
          class="mainFontColor"
        >去注册</router-link>
      </div>
      <el-button
        type="success"
        class="sendBtn border-none mainStyleOn"
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
  //初始化肤色
  beforeMount() {
    let mainColor = sessionStorage.getItem("mainColor");
    mainColor
      ? this.$store.commit("setMainColor", mainColor)
      : (mainColor = this.$store.state.config.mainColor);
    this.$utils.setMainColor(mainColor);
  },
  methods: {
    //登录
    signInBtn() {
      if (!this.$utils.judgeNull(this.signIn.nickname)) {
        this.$utils.showToast({ text: "请填写登录昵称" });
      } else if (!this.$utils.judgeNull(this.signIn.password)) {
        this.$utils.showToast({ text: "请填写登录密码" });
      } else {
        this.$axios
          .post("/user/signIn", this.signIn)
          .then(res => {
            return new Promise(resolve => {
              this.$utils.showToast({ text: res.data.data.text }).then(() => {
                resolve(res);
              });
            });
          })
          .then(res => {
            if (res.data.code === 0) {
              this.$router.replace("/");
              sessionStorage.setItem("userId", res.data.data.userId);
            }
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
