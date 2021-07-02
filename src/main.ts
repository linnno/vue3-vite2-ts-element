import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/styles/index.scss';

const app = createApp(App);

store.forEach(({ modelName, key }) => {
  app.use(modelName, key);
});

app.use(ElementPlus);
app.use(router);
app.mount('#app');
