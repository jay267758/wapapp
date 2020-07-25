<template>
  <div class="app">
      <div class="box">
          <router-view></router-view>
      </div>   
  </div>
</template>

<script>
// 外部有引入的组件，不能直接使用，必须先转成局部组件
// import HelloWorld from './components/HelloWorld.vue'

export default {
  // 局部组件的使用
  data:function(){
    return {

    }
  },
  components: {
    // HelloWorld
  },
  mounted(){
    // console.log("mounted")
  },
  methods:{

  }
}
</script>

<style lang="scss" >

  .app{
    width: 100%;
    height: 100%;
    .box{
      width: 100%;
      height: 100%;
    }
  }
.van-checkbox {
    .van-checkbox__icon {
      margin: 1rem auto;
    }
}
</style>
