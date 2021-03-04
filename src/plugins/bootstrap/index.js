import Vue from 'vue'
import { BootstrapVue, BIconSearch, BIconJournalBookmark, BIconHeartFill } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.component('BIconSearch', BIconSearch);
Vue.component('BIconJournalBookmark', BIconJournalBookmark);
Vue.component('BIconHeartFill', BIconHeartFill);