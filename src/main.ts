import { createApp } from 'vue';
import './style.css';
import './assets/index.css';
import App from './App.vue';
import router from './router/index.js';

const app = createApp(App);

app.use(router);
app.mount('#app')
