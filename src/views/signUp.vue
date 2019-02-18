<template>
  <div>
    <titleHead title="注册账号"></titleHead>
    <div class="contentWrap mt30">
      <el-input
        v-model="signUp.nickname"
        placeholder="请输入昵称"
        class="mb20"
      ></el-input>
      <el-input
        v-model="signUp.email"
        placeholder="请输入邮箱"
        class="mb20"
      ></el-input>
      <div class="passwordInput mb20">
        <el-input
          :type="showPassword?'text':'password'"
          v-model="signUp.password"
          placeholder="请填写密码"
        ></el-input>
        <span
          :style="{background:`url(${showPasswordIcon}) no-repeat 50% 50%/100%`}"
          @click="showPasswordOnOff"
        ></span>
      </div>

      <div class="goSignIn">
        已有账号？
        <router-link
          to="/signIn"
          class="mainFontColor"
        >去登录</router-link>
      </div>

      <el-button
        type="success"
        class="sendBtn border-none mainStyleOn"
        @click="judgeSignUpInfo"
      >确认注册</el-button>
    </div>
  </div>
</template>
<script>
import showPassword1 from "@/assets/img/showPassword1.png";
import showPassword2 from "@/assets/img/showPassword2.png";

export default {
  data() {
    return {
      signUp: {
        //注册信息
        nickname: "",
        email: "",
        password: ""
      },
      showPassword: false, //是否明文显示密码
      showPasswordIcon: showPassword2 //明文密码开关icon
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
    //是否明文显示密码开关
    showPasswordOnOff() {
      this.showPassword = !this.showPassword;
      this.showPasswordIcon = this.showPassword ? showPassword1 : showPassword2;
    },
    //判断发送数据
    judgeSignUpInfo() {
      const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!this.$utils.judgeNull(this.signUp.nickname)) {
        this.$utils.showToast({ text: "请填写昵称" });
      } else if (!emailReg.test(this.signUp.email)) {
        this.$utils.showToast({ text: "请检查邮箱填写" });
      } else if (!this.$utils.judgeNull(this.signUp.password)) {
        this.$utils.showToast({ text: "请填写密码" });
      } else {
        this.$axios.post("/user/signUp", this.signUp).then(res => {
          this.$utils
            .showToast({
              text: res.data.data
            })
            .then(() => {
              if (res.data.code === 0) {
                this.$router.replace("/signIn");
              }
            });
        });
      }
    }
  }
};
</script>
<style scoped>
.passwordInput {
  position: relative;
}

.passwordInput span {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
}

.goSignIn {
  text-align: left;
}
.goSignIn {
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
