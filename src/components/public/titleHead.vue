<template>
  <div class="head">
    <p class="title">
      {{title}}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  }
};
</script>
<style scoped>
.head {
  position: relative;
  height: 40px;
  margin-bottom: 30px;
  background: #1ba160;
}
.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #fff;
}
</style>

