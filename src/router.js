// 模块引入
import Vue from 'vue'
// 根组件
import VueRouter from 'vue-router'
// 注册，使用Vue.use()注册路由
Vue.use(VueRouter)

// 外部导入的组件不能直接使用，要转为局部组件
// ./当前路径 @绝对路径（C:/vue/...）

// 路由懒加载 异步加载 节省应用程序的性能
const Home = ()=>import("@/views/Home.vue")
const Find = ()=>import("@/views/Find.vue")
const Cart = ()=>import("@/views/Cart.vue")
const User = ()=>import("@/views/User.vue")
const Login = ()=>import("@/views/Login.vue")
const Detail = ()=>import("@/views/Detail.vue")
const Detail2 = ()=>import("@/views/Detail2.vue")
const Address = ()=>import("@/views/Address.vue")




const router = new VueRouter({
    // 用于指定路由模式，常用有两种，分别是hash和history
    mode:"history",//一个#号
    // 局部组件的使用
    routes:[
        // 输入指定的路由(url)显示指定的内容
        {path:"/home",component:Home},
        {path:"/find",component:Find},
        {path:"/cart",component:Cart},
        {path:"/user",component:User},

        
        {path:"/login",component:Login},
        {path:"/detail/:id",component:Detail},
        {path:"/detail2",component:Detail2},
        {path:"/address",component:Address},
        {path:"/*",redirect:"/home"},
    ]
})

// 全局路由守卫
router.beforeEach((to,from,next)=>{
    console.log(to)     // 当前要进入的目标路由
    console.log(from)   // 当前要离开的目标路由
    console.log(next)   // next实现跳转功能
    if(to.path === '/cart' || to.path === '/user'){
        let token = localStorage.getItem("token")
        if(token){
            next()
        }else{
            next("/login")
        }
    }else{
        next()
    }
})

// 使用ES6的模块化语法，把当前路由实例抛出去
export default router




/* 
mode='hash'
    缺点：URL中有一个 # 号，看上去怪怪的
    优点：部署到服务器上时，单页面应用程序被刷新时不会发生404.

mode='history'
    优点：URL中没有 #
    缺点：部署到服务器上时，单页面应用程序被刷新时会发生404。
    要求后端或运维在服务器（Nginx）上做重定向处理。 
*/