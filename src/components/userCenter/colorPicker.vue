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
    //选择主题颜色
    selectColor(color) {
      if (color) {
        this.$store.commit("setMainColor", color);
        this.$utils.setMainColor(color);
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

