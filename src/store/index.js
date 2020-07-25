import Vue from "vue"
import Vuex from "vuex"

// 导入子模块不能用@
import textStore from "./modules/test"
import goodStore from "./modules/good"
// 注册路由
Vue.use(Vuex)

const store = new Vuex.Store({
    // 挂载子store
    modules:{
        text:textStore,
        good:goodStore
    }

})

export default store