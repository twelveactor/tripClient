<template>
  <div class="app">
    <!-- vue3 推荐保吃组件不销毁使用这种方法-->
    <router-view v-slot="props">
      <keep-alive include="home" >
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

<!--    <keep-alive >-->
<!--      <router-view></router-view>-->
<!--    </keep-alive>-->

    <tab-bar v-show="!route.meta.hideTabBar"></tab-bar>
    <loading/>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import TabBar from '@/components/tab-bar/tab-bar.vue'
import Loading from '@/components/loding/loading.vue'

// useRoute() 拿到当前活跃的路由对象
const route = useRoute()
// 获取 当前路由 meta 对象信息
// const hideTabBar = route.meta.hideTabBar

</script>

<style scoped lang="less">
.app {
  height: calc(100vh - 50px);


}
</style>
