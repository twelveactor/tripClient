import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    // name: home,
    component: () => import("@/views/home/Home.vue")
  },
  {
    path: "/favor",
    // name: favor,
    component: () => import("@/views/favor/Favor.vue")
  },
  {
    path: "/message",
    // name: favor,
    component: () => import("@/views/message/Message.vue")
  },
  {
    path: "/order",
    // name: favor,
    component: () => import("@/views/order/Order.vue")
  },
  {
    path:'/city',
    component:()=> import('@/views/city/City.vue'),
    meta:{
      hideTabBar:true
    }
  },
  {
    path:'/search',
    component:()=> import('@/views/search/search.vue'),
    meta:{
      hideTabBar:true
    }
  },
  {
    path:'/detail/:id',
    component:()=> import('@/views/detail/detail.vue'),
    meta:{
      hideTabBar:true
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router