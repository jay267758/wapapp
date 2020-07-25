<template>
<div>
    <!-- 导航栏 -->
    <van-nav-bar
        title="京东登陆注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />

    <!-- 登陆 -->
    <van-form @submit="onSubmit">
        <van-field
            v-model="username"
            name="用户名"
            placeholder="用户名/邮箱/手机号"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            登录
            </van-button>
        </div>
        <!-- 注册 -->
        <div class="registered">
            <span @touchstart="btn">快速注册</span>
        </div>
    </van-form>
</div>
</template>


<script>
import {
    NavBar,
    Form,
    Field,
    Button,
} from "vant"

export default {
    name:"Deatil",
    data:function () {
        return {
            username: '',
            password: '',
        }
    },
    components:{
        [NavBar.name]:NavBar,
        [Form.name]:Form,
        [Button.name]:Button,
        [Field.name]:Field
    },
    mounted() {
       
    },
    methods:{
        // 跳到主页
        onClickLeft(){
            this.$router.replace("/home")
        },
        // 登陆
        onSubmit(){
            let data = {
                username: this.username,
                password: this.password
            }
            this.$http.fetchLogin(data).then((res)=>{
                console.log(res.token)
                localStorage.setItem("token",res.token)
                alert("登陆成功")
                setTimeout(()=>{
                    // 跳到上一页
                    this.$router.replace("/home")
                },800)
            })
           
        },
        // 跳转注册页面
        btn(){
            this.$router.replace("/detail2")
        }

    }
    
}
</script>

<style lang="scss" scoped>
.registered{
   font-size: 0.4rem;
   float: right;
   margin-right: 50px;
}
</style>