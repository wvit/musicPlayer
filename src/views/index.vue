<template>
  <div>
    <titleHead title="首页"></titleHead>

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
