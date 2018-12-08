// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import '@/assets/icon.css';
import App from './App'
import socket from './socket';
import router from './router'
// import BScroll from 'better-scroll'
// import theme from 'muse-ui/lib/theme';
// import { carbon, createTheme } from 'muse-ui-carbon-theme/src';

// theme.add('carbon', carbon).addCreateTheme(createTheme).use('carbon');
Vue.use(MuseUI);
Vue.use(router);
Vue.config.productionTip = false

/* eslint-disable no-new */
// 作为组件通信的媒介
const Bus = new Vue();

socket.on('connect',() => {
  console.log('connect success!');
});

new Vue({
  el: '#app',
  data(){
    return{
      Bus
    }
  },
  router,
  components: { App },
  template: '<App/>'
})
