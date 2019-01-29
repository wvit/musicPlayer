import Vue from 'vue';
import ElementUI from 'element-ui';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/utils';
import '@/axios';
import '@/assets/css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css'

Vue.use(ElementUI)
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');