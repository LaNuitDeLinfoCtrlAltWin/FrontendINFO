import './assets/main.scss'
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.compilerOptions.isCustomElement = (tag) => tag === 'Chatbot';

app.use(createPinia())
app.use(router)

app.use(Quasar, {
  config: {}
});

app.mount('#app');
