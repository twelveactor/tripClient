import {defineStore} from "pinia";
import {getCategoriesData, getHomeHotSuggest, getHouseListData} from "@/service";

const useHomeStore = defineStore('home',{
  state:()=>({
    // 热门建议
    hotSuggest:[],
    // 热门推荐
    categories:[],
    // 房屋列表
    currentPage:1,
    houseList:[]
  }),
  actions:{
    async fetchHotSuggest(){
      const res = await getHomeHotSuggest()
      // console.log(res.data)
      this.hotSuggest = res.data
      // console.log( this.hotSuggest)
    },
    async fetchCategories(){
      const res = await getCategoriesData()
      this.categories = res.data
    },
    async fetchHouseList(){
      const res = await getHouseListData(this.currentPage)
      this.houseList.push(...res.data)
      this.currentPage++
      // console.log(this.houseList)
    }
  }
})
export default useHomeStore