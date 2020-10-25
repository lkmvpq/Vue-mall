import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
  // console.log('执行obj');
  //创建
  const toastContrustor = Vue.extend(Toast)
  //new
  const toast = new toastContrustor()
  //挂载
  toast.$mount(document.createElement('div'))
  //toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj