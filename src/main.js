// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Icon, InputNumber } from 'element-ui'
import App from './App'

Vue.component(Icon.name, Icon)
Vue.component(InputNumber.name, InputNumber)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
