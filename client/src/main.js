import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/ss-styles/styles.scss'

createApp(App).use(store).use(router).mount('#app')

const token = localStorage.getItem('token')

if (token) {
    axios.defaults.headers.common['Authorization'] = token
}
