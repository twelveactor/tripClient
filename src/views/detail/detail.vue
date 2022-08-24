<template>
  <div class="detail" ref="detailRef">
    <!-- 导航标签 -->
    <tab-control
        v-if="showTabControl"
        class="tabs"
        :titles="names"
        @tabItemClick="tabClick"
        ref="tabControlRef"
    />

    <!-- 导航栏 -->
    <van-nav-bar
        title="房屋详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        :safe-area-inset-top="true"
    />

    <!-- 不希望前面导航栏等数据变化的时候引起main中的变化使用v-memo,表示只有当 mainPart 发生变化才变化-->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!-- 轮播图 -->
      <swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
    <!--  数据初始化时是 {} ，在空对象时不渲染数据 -->
    <!-- <swipe :swipe-data="mainPart?.topModule?.housePicture?.housePics"/>-->

      <!-- 描述标题信息 -->
      <detail-infos name="标题" :ref="getSection"  :top-infos="mainPart.topModule"/>

      <!-- 区域信息 -->
      <facility name="设施" :ref="getSection"  :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <detail-landlord name="房东" :ref="getSection" :landlord="mainPart.dynamicModule.landlordModule"/>
      <detail-comment name="评论" :ref="getSection"  :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知" :ref="getSection"  :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <detail-map name="周边" :ref="getSection"  :position="mainPart.dynamicModule.positionModule"/>
      <detail-intro  :price-intro="mainPart.introductionModule"/>
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>


  </div>
</template>

<script setup>
import Swipe from './cpns/swipe.vue'
import DetailInfos from './cpns/detail-infos.vue'
import Facility from './cpns/facility.vue'
import DetailLandlord from './cpns/detail-landlord.vue'
import DetailComment from './cpns/detail-comment.vue'
import DetailNotice from './cpns/detail-notice.vue'
import DetailMap from './cpns/detail-map.vue'
import DetailIntro from './cpns/detail-intro.vue'

import TabControl from "@/components/tab-control/tab-control.vue"

import {useRoute,useRouter} from "vue-router";
import {getDetailInfos} from "@/service/modules/detail";
import {computed, ref,watch} from "vue";
import useScroll from "@/hooks/useScroll";
const route = useRoute()
const router = useRouter()
const houseId = route.params.id

// 返回上一页
const onClickLeft = () => {
  router.back()
}

// 获取详情页数据
const detailInfos = ref({})
const mainPart = computed(()=> detailInfos.value.mainPart)  // 分解detailInfos中全部数据

getDetailInfos(houseId).then(res =>{
  // console.log(res)
  detailInfos.value = res.data
  // console.log(detailInfos.value )
})

// tabControl相关的操作
const detailRef = ref() // 拿到当前 div 实例
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

// const landlordRef = ref()
// 动态绑定组件实例ref
// const sectionEl = []
const sectionEl = ref({})
// 动态获取组件实例的name
const names = computed(()=>{
  return Object.keys(sectionEl.value)
})
const getSection = (value) =>{
  // console.log(value.$el) // 拿到组件实例中的div根元素
  // 当组件实例被卸载之后就会为空，直接返回
  if (!value) return
  // 获取组件实例中 div 的属性
  const name = value.$el.getAttribute('name')
  sectionEl.value[name] = value.$el
}

// tab 标签点击
let isClick = false
let currentDistance = -1
const tabClick = (index) =>{
  const key = Object.keys(sectionEl.value)[index] // 拿到 section 对象的key
  const el = sectionEl.value[key] // 根据 key 拿到value 数组保存的 组件实例div对象
  let instance = el.offsetTop
  if (index !== 0){
    instance = instance - 44
  }

  isClick = true
  currentDistance = instance

  // 点击标签滚动到对应的高度位置
  detailRef.value.scrollTo({
    // 组件实例拿到根元素需要通过 $el ,然后拿到偏移高度 - tab标签的高度
    top:instance,
    behavior:'smooth'
  })
}

// 页面滚动，自动匹配对应的tab标签,监听滚动
const tabControlRef = ref()
watch(scrollTop,(newValue)=>{
  if (newValue === currentDistance) {
    isClick =  false
  }
  if (isClick) return

  // console.log(newValue) // 新 scrollTop 位置
  // 遍历出tab标签的value
  const els = Object.values(sectionEl.value)
  const values = els.map(els => els.offsetTop)
  // console.log(values) // [306, 572, 945, 1288, 1651, 1917]

  // 根据 newValue 去匹配想要的索引
  let index = values.length - 1
  // console.log(index) // 0 ~ 5
  for (let i = 0; i < values.length; i++) {
    // [306, 572, 945, 1288, 1651, 1917]
    // 判断如果数组中 i 个元素 > 改变移动的距离
    if (values[i] > newValue+44){
      // 没在对应区域时默认应该为 -1 ，表示tab标签是不动的
      index = i - 1
      break
    }
  }
  console.log(index)
  tabControlRef.value?.setCurrentIndex(index)
})

</script>

<style scoped lang="less">
.detail{
  height: 100vh;
  overflow-y: auto;
}
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>