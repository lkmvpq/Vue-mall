import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
    cartList: []
  }

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // state: {
  //   cartList: []
  // },
  // mutations: {
  //   addCounter(state, info) {
  //     info.count++
  //   },
  //   addToCart(state, info) {
  //     state.cartList.push(info)
  //   }
  // },
  // actions: {
  //   addCart(context, info) {
  //     // console.log(info);
  //     // 1.查看是否添加过
  //     const oldInfo = context.state.cartList.find(item => item.iid === info.iid)
  
  //     // 2.+1或者新添加
  //     if (oldInfo) {
  //       // oldInfo.count += 1
  //       context.commit('addCounter', oldInfo)
  //     } else {
  //       info.count = 1
  //       info.checked = true
  //       // state.cartList.push(info)
  //       context.commit('addToCart', info)

  //     }
  //   }
  // },
  modules: {
  }
})
