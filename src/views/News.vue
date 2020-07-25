<template>
    <div>
        <div class="nav">
            <!-- 不加/cn 默认显示(重定向) -->
            <router-link to="/news" exact tag="span" active-class="on">国内新闻</router-link>
            <router-link to="/news/en" exact tag="span" active-class="on">国外新闻</router-link>
        </div>
        <div class="view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {

   
    
}
</script>

<style scoped>
.nav{
    width: 80%;
    height: 30px;
    margin: 0 auto;
    display: flex;
    text-align: center;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
}
.nav span{
    flex: 1;
    cursor: pointer;
}
.nav span.on{
    color: yellowgreen;
    border-bottom: 2px solid red;
}
.view{
    margin: 30px;
}
</style>