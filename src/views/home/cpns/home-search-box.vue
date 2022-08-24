<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
    <!-- 日期范围 -->
    <div class="date-range"  @click="showCalender = true" >
      <div class="start">
        <div class="data">
          <div class="tip">入住</div>
          <div class="time">{{ startDate }}</div>
        </div>
      </div>
      <div class="stay">共 {{ countDateDiff  }} 晚</div>
      <div class="end">
        <div class="data">
          <div class="tip">离店</div>
          <div class="time">{{ endDate }}</div>
        </div>
      </div>
    </div>
    <van-calendar v-model:show="showCalender" type="range" @confirm="onConfirm" :show-confirm="false"/>
    <!-- 其他 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <div class="section keyword bottom-gray-line">关键字 / 位置 / 民宿名</div>
    <!-- 热门建议 -->
    <div class="hot-suggest">
      <template v-for="(item,index) in hotSuggest" :key="index">
        <div class="hot-suggest-item"
        :style="{color:item.tagText.color,backgroud:item.tagText.background.color}">{{item?.tagText?.text}}</div>
      </template>
    </div>
    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchClick">开始搜索</div>
    </div>

  </div>
</template>

<script setup>

import {useRouter} from 'vue-router'
import useCityStore from "@/store/modules/city";
import {formatMonthDay, getDiffDate} from "@/utils/format_date";
import {ref} from "vue";
import useHomeStore from "@/store/modules/home";
import {storeToRefs} from "pinia";
import useMainStore from "@/store/modules/mian";


const router = useRouter()

// 城市位置选择
const cityClick = () =>{
  router.push('/city')
}
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;//纬度
        const longitude = position.coords.longitude;//经度
        console.log("Latitude : " + latitude + " Longitude: " + longitude);
        console.log(position)
      },
      function (err) {
        console.log("您的浏览器不支持此项技术")
      },
      {
        // enableHighAccuracy: true,
        timeout: 5000,
        // maximumAge: 0
      }
  )
}

// 当前城市
const cityStore = useCityStore()
// const currentCity = cityStore.currentCity // 一定不要这样直接对 store 的state数据进行赋值给其他，可以进行结构
const { currentCity } = storeToRefs(cityStore)

// 日期范围
// 默认当前时间和后推迟一天
const nowDate = new Date()
const startDate = ref(formatMonthDay(nowDate))
const newDate = nowDate.setDate(nowDate.getDate() + 1) // 当前天数往后推迟一天，也就是明天
const endDate = ref(formatMonthDay(newDate))

const mainStore = useMainStore()
const {startDates,endDates} = storeToRefs(mainStore)

// 日历组件选择区间
const showCalender = ref(false)
const countDateDiff = ref(1)
const onConfirm = (values) => {
  startDate.value = formatMonthDay(values[0])
  endDate.value = formatMonthDay(values[1])

  mainStore.startDates = values[0]
  mainStore.endDates = values[1]
  // 方法一：时间相减,通过时间戳,先取绝对值时间戳，然后在经过转换后进行向上取整
  // countDateDiff.value = Math.ceil((Math.abs(values[1].getTime() - values[0].getTime())) / (1000*60*60*24))
  // 方法二：通过 dayjs
  countDateDiff.value = getDiffDate(values[0],values[1])

  showCalender.value = false
}



// 热门建议数据请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggest()
const {hotSuggest} = storeToRefs(homeStore)

// 搜索按钮
const searchClick = () => {
  router.push({
    path:'/search',
    query:{
      startDate:startDate.value,
      endDate:endDate.value,
      currentCity:currentCity.value.cityName
    }
  })
}



</script>

<style scoped lang="less">
.search-box{

  .location {
    display: flex;
    align-items: center;
    //margin-top: 20px;
    padding: 0 20px;
    height: 44px;

    .city {
      flex: 1;
      //margin-left: 20px;
    }

    .position {
      display: flex;
      width: 80px;
      //margin-right: 10px;

      .text {
        line-height: 18px;
      }

      img {
        width: 18px;
        margin-left: 5px;
        //vertical-align: -20px;
      }
    }
  }

  .date-range{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
    margin-top: 10px;

    .data {
      width: 60px;
      height: 40px;
      //text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .tip{
        font-size: 8px !important;
        color: #c6c6c6;
      }

      .time{
        margin-top: 2px;
        font-size: 14px;
      }
    }
  }

  .section{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
    margin-top: 20px;
    font-size: 8px !important;
    color: #c6c6c6;

    .start{
      width: 60px;
      height: 40px;
    }
    .end{
      width: 60px;
      height: 40px;
    }
  }

  .keyword{
    margin-top: 10px;
  }

  .hot-suggest{
    display: flex;
    flex-wrap: wrap;
    ////justify-content: space-between;
    padding:10px;
    //margin-top: 20px;

     .hot-suggest-item{
       padding: 4px 8px;
       margin: 4px;
       border-radius: 12px;
       font-size: 12px;
       line-height: 1;
     }
  }

  .search-btn{
    display: flex;
    justify-content: center;
    .btn{
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-weight: 500;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      background-image: var(--theme-linear-gradient);
      //background-color: #fdb77f;
    }

  }
}
</style>