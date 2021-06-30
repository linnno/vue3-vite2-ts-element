import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
const app = createApp(App)

import  store from './store/index';

store.forEach(({modelName,key})=>{
  app.use(modelName,key)
})

app.use(router)
app.mount('#app')
