import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.serverUrl = 'http://127.0.0.1:8000';

Vue.use(VueAxios, axios);
Vue.use(Vuetify, {
    icons: {
        iconfont: 'fa',
    },
});
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
