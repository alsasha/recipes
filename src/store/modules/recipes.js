import axios from '@/plugins/axios';
import mutations from '@/store/mutations';

const { SET_POPULAR_RECIPES, SET_CURRENT_RECIPES, SET_CATEGORIES, TOGGLE_SEARCH_VALUE, CHANGE_SEARCH_TITLE_VALUE, CHANGE_POPULAR_TITLE_VALUE } = mutations;

function serializeRecipes(arr) {
  return arr.reduce((acc, item) => {
    acc[item.idMeal] = item;
    return acc;
  }, {});
}

const recipes = {
  state: {
    popularRecipes: {},
    categoryRecipes: {},
    searchRecipes: {},
    categories: [],
    isShowPopular: true,
    searchTitleValue: '',
    popularTitleValue: '',
  },
  getters: {
    popularRecipes: ({ popularRecipes }) => popularRecipes,
    categories: ({ categories }) => categories,
    isShowPopular: ({ isShowPopular }) => isShowPopular,
    searchRecipes: ({ searchRecipes }) => searchRecipes,
    searchTitleValue: ({ searchTitleValue }) => searchTitleValue,
    popularTitleValue: ({ popularTitleValue }) => popularTitleValue,
  },
  mutations: {
    [SET_POPULAR_RECIPES](state, value) {
      state.popularRecipes = value;
    },
    [SET_CURRENT_RECIPES](state, value) {
      state.searchRecipes = value;
    },
    [SET_CATEGORIES](state, value) {
      state.categories = value;
    },
    [TOGGLE_SEARCH_VALUE](state, bool) {
      state.isShowPopular = bool;
    },
    [CHANGE_SEARCH_TITLE_VALUE](state, value) {
      state.searchTitleValue = value;
    },
    [CHANGE_POPULAR_TITLE_VALUE](state, value) {
      state.popularTitleValue = value;
    },
  },
  actions: {
    async getPopularRecipes({ commit }) {
      try {
        let arr = [];
        for (let i = 0; i < 8; i++) {
          const response = await axios.get('/random.php');
          arr.push(response);
        }
        arr = arr.flat().map(item => item.meals[0]);
        const resipeObjects = serializeRecipes(arr);
        commit(SET_POPULAR_RECIPES, resipeObjects);
      } catch (err) {
        console.log(err);
      }
    },
    async getSearchResult({ commit, dispatch }, value) {
      const response = await axios.get('/search.php', { params: {
          s: value,
        }
      });
      if (!response.meals) {
        const title = 'Search result is not found';
        dispatch('changeSearchTitleValue', title);
        return commit(SET_CURRENT_RECIPES, {});
      }
      const resultRecipes = serializeRecipes(response.meals);
      commit(SET_CURRENT_RECIPES, resultRecipes);
    },
    async getCategoryResult({ commit }, value) {
      const response = await axios.get('/filter.php', { params: {
          c: value,
        }
      });
      const resultRecipes = serializeRecipes(response.meals);
      commit(SET_POPULAR_RECIPES, resultRecipes);
    },
    async getCategories({ commit }) {
      const response = await axios.get('/list.php?c=list');
      commit(SET_CATEGORIES, response.meals);
    },
    toggleShowPopularValue({ commit }, bool) {
      commit(TOGGLE_SEARCH_VALUE, bool);
    },
    changeSearchTitleValue({ commit }, value) {
      commit(CHANGE_SEARCH_TITLE_VALUE, value);
    },
    changePopularTitleValue({ commit }, value) {
      commit(CHANGE_POPULAR_TITLE_VALUE, value);
    }
  }
};

export default recipes;