<template>
  <div class="home" ref="homeRef">
    <home-nav-bar></home-nav-bar>

    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>

    <home-search-box></home-search-box>
    <!-- 热门推荐 -->
    <home-categories/>

    <div class="search-bar" v-show="scrollShow">
      <search-bar/>
    </div>

    <!-- 精选 -->
    <home-content/>
  </div>
</template>


<script>
// 为了使组件可以使用 keep-alive 需要有name
export default {name:'home'}
</script>

<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import SearchBar from '@/components/search-bar/search-bar.vue'
import useHomeStore from "@/store/modules/home";

import useScroll from "@/hooks/useScroll";
import {onActivated, ref, watch} from "vue";


const homeStore = useHomeStore()
homeStore.fetchHouseList() // 发送网络请求

// 监听window滚动
// useScroll(()=>{
//   homeStore.fetchHouseList()
// })
const homeRef = ref()
const {isScroll,scrollTop} = useScroll(homeRef)
watch(isScroll,(newValue)=>{
  // 如果 监听的isScroll 发生改变为true 时表示达到底部，就加载更多数据
  if (newValue){
    homeStore.fetchHouseList()
  }
})
// 搜索框显示的控制
const scrollShow = ref(false)
watch(scrollTop,(newTopValue)=>{
  if (newTopValue >= 620){
    scrollShow.value = true
  }else if (newTopValue < 640){
    scrollShow.value = false
  }
})

// 跳转其他页面返回时还是原来的位置
onActivated(()=>{
  homeRef.value?.scrollTo({
    top:scrollTop.value
  })
})

</script>

<style scoped lang="less">
.home {

  padding-bottom: 60px;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;

  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar{
    position: sticky;
    top: 0;
    z-index: 9;
    padding: 15px;
    background-color: #ffffff;
  }

}
</style>