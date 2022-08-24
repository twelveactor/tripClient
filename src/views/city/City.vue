<template>
  <div class="city">
    <div class="top">
      <van-search
      v-model="searchValue"
      show-action
      shape="round"
      placeholder="城市/区域/地址"
      @cancel="onCancelClick"/>

     <van-tabs v-model:active="tabActive" color="#ff9854" line-height="2px">
       <template v-for="(value,key) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
       </template>
      </van-tabs>
  </div>

    <!--搜索内容-->
    <div class="content">
     <template v-for="(value,key,index) in allCities">
       <city-group v-show="tabActive === key" :groupData="value"></city-group>
     </template>
    </div>

  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {storeToRefs} from 'pinia'

import useCityStore from "@/store/modules/city";

import CityGroup from './cpns/city-group.vue'

const router = useRouter()

// 搜索取消返回
const searchValue = ref("")
const onCancelClick = () => {
  router.back()
}

// 获取城市分页
const tabActive = ref(0)
// const tabCityInfo = ref({})
// 使用 pinia 状态管理中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCities()
const { allCities  } = storeToRefs(cityStore)


// 获取城市分页数据
// const  currentGroup = allCities[Object.keys(allCities)[tabActive.value]] // 比较麻烦的通过标签所以拿到对象的key获取数据有可能还不是响应式
// 目的：获取选中标签后的数据
// 1、获取正确的key,将 tabs 中绑定的 tabActive 正确绑定，在van-tab绑定 name ,tabs 就为 name
// 2、根据 key 从 allCities 读取数据，默认第一次直接获取的数据不是响应式，tab改变也不会重新获取数据，所以一直是undefined,需要用computed包裹
const  currentGroup = computed(()=> allCities.value[tabActive.value])
// console.log(currentGroup)




</script>

<style scoped lang="less">
.city{
  // 方法一： 固定定位
  //.top{
  //  position: fixed;
  //  top: 0;
  //  left: 0;
  //  right: 0;
  //}
  //.content{
  //  margin-top: 98px;

  // 方法二：局部滚动
  .content{
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}

</style>