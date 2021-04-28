import Vue from 'vue';
import App from './App.vue'
import ElementUI from 'element-ui';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import AmapVue from '@amap/amap-vue'

import VueAMap from 'vue-amap';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont.css'
import './assets/styles/iconfont.js'
//import 'swiper\dist\css\swiper.css'
import 'swiper/swiper-bundle.css'
import './assets/css/index.scss'

import Vant from 'vant';
import 'vant/lib/index.css';

import store from './store'

axios.default.withCredentials = true;

Vue.config.productionTip = false

Vue.use(Vant);

AmapVue.config.key = '2fdef7e86c76d6b26dfafaf389855ac4';
Vue.use(AmapVue);

Vue.use(ElementUI);
Vue.use(router);
Vue.use(Element, { size: 'small', zIndex: 3000 });



new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});

// axios({
// 	url:'/TravelApp/account/DoLogin',
// 	method:'post',
// 	data:{
// 		"uname":"123",
// 		"pwd":"123"
// 	}
// }).then(res => {
// 	console.log(res);
// })
