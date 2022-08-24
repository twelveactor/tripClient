<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentActive" active-color="#ff9854" route>

      <template v-for="(item,index) in tarBarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <!-- 获取本地图片资源需要进行特殊拼接处理 -->
            <img v-if="currentActive === index" :src="getAssetUrl(item.imageActive)" alt="">
            <img v-else :src="getAssetUrl(item.image)" alt="">
          </template>
        </van-tabbar-item>
      </template>

    </van-tabbar>
  </div>
</template>

<script setup>
import {ref, watch} from "vue"

import tarBarData from '@/assets/data/tabbar.js'
import getAssetUrl from "@/utils/load_assets.js";
import {useRoute} from "vue-router";

const route = useRoute()
const currentActive = ref(0);
// 在直接通过路由名称切换的时候图标也跟着一起切换
watch(route,(newRoute)=>{
  const index = tarBarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currentActive.value = index
})


</script>

<style scoped lang="less">
.tab-bar {

  height: 50px;

  :deep(.van-tabbar-item__icon) {
    font-size: 28px;
  }

  img {
    height: 24px;
  }

}
</style>