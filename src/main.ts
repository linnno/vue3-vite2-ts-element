import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import store from './store/index';
import '@/styles/index.scss'; // global css
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import 'virtual:svg-icons-register';
import svgIcon from './components/SvgIcon/index.vue';

const app = createApp(App);

store.forEach(({ modelName, key }) => {
  app.use(modelName, key);
});

app.component('svg-icon', svgIcon);

app.use(router);
app.use(ElementPlus);

app.mount('#app');
