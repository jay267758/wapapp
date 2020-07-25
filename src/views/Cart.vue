<template>
    <div class="cj-Cart">
        <!-- 导航栏 -->
        <van-nav-bar
            title="购物车"
            left-text="返回"
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
            fixed
        />

        <!-- Layout布局 -->
        <div v-for="(item,index) in listArrer" :key="item.id">
            <van-swipe-cell>
                <van-row >
                    <van-col span="4">
                        <van-checkbox id="checkbox" v-model="item.checked" @click="rowClick"></van-checkbox>
                    </van-col>
                    <van-col span="20">
                        <van-card
                            :num="item.num"
                            :price="item.good.price"
                            :desc="item.good.desc"
                            :title="item.good.name"
                            class="goods-card"
                            :thumb="item.good.img"
                        >
                            <template #footer>
                                <van-button @click='changeNum(index,item,"sub")' size="mini">-</van-button>
                                <van-button @click='changeNum(index,item,"add")' size="mini">+</van-button>
                            </template>
                        </van-card>
                    </van-col>
                </van-row>
                <template #right>
                    <van-button @click="remove(item)" square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </div>
        <!-- 购物详情 -->
        
        <!-- 提交订单栏 -->
        <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checked" @click="fullClick">全选</van-checkbox>
            <template #tip>
                你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
            </template>
        </van-submit-bar>
    </div>
    
   
</template>

<script>
import {
    NavBar,
    Card,
    SubmitBar,
    Tag,
    Button,
    Checkbox,
    Col,
    Row,
    SwipeCell,
    Toast
} from "vant"
export default {
    // 局部路由守卫 (建议使用全局路由守卫)
    /* beforeRouteEnter(to,from,next){
        if(to.path == '/cart'){
            let token = localStorage.getItem("token")
            if(token){
                next()
            }else{
                next("/login")
            }
        }else{
            next()
        }
    }, */
    name:"Cart",
    data:function(){
        return{
            checked:false,
            listArrer:[]
        }
    },
    components:{
        [NavBar.name]:NavBar,
        [Card.name]:Card,
        [SubmitBar.name]:SubmitBar,
        [Button.name]:Button,
        [Checkbox.name]:Checkbox,
        [Tag.name]:Tag,
        [Col.name]:Col,
        [Row.name]:Row,
        [SwipeCell.name]:SwipeCell
    },
    mounted(){
        this.getCart()
    },
    computed:{
        total:function(){
            let t = 0
            // 循环每个商品
            this.listArrer.map(ele=>{
                // console.log(ele)
                // 判断是否选中
                if(ele.checked){
                    t += ele.num * ele.good.price
                }
            })
            return t*100
        }
    },
    methods:{
        getCart(){
            this.$http.fetchCartList({}).then(res=>{
                // console.log(res)
                res.map((ele,idx)=>{
                    // 给res自定义添加一个布尔值
                    res[idx].checked = false
                })
                this.listArrer = res

            })
        },
        onClickLeft(){
            //返回首页
            this.$router.back()
        },
        onClickRight(){

        },
        onSubmit(){
            // 通过字符串加；将id提交到服务器 如";asdasfadafa;asfdafadf"
            let idstr = ''
            this.listArrer.map(ele=>{
                if(ele.checked){
                    idstr += (';'+ele._id)
                }
            })
            this.$http.fetchCartSubmit({goods:idstr}).then(()=>{
                Toast.success("提交成功")
                this.getCart()
            })
        },
        onClickEditAddress(){

        },
        // 缓存处理(不通过刷新页面，直接在请求数据里修改)
        // 
        updateCartItem(idx,key,value){
            // console.log(idx,key,value) 下标 num 数值
            this.listArrer[idx][key] = value
        },
        // 加减运算
        // 修改数据
        changeNum(idx,item,typa){
            let data = {
                id:item._id,
                num:item.num
            }
            if(typa==="add"){
                data.num++
            }else{
                if(data.num === 1) return
                data.num--
            }
            this.$http.fetchUpdateNum(data).then(()=>{
                this.updateCartItem(idx,'num',data.num)
            })
        },
        // 删除数据
        remove(item){
            let params = {
                id:item._id
            }
            // 删除服务器端的数据
            this.$http.fetchDeleteGood(params).then(()=>{
                // 减少接口的调用 (不使页刷新，删除客户端的数据)
                this.listArrer.splice(params.id,1)
            })
        },
        // 多列选择按钮
        rowClick(){
            // 查找出符合ele.checked===false的数组arr长度
            let arr = this.listArrer.filter(ele=>ele.checked===true)
            // console.log(arr)
            this.checked = arr.length === this.listArrer.length
        },
        // 全选按钮
        fullClick(){
            this.listArrer.map((ele,idx)=>{
                this.listArrer[idx].checked = this.checked
                console.log(this.listArrer[idx])
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.cj-Cart{
     margin-top: 1.333333rem;
     margin-bottom: 2.2rem;
    .van-row{
        .van-button{
            width: 1rem;
            height: 0.7rem;
        }
        .goods-card {
            margin: 0;
            background-color: white;
        }
    }
    .delete-button {
        height: 100%;
    }
}
</style>