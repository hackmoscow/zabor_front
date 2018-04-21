import "babel-polyfill";
import Vue from 'vue'
import Zabbor from './Zabbor.vue'
import AsyncComputed from 'vue-async-computed'
import VueMultiselect from 'vue-multiselect'
//import axios from 'axios'
//import VueAnalytics from 'vue-analytics'
//import VModal from 'vue-js-modal'
//import VueYandexMetrika from 'vue-yandex-metrika'                               
import VeeValidate from 'vee-validate';
import CheckboxRadio from 'vue-checkbox-radio';
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.config.devtools = false;
Vue.config.silent = true;

Vue.use(VueResource);

new Vue({
  el: '#app',
  render: (h) => {
    return h(Zabbor);
  },
  components: { Zabbor }
})