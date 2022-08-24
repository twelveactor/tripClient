<template>
  <div class="loading" >
      <van-overlay :show="mainStore.isShowLoading" :lock-scroll="true" z-index="9"  >
        <div class="wrapper">
            <van-loading text-color="#0094ff" color="#0094ff" ></van-loading>
        </div>
      </van-overlay>
  </div>
</template>

<script setup>
import useMainStore from "@/store/modules/mian";
import {storeToRefs} from "pinia";

const mainStore  = useMainStore()
// const {isShowLoading} = storeToRefs(mainStore)
// console.log(window.document.documentElement.clientHeight)
</script>

<style scoped lang="less">

.wrapper{
  position: fixed;
  left: 50%;    //起始是在body中，横向距左50%的位置
  top:50%;      //起始是在body中，纵向距上50%的位置，这个点相当于body的中心点，div的左上角的定位
  transform:translate(-50%,-50%);// X轴Y轴 水平、垂直都居中,也可以写成下面的方式

}
</style>