import Vue from 'vue';
import App from './App.vue';
import '@/assets/style/reset.scss';
import LazyLoad from '@/components/lazy-load';

Vue.use(LazyLoad, {
  preload: 1.3,
  error: require('@/assets/imgs/error.png'),
  loading: require('@/assets/imgs/loading.png')
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
