import axios from 'axios'

import { BASE_URL, TIMEOUT } from './config'
import useMainStore from "@/store/modules/mian";

const mainStore = useMainStore()

class HYRequest {

  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(config=>{
      mainStore.isShowLoading = true
      return config
    },error => {
      mainStore.isShowLoading = false
      return error
    })

    this.instance.interceptors.response.use(res=>{
      mainStore.isShowLoading = false
      return res
    },error => {
      mainStore.isShowLoading = false
      return error
    })
  }

  request(config) {
    // mainStore.isShowLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // mainStore.isShowLoading = true
      }).catch(err => {
        // mainStore.isShowLoading = false
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)


