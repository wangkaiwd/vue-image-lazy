import Vue from 'vue';
import App from './App.vue';
import '@/assets/style/reset.scss';
import GoLazyLoad from '@/components/lazy-load';

Vue.use(GoLazyLoad, {
  preload: 1.3,
  error: require('@/assets/imgs/error.png'),
  loading: require('@/assets/imgs/loading.png')
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
