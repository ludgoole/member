import Vue from 'vue';
import iView from 'iview';
import router from './router';
import App from './app.vue';
import Vuex from 'vuex';
import vueScrollActive from 'vue-scrollactive'
// import store from './store/index.js'
import '../theme/dist/iview.css';
// import 'vue2-animate/dist/vue2-animate.min.css'
// import 'iview/dist/styles/iview.css';
import './css/reset.css';
import axios from 'axios';
import store from './store/store.js';

import zone from './zone.js';
import minNav from './minNav.js';
import moment from 'moment';//日期格式化
import url from '~src/api/config.js';

import api from '~api';
Vue.prototype.$api = api;
Vue.prototype.$minNav = minNav;
Vue.prototype.$zone = zone;
Vue.prototype.moment=moment;
Vue.prototype.$url=url;
Vue.use(iView);
Vue.use(Vuex);
Vue.use(vueScrollActive)
axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
    if(to.path !== '/index') {
      window.scrollTo(0, 0);
    }
    if(to.meta.auth){
        const user = sessionStorage.getItem('user')
        if(user === null){
            iView.Message.error('请先登录')
            next({ path: '/index' });
        } else {
            next();
        }
    }else{
        next();
    }
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    if(from.meta !== {}) {
        if(from.meta.isScroll) {
            window.scrollTo(0, 0);
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
