<template>
  <div class="city-group">

      <van-index-bar :index-list="indexList">
        <van-index-anchor index="#">热门</van-index-anchor>
        <div class="hotDoor">
          <template v-for="(item,index) in groupData.hotCities" :key="index">
            <div class="list" @click="cityClick(item)">
              {{item.cityName}}
            </div>
          </template>
        </div>

        <template v-for="(group,index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group" />
          <template v-for="(cityGroup,index) in group.cities" :key="index">
            <van-cell :title="cityGroup.cityName" @click="cityClick(cityGroup)"/>
          </template>
        </template>
      </van-index-bar>

  </div>
</template>

<script setup>

import {computed} from "vue";
import {useRouter} from "vue-router";
import useCityStore from "@/store/modules/city";

const props = defineProps({
  groupData:{
    type:Object,
    default:()=>({})
  }
})

// 获取实际的 A-Z 序列列表，通过 map 映射出来每个对象中的 group 并返回一个数组
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift('#')
  return list
} )
// console.log(indexList.value) // ['#','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'X', 'Y', 'Z']

// 监听城市点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (item) => {
  // console.log(item)
  cityStore.currentCity = item
  // console.log(cityStore.currentCity)
  // 返回上一级
  router.back()
}
</script>

<style scoped lang="less">
.city-group{
  .hotDoor{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px 20px 10px 10px;

    .list{
      width: 70px;
      height: 28px;
      border-radius: 14px;
      font-size: 12px;
      background-color: #fff9f8;

      display: flex;
      justify-content: center;
      align-items: center;
      //text-align: center;
      margin: 2px 0;
    }
  }
}
</style>