<template>
  <div class="colorPicker">
    <el-color-picker v-model="colorValue"></el-color-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colorValue: "#409EFF"
    };
  }
};
</script>

<style scoped>
.colorPicker {
  height: 40px;
}
</style>

