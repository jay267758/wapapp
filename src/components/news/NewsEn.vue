<template>
    <div>
        <div v-for="item in list" :key="item.id" @click="Deliti(item.id)">
            <span v-text="item.id"></span>
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
            {id:1,titli:"水电费"},
            {id:2,titli:"你告诉"},
            {id:3,titli:"我们可"},
            {id:4,titli:"拿手机"},
        ]
        }
    },
    methods:{
        Deliti(id){
            // 路由栈（数组操作 push pop shift unshift)
            // 编程式路由跳转
            this.$router.push("/detail2/"+id)
            // this.$router.replace("/detail")
        }
    }
        
    
}
</script>


<style scoped>


</style>