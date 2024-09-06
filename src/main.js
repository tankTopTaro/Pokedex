import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

app.component('apexchart', VueApexCharts)

app.mount('#app')
