<template>
    <div class="cj-address">

        <van-nav-bar
        title="邮箱地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />

        <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>

import {
    NavBar,
    AddressEdit,
    Toast
} from "vant"
export default {
    data:function(){
        return {
            areaList:{},
            searchResult:[],
        }
    },
    components:{
        [AddressEdit.name]:AddressEdit,
        [NavBar.name]:NavBar
    },
    methods:{
        onClickLeft(){
            this.$router.replace("/home")
        },
        onSave() {
            Toast('save');
        },
        onDelete() {
            Toast('delete');
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
            {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },
            ];
            } else {
                this.searchResult = [];
            }
        },
    },
}
</script>

<style scoped>

</style>