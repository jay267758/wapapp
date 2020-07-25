// 将getCnodeList引入进来
import {getCnodeList} from "@/utils/api"

export default {
    // 开启子模块的命名空间，这个必须要开启，否则这个子模块无法使用
    namespaced:true,
    // 共享的数据都要放在state
    state:{
        msg:"hello vuex",
        cont:1,
        list:[
            {id:1,tilit:"数学"},
            {id:2,tilit:"语文"}
        ],
        // 接收接口的数据
        cnodelist:[]
    },
    getters:{
        // 相当于计算属性
        // 当被关联的state变量变化的时候，getters变量会重新计算
        total:function(state){
            return state.list.length
        }
    },
    // mutations可以修改，操作state
    // state被修改完成，页面视图自动更新
    mutations:{
        addCount(state){
            state.cont++
        },
        subCount(state){
            state.cont--
        },
        addList(state,idx){
            state.list.push(idx)
        },
        delTodo(state,idx){
            state.list.splice(idx,1)
        },
        clearList(state){
            state.list = []
        },
        changeCnodeList(state,payload){
            state.cnodelist = payload
        }
    },
    // action是Vuex官方建议的，与后端接口对接的入口
    // 工作中，一般让那些需要被多个组件共享的后端数据，走actions
    // 在actions中，可能直接修改state，但是不推荐这么做
    actions:{
        ajaxConde(store,params){
            getCnodeList(params).then(res=>{//res接口请求回来的数据
                // 可以直接
                // store.state.cnodelist = res
                // commit()调用mutations模块
                // console.log(store)
                store.commit('changeCnodeList',res)
            })
        }
    }
}