import Vue from 'vue'
import axios from 'axios'
import router from './router'
import App from './App'
import elementui from 'element-ui'
import VueI18n from 'vue-i18n'

import '@/styles/skin.less'

const i18n = new VueI18n({
  locale: window.localStorage.getItem('language') || 'zh_CN',
  messages: {
    'zh_CN': require('@/languages/zh_CN.json'),
    'en': require('@/languages/en.json'),
    'jp': require('@/languages/jp.json')
  }
})

Vue.use(VueI18n)
Vue.use(elementui, {
  size: 'medium',
  zIndex: 3000
})

Vue.prototype.$axios = axios

let vm = new Vue({
  router,
  i18n,
  el: '#app',
  render: h => h(App)
})

Vue.use({ vm })
