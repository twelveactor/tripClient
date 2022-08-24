import {defineStore} from "pinia";

const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1)


const useMainStore = defineStore('main',{
  state:()=>({
    startDates:startDate,
    endDates : endDate,
    isShowLoading:false
  }),
  actions:{}
})

export default useMainStore