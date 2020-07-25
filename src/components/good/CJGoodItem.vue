<template>
    <div class="cj-good-item">
        <img :src="good.img" alt="" @touchstart='skipToDetail'>
        <div v-text="good.name"></div>
        <div>
            <span v-text="'￥'+good.price"></span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        good:{
            type:Object,
            required:true
        }
    },
    methods:{
        skipToDetail(){
            // 跳转到详情页并把id传过去
            this.$router.push("/detail/"+this.good._id)
        }
    }
}
</script>

<style lang="scss" scoped>
    .cj-good-item{
        widows: 5rem;
        flex: 1;
        box-sizing: border-box;
        font-size: 0.4rem;
        margin: 0 0.133333rem 0.133333rem 0;
        background: #fff;
        &>img {
            display: block;
            width: 5rem;
            height: 5rem;
        }
        &>div{
            padding: 0.2rem 0.2rem 0.1rem 0.2rem;
            font-size: 0.3rem;
            span{
                font-size: 0.48rem;
                color: red;
            }
        }

    }
</style>