import {createApp} from 'vue'
import App from './App.vue'

import pinia from "./store"
import router from "./router"

// npm install normalize.css 重置样式
import "normalize.css"
import "./assets/css/index.css"




import 'default-passive-events'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
