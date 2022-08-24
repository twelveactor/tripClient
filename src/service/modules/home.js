import HYRequest from '../request'

export function getHomeHotSuggest() {
  return HYRequest.get({
    url:'/home/hotSuggests'
  })
}

export function getCategoriesData() {
  return HYRequest.get({
    url:'/home/categories'
  })
}

export function getHouseListData(page) {
  return HYRequest.get({
    url:`/home/houselist`,
    params:{
      page:page
    }
  })
}