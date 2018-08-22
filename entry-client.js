import { createApp } from './app'

const { app } = createApp(window.__PRE_STATE__ || {})

app.$mount('#app')
