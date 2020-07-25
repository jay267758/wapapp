<template>
<div>
    <!-- 导航栏 -->
    <van-nav-bar
        title="京东注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />

    <!-- 注册 -->
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
        <van-field
            v-model="password2"
            type="password"
            name="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            注册
            </van-button>
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
            password2:''
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
                password: this.password,
                password2: this.password2
            }
            this.$http.fetchRegist(data).then(()=>{
                alert("注册成功")
                setTimeout(()=>{
                    this.$router.replace("/login")
                },1500)
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>