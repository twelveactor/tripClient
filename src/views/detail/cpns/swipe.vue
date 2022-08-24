<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item,index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <!--  通过 indicator 插槽可以自定义指示器的样式  -->
      <template #indicator="{ active, total}">
        <div class="custom-indicator">
          <template v-for="(value,key,index) in swipeGroup" :key="key">
            <span class="item" :class="{active:swipeData[active]?.enumPictureCategory == key}">

              <span class="text"> {{getName(value[0].title)}} </span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) }}/{{value.length}}
              </span>

            </span>
          </template>
        </div>
      </template>

    </van-swipe>
  </div>
</template>

<script setup>

const props = defineProps({
  swipeData:{
    type:Array,
    default:()=>[]
  }
})

// console.log(props.swipeData)
// 对数据进行分组
const swipeGroup = {}

// 第一种思路：把图片类型作为对象的 key
// for (const key of  props.swipeData) {
//   swipeGroup[key.enumPictureCategory] = []
//   // 以上是先根据类别 作为key，value赋值为一个空对象
//   // console.log(swipeGroup) // {2: Array(0), 4: Array(0), 9: Array(0)}
// }
// for (const key of  props.swipeData) {
//   // 遍历出每一个类别
//   const values = swipeGroup[key.enumPictureCategory]
//   // 把每一个类别放入value数据中，因为引用是指向同一个
//   values.push(key)
// }

// 第二种思路
for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  // console.log(valueArray) // undefined 第一次为 undefine ,第二次开始才有值
  // 首先先判空
  if (!valueArray){
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
    // console.log(swipeGroup) //{2: Array(9), 4: Array(3), 9: Array(0)}
  }
  valueArray.push(item)
  // console.log(swipeGroup) // {2: Array(9), 4: Array(3), 9: Array(13)}
}

// 定义转换数据的方法
const getName = (name) => {
  // return name.replace("：","").replace("【","[").replace('】',']')
  return name.replace("：","")
}
// 获取当前索引在各组中的位置
const getCategoryIndex = (item) => {
  // 根据 key 的类别拿到整个value数组数据
  const valueArray = swipeGroup[item?.enumPictureCategory]
  return valueArray?.findIndex(data => data === item) + 1
}

</script>

<style scoped lang="less">
.swipe{

  .swipe-list{

    .item{
      img{
        width: 100%;
      }
    }
  }

  .custom-indicator {
    color: white;
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.7);

    .item{

      &.active{
        color: red;
      }
    }
  }


}
</style>