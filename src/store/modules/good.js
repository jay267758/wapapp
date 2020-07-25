export default {
    // 开启子模块的命名空间，这个必须要开启，否则这个子模块无法使用
    namespaced:true,
    state:{
        find:{},
    },
    getters:{},
    mutations:{
        // 向find值添加数据
        updateFind(state,payload){
            console.log(payload)
            state.find[payload.idx] = payload.list
        },
        // 清除所有缓存
        clearFind(state){
            state.find = {}
        }
    },
    actions:{}
}