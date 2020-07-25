<template>
    <div class="cj-user">
        <!-- 用户名 -->
        <van-row>
            <van-col span="8">
                <van-image
                round
                width="2rem"
                height="2rem"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
            </van-col>
            <van-col span="16">
                <div>用户名</div>
                <div>名称</div>
                <div>
                    <span>京享值60000 </span>
                    <span>小白信用95.3 </span>
                    <span> ></span>
                </div>
            </van-col>
        </van-row>
        <!-- 数据信息 -->
        <van-grid :column-num="4">
            <van-grid-item icon="home-o" text="待付款" dot />
            <van-grid-item icon="search" text="待收货" badge="99+" />
            <van-grid-item icon="home-o" text="退换/售后" dot />
            <van-grid-item icon="search" text="全部订单" badge="99+" />
        </van-grid>
        <!-- 列表 -->
        <van-cell-group title="地址">
            <van-cell value="管理我的地址" is-link @click="address">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="custom-title">收货地址管理</span>
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group title="安全">
            <van-cell value="密码实名认证等管理" is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="custom-title">账户与安全</span>
                </template>
            </van-cell>
             <van-cell value="未设置" is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="custom-title">京东支付密码</span>
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group title="服务">
            <van-cell value="即时解答用户疑难" is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="custom-title">联系客服</span>
                </template>
            </van-cell>
             <van-cell value="" is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="custom-title">切换站点</span>
                </template>
            </van-cell>
        </van-cell-group>
        <!-- 功能按钮 -->
        <van-grid direction="horizontal" :column-num="3">
            <van-grid-item icon="service-o" text="意见反馈" />
            <van-grid-item icon="balance-o" text="京东客户端" />
            <van-grid-item @click="out" icon="user-circle-o" text="退出登录" />
        </van-grid>
        <CjTabber />
    </div>
</template>

<script>

import { CjTabber } from "@/components/"
import {
    Col,
    Row,
    Image,
    Grid,
    GridItem,
    Cell,
    CellGroup
} from "vant"

export default {
    name:"User",
    data:function(){
       
        return {
            
        }
    },
    components:{
        CjTabber,
        [Col.name]:Col,
        [Row.name]:Row,
        [Image.name]:Image,
        [Grid.name]:Grid,
        [GridItem.name]:GridItem,
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup
    },
    methods:{
        out(){
            let token = localStorage.getItem("token")
            if(token){
                token = ""
            }else{
                alert("请登录")
                this.$router.push('/login')
            }
        },
        address(){
            this.$router.push("/address")
        }
    }
}
</script>

<style lang="scss" scoped>
.cj-user{
    background: rgb(247, 246, 246);
    .van-row{
        background: #fff;
    }
    .van-col{
        padding-top: 0.266667rem;
        font-size: 0.4rem;
    }
    .van-image--round{
       margin-left:0.65rem;
    }
    .van-col--16{
        padding-top: 0.4rem;
    }
    
}
</style>