<template>
  <div class="tab-bar">
    <template v-for="(item,index) in tarBarData">
      <div class="tab-bar-item" :class="{ active:currentIndex === index}" @click="tabClick(index,item)">
        <!-- 图片形状改变 -->
        <img v-if="currentIndex === index" :src="getAssetUrl(item.imageActive)">
        <img v-else :src="getAssetUrl(item.image)">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {useRouter} from 'vue-router'

import tarBarData from '@/assets/data/tabbar.js'
import getAssetUrl from "@/utils/load_assets.js";


const currentIndex = ref(0)
const router = useRouter()

const tabClick = (index, item) => {
  currentIndex.value = index
  router.push(item.path)
}

</script>

<style scoped lang="less">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  width: 100%;
  border-top: 1px solid #f3f3f3;

  display: flex;

  .tab-bar-item {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    &.active {
      color: var(--primary-color);
    }

    .text {
      font-size: 12px;
    }

    img {
      width: 32px;
    }
  }
}
</style>