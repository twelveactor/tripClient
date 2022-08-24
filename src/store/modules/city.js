import {defineStore} from 'pinia'
import {getCityAll} from "@/service";

const useCityStore = defineStore('city', {
  state: () => ({
    allCities: {},
    currentCity:{
      cityName:'广州'
    }
  }),
  actions:{
    async fetchAllCities(){
      const res =  await getCityAll()
      this.allCities = res.data
    }
  }
})

export default useCityStore