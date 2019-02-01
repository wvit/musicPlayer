import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//用户配置信息
const config = {
  state: {
    mainColor: '#333', //主题颜色
  },
  mutations: {
    //设置背景颜色
    setMainColor(state, color) {
      state.color = color;
    },
  },
}

export default new Vuex.Store({
  strict: true,
  modules: {
    config
  }
})