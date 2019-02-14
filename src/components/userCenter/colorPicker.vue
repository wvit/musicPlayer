<template>
  <div class="colorPicker">
    <el-color-picker
      v-model="mainColor"
      @change="selectColor"
    ></el-color-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainColor: this.$store.state.config.mainColor //主题颜色
    };
  },
  methods: {
    //选择并保存主题颜色
    selectColor(color) {
      if (color) {
        this.$store.commit("setMainColor", color);
        this.$utils.setMainColor(color);
        if (sessionStorage.getItem("userId")) {
          this.$axios.post("/user/setConfig", {
            userId: sessionStorage.getItem("userId"),
            mainColor: color
          });
        } else {
          sessionStorage.setItem("mainColor", color);
        }
      }
    }
  }
};
</script>

<style scoped>
.colorPicker {
  height: 40px;
}
</style>

