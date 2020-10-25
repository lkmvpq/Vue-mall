import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(Toast)

//解决移动端300ms延迟,需要安装
FastClick.attach(document.body)

//npm install vue-lazyload --save,使用懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/lazy.gif')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
