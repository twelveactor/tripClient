import {onMounted, onUnmounted, ref} from "vue";

// 第三方插件库
import {throttle} from "underscore";


export default function useScroll(elRef){
  // 改变 滚动 对象，不是每个 scroll 都是window,有些可能在一个div包裹中的需要滚动，在 div 包裹中的滚动就不是windows,这样就可以获取div 实例ref传递进来
  let el = window

  const isScroll = ref(false) // false 为没有到达底部
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const clientHeight = ref(0)

  const scrollListenerHandle = throttle(() =>{
    // 在窗口中的顶部向上滑动的高度距离
    if (el === window){
      scrollTop.value = document.documentElement.scrollTop
      // 整体可滑动高度,也就是当前页面最大高度
      scrollHeight.value = document.documentElement.scrollHeight
      // 当前视窗高度
      clientHeight.value = document.documentElement.clientHeight
    }else{
      scrollTop.value = el.scrollTop
      // 整体可滑动高度,也就是当前页面最大高度
      scrollHeight.value = el.scrollHeight
      // 当前视窗高度
      clientHeight.value = el.clientHeight
    }

    // 计算到达底部时加载更多
    if (scrollHeight.value <= scrollTop.value + clientHeight.value){
      // 加载更多数据,执行回调函数
      isScroll.value = true
    }else{
      isScroll.value = false
    }
    // console.log(scrollHeight.value , '-' , scrollTop.value , '-' , clientHeight.value)
  },250)

  // 使用节流
  // const throttleScroll = throttle(scrollListenerHandle,250)

  onMounted(()=>{
    // 当没有传递进来组件实例 elRef 的时候，el默认为 windows ,如果有传递就进行赋值，后面监听的也是对应组件内部的监听，就不是windows
    if (elRef){
      // console.log(elRef.value)
      el = elRef.value
    }
    // el 默认 = windows
    // window.addEventListener('scroll',throttleScroll)
    el.addEventListener('scroll',scrollListenerHandle,{ passive: true })
  })

// 在离开当前页面时移除滚动监听p
  onUnmounted(()=>{
    // window.removeEventListener('scroll',throttleScroll)
    el.removeEventListener('scroll',scrollListenerHandle)
  })

  return { isScroll, scrollTop,scrollHeight,clientHeight}
}



// /**
//  * 第一种方式，传入回调执行滚动监听，但是如果有多个回调不好管理，采用变量的方式
//  * @param {Function} reachBottomCb
//  */
// export default function useScroll(reachBottomCb){
//   const scrollListenerHandle = () =>{
//     // 在窗口中的顶部向上滑动的高度距离
//     const scrollTop = document.documentElement.scrollTop
//     // 整体可滑动高度,也就是当前页面最大高度
//     const scrollHeigth = document.documentElement.scrollHeight
//     // 当前视窗高度
//     const clientHeihth = document.documentElement.clientHeight
//
//     // 计算到达底部时加载更多
//     if (scrollHeigth <= scrollTop + clientHeihth){
//       // 加载更多数据,执行回调函数
//       if (reachBottomCb) reachBottomCb()
//     }
//     // console.log(scrollHeigth ,'-', scrollTop,'-',clientHeihth)
//   }
//
//   onMounted(()=>{
//     window.addEventListener('scroll',scrollListenerHandle)
//   })
//
// // 在离开当前页面时移除滚动监听p
//   onUnmounted(()=>{
//     window.removeEventListener('scroll',scrollListenerHandle)
//   })
// }


