import Vue from 'vue'
import Vuex from 'vuex'
import recipes from '@/store/modules/recipes';
import favoriteRecipes from '@/store/modules/favoriteRecipes';
import showLoader from '@/store/modules/loader';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    recipes,
    favoriteRecipes,
    showLoader,
  }
})
