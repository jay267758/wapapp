// 是整个应用程序的入口文件

import Vue from 'vue'
// 根组件
import App from './App.vue'
// 项目上线后，报错不处理
Vue.config.productionTip = false

// 使用ES6模块化语法，把路由实例导入进来
import router from '@/router.js'

// 状态管理
import store from '@/store/'

// http请求，把http封装的api方法，挂在原型上，便于整个应用程序进行使用
import http from '@/utils/api'
Vue.prototype.$http = http

// 创建根窗器、根组件
new Vue({
  store,
  router, //挂载router(ES6中属性和值相同可写一个)
  render: h => h(App),
}).$mount('#app')
