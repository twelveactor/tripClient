<template>
  <div class="home-categories">

     <template v-for="(item,index) in categories" :key="item.id">
       <div class="item">
         <img class="item-img" :src="item.pictureUrl" alt="">
         <div class="item-title">{{item.title}}</div>
       </div>
     </template>

  </div>
</template>

<script setup>
// 热门类别
import {storeToRefs} from "pinia/dist/pinia";
import useHomeStore from "@/store/modules/home";

const homeStore = useHomeStore()
homeStore.fetchCategories(2)
const {categories} = storeToRefs(homeStore)
// console.log(categories)

</script>

<style scoped lang="less">
.home-categories{
  display: flex;
  overflow-x: auto;
  height: 60px;
  padding: 0 10px;
  margin-top: 15px;

  // 设置 scroll 滚动条为取消， & 为当前项目
  &::-webkit-scrollbar{
    display: none;
  }

  .item{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 60px;
    // 伸缩项目的大小大于伸缩容器，项目收缩以适应根据伸缩收缩
    flex-shrink: 0;
    padding: 0 5px;
    text-align: center;
    align-items: center;

    .item-img{
      width: 32px;
      height: 32px;
    }
    .item-title{
      font-size: 12px;
    }
  }
}
</style>