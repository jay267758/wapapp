<template>
    <div class="box">
        <div class="cj-find-left">
            <div v-for="(item,index) in findLeft" :key="item.id"> 
                <p v-text="item.cate_zh" @touchstart="touch(index,item)" :class="{'on':conut==index}"></p>
            </div>
        </div>
        <div class="cj-find-right">
            <van-grid :column-num="3">
                <van-grid-item v-for="item in findRight" :key="item._id">
                    <img :src="item.img" alt="">
                    <span v-text="item.name"></span>
                </van-grid-item>
            </van-grid>
        </div>
        <CjTabber/>
    </div>
   
    
</template>

<script>
import { CjTabber } from "@/components/"

// mapState 读取缓存数据
// mapMutations 向mapstate中存缓存数据
import {mapMutations,mapState} from "vuex"
import {
    Grid,
    GridItem
} from 'vant'
export default {
    name:"Find",
    data:function(){
        return {
            conut:0,
            findLeft:[],// 商品类型
            findRight:[],// 存放缓存数据
        }
    },
    computed:{
        ...mapState('good',['find'])
    },
    components:{
        CjTabber,
        [Grid.name]:Grid,
        [GridItem.name]:GridItem
    },
    mounted(){
        this.init()
    },
    // 离开本页面，清除缓存
    beforeDestroy(){
        // 清除缓存
        this.clearFind()
    },
    methods:{
        ...mapMutations('good',['updateFind','clearFind']),
        // 异步处理 初始化
        async init(){
            // await等待和async配套使用 请求商品类型
            let arr = await this.$http.fetchAllCates({})
            this.findLeft = arr
            let params = { cate:arr[0].cate }// 第一页
            // 商品类型对应的内容(通过cate查找出商品类型对应的内容)
            this.$http.fetchGoodsOfCate(params).then(res=>{
                // 渲染页面(初始化)
                this.findRight = res
                // 把请求的数据，放入状态管理工具缓存中
                this.updateFind({idx:0,list:res})
            })

        },

        touch(ids,item) {
            this.conut = ids
            // 调用还没调取的接口，用cate区分商品类型
            let params = { cate: item.cate }

            // 有缓存，使用缓存的数据
            if(this.find[ids] && this.find[ids].length){
                this.findRight = this.find[ids]
            }else{
                // 重新请求数据
                this.$http.fetchGoodsOfCate(params).then(res=>{
                    this.findRight = res
                    // 缓存数据到state
                    this.updateFind({ids,list:res})
                })
            }
        },

    }
}
</script>

<style lang="scss" scoped>
.box{
    .cj-find-left{
        position:absolute;
        top: 0;
        left: 0;
        width: 2.5rem;
        font-size: 0.45rem;
        text-align: center;
        overflow: auto;
        bottom: 1.6rem;
        background: #F8F8F8;
        div{
            line-height: 1.3rem;
            p{
                margin: 0;
            }
        }
        p.on{
            background: #fff;
            color: #E93B3D;
        }
    }
    .cj-find-right{
        position: absolute;
        top: 0;
        right: 0;
        left: 2.5rem;
        overflow: auto;
        bottom: 1.6rem;
        .van-grid-item{
            width: 2.56rem;
            height: 2.853333rem;
            img{
                width: 1.866667rem;
                height: 1.866667rem;
            }
            span{
                height: 0.4rem;
                font-size: 0.35rem;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>