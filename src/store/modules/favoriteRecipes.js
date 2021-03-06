import mutations from '@/store/mutations';
import Vue from 'vue';

const {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_FAVORITES,
} = mutations;

const favoriteRecipes = {
  state: {
    favoriteRecipes: {},
  },
  getters: {
    favoriteRecipes: ({ favoriteRecipes }) => favoriteRecipes,
  },
  mutations: {
    [ADD_TO_FAVORITES](state, value) {
      Vue.set(state.favoriteRecipes, value.idMeal, value);
    },
    [REMOVE_FROM_FAVORITES](state, id) {
      Vue.set(state.favoriteRecipes, id);
    },
    [SET_FAVORITES](state, recipes) {
      state.favoriteRecipes = JSON.parse(recipes);
    }
  },
  actions: {
    addToFavorites({ commit, dispatch }, value) {
      commit(ADD_TO_FAVORITES, value);
      dispatch('setLocalStorage');
    },
    removeFromFavorites({ commit, dispatch }, id) {
      commit(REMOVE_FROM_FAVORITES, id);
      dispatch('setLocalStorage');
    },
    toggleFavorites({ getters, dispatch }) {
      const { recipeList } = getters;
      if (recipeList === 'favorites') {
        dispatch('changeRecipeList', 'popular');
        dispatch('changeTitleValue', 'popular recipes in this week');
      } else {
        dispatch('changeTitleValue', 'favorites');
        dispatch('changeRecipeList', 'favorites');
      }
    },
    setLocalStorage({ getters }) {
      const recipes = JSON.stringify(getters.favoriteRecipes);
      localStorage.setItem('favorite', recipes);
    },
    setFavorites({ commit }) {
      if (localStorage.getItem('favorite')) {
        const recipes = localStorage.getItem('favorite');
        commit(SET_FAVORITES, recipes);
      }
    }
  }
}

export default favoriteRecipes;