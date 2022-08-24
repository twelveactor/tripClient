<template>
  <div class="home-content">
    <h2 class="title">热门精选</h2>

    <div class="list">
      <template v-for="(item,index) in houseList" :key="item.data.houseId">
        <house-item-v9 v-if="item.discoveryContentType === 9" :house-data-v9="item.data" @click="currentItem(item.data)"/>
        <house-item-v3 v-if="item.discoveryContentType === 3" :house-data-v3="item.data" @click="currentItem(item.data)"/>
      </template>
    </div>


  </div>
</template>

<script setup>
import HouseItemV9 from '@/components/house-item-v9/house-item-v9.vue'
import HouseItemV3 from '@/components/house-item-v3/house-item-v3.vue'

import useHomeStore from "@/store/modules/home";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
const router = useRouter()

const homeStore = useHomeStore()
const {houseList} = storeToRefs(homeStore)

// 监听组件的点击事件，默认绑定的是组件里面的根元素，如果组件内部有多个根就有问题
const currentItem = (data) => {
  // console.log('click',data)
  router.push('/detail/'+data.houseId)
}

</script>

<style scoped lang="less">
.home-content{
  padding: 10px 10px;

  .title{
    font-size: 22px;
    padding: 5px;
  }

  .list{
    display: flex;
    flex-wrap: wrap;
    padding: 10px 5px;
    justify-content: space-around;
  }
}
</style>