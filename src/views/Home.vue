<template>
    <div class="box">
        <!-- 下拉加载 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <!-- 提示栏 -->
            <van-notice-bar
                left-icon="volume-o"
                mode="closeable"
                text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
            />

            <!-- 搜索框 -->
            <van-search
                show-action
                label="JD"
                shape="round"
                background="#DC7E68"
                :placeholder="text.list"
                @search="onSearch"
            >
            <template #action>
                <div class="login" @touchstart="onSearch">登录</div>
            </template>
            </van-search>

            <!-- 轮播图 -->
            <van-swipe class="home-swipe" :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image" alt="">
                </van-swipe-item>
            </van-swipe>
            <!-- 分割线 -->
            <van-divider
                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
                >
                商品列表
            </van-divider>

            <!-- 商品列表 -->
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :offset="20"
                :immediate-check='false'
            >
                <div v-for="i in length" :key="i" class="row">
                    <CjGoodItem :good="goods[2*i-2]" />
                    <CjGoodItem :good="goods[2*i-1]" />
                </div>
            </van-list>
        </van-pull-refresh>

        <CjTabber />
    </div>
</template>

<script>

import { CjTabber,CjGoodItem } from "@/components/"

import { 
    NoticeBar,
    List,
    PullRefresh,
    Search,
    Swipe, 
    SwipeItem,
    Lazyload,
    Divider,
    Toast
} from 'vant';

    export default {
        name:"Home",
        data:function(){
            return {
                task:"",
                isLoading:false,
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg',
                ],
                goods: [],
                // 触发加载数据变为true
                loading: false,
                finished: false,
                // 触发下拉变为true
                refreshing: false,
                page:1,
                texts:[
                    {id:0,list:"魅族手机"},
                    {id:1,list:"华硕电脑"},
                    {id:2,list:"华为平板"}
                ]
            }
        },
        computed:{
            length:function(){
                return Math.floor(this.goods.length / 2)
            },
            text:function(){
                let txt = this.texts
                return txt[Math.floor(Math.random()*txt.length)]
            }
        },
        components:{
            CjTabber,
            CjGoodItem,
            [NoticeBar.name]:NoticeBar,
            [PullRefresh.name]:PullRefresh,
            [Search.name]:Search,
            [Swipe.name]:Swipe,
            [SwipeItem.name]:SwipeItem,
            [Lazyload.name]:Lazyload,
            [List .name]:List ,
            [Divider.name]:Divider 
        },
        mounted(){
            this.getList()
        },
        methods:{
            getList(){
                // 页数 每次六条数据
                var params = {
                    page:this.page,
                    size:6
                }
                this.$http.fetchGoodList(params).then(res=>{
                    console.log("res",res)
                    // 数组合并
                    if(res.length===0) Toast.success("数据已加载到底！")
                    if(res.length>0){
                        // 继续加载数据
                        // 判断是否是下拉刷新
                        if(this.refreshing){
                            this.goods = res
                        }else{
                            this.goods = [...this.goods,...res]
                        }
                    }
                    // 控制触底加载是否reset
                    this.loading = false
                    // 控制下拉刷新是否reset
                    this.refreshing = false
                   
                })
            },
            // 跳转登录
            onSearch(){
                this.$router.replace("/login")
            },
            // 下拉刷新
            onRefresh(){
                setTimeout(()=>{
                    this.page = 1
                    this.getList()
                },1500)
            },
            // 加载数据
            onLoad(){
                this.page++
                this.getList()
            }
        }
    }
</script>

<style lang='scss' scoped>
/* 引入局部样式sass */
    .box{
        background: #F0F2F5;
        margin-bottom: 1.333333rem;
        .van-search{
            position: static;
        }
        .login{
            color: #fff;
        }
        .home-swipe{
            width: 10rem;
            height: 5rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .van-list{
           
            .row{
                display: flex;
            }
        }
        
    }
   
</style>