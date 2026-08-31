import { createApp } from 'vue'
// import './style.css'
import { registerPlugins } from '@/plugins'

import App from './App.vue'

// import { createPinia } from "pinia"
// import router from "./router"
// import vuetify from "./plugins/vuetify"
// import "@mdi/font/css/materialdesignicons.css"
// import "./styles/main.scss"

const app = createApp(App)
registerPlugins(app)
// app.use(createPinia())
// app.use(router)
// app.use(vuetify)
app.mount("#app")
