import App from './App'
import io from './common/weapp.socket.io.js';
import Vue from 'vue'

Vue.prototype.socket = io('http://192.168.0.105:4000',{
	timeout: 5000
})

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()