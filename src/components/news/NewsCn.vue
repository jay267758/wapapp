<template>
    <div>
        <div v-for="item in list" :key="item.id" @click="Deliti(item.id)">
            <span v-text='item.id'></span>
            <span>-</span>
            <span v-text="item.titli"></span>
        </div>
        
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            list:[
                {id:1,titli:"水电费撒大声地"},
                {id:2,titli:"你告诉客人个单词"},
                {id:3,titli:"我们可能的父母给你"},
                {id:4,titli:"拿手机公司发你的"},
            ]
        }
    },
    methods:{
        Deliti(id){
            // 路由栈（数组操作 push pop shift unshift)
            // 编程式路由跳转，跳转到/detail

            // 动态路由，常常用于列表页到详情页面的动态传参
            // this.$router.push("/detail/"+item.id+"/"+item.titli)
            
            // 动态路由，在路由上显示/detail/id值，通过Detail.vue页面获取
            this.$router.push("/detail/"+id)
            // this.$router.replace("/detail") //效果同上
        }
    }
}
</script>


<style scoped>


</style>