<template>
  <div class="house-item">

    <div class="item-inner">
      <!-- 封面 -->
      <div class="cover">
        <img :src="houseDataV9.image.url" alt="">
      </div>
      <!-- 信息 -->
      <div class="infos">
        <!-- summary 描述-->
        <div class="summary">{{houseDataV9.summaryText}}</div>
        <!-- name 名称-->
        <div class="name">{{houseDataV9.houseName}}</div>
        <!-- price 价格-->
        <div class="price">
          <van-rate :model-value="itemScore" :size="12" color="#ffd21e" void-icon="star" void-color="#eee" allow-half readonly/>
          <div class="new-price">{{"￥" + houseDataV9.finalPrice}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  houseDataV9:{
    type:Object,
    default:() => ({})
  }
})

const itemScore = computed(() => {
  return Number(props.houseDataV9.commentScore)
})
</script>

<style scoped lang="less">
.house-item {
  width: 49%;
  border: 1px solid #f3f3f3;
  border-radius: 6px;


  .item-inner {
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;

    .cover {
      img {
        width: 100%;
      }
    }

    .infos {
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;

      .summary {
        font-size: 12px;
      }

      .name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
  }
}
</style>