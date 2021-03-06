import axios from '@/plugins/axios';
import mutations from '@/store/mutations';

const {
  SET_POPULAR_RECIPES,
  SET_SEARCH_RECIPES,
  SET_CATEGORY_RECIPES,
  SET_CATEGORIES,
  CHANGE_TITLE_VALUE,
  CHANGE_RECIPE_LIST,
  SET_MODAL_RECIPE,
} = mutations;

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
    titleValue: 'Popular recipes in this week',
    recipeList: 'popular',
    modalRecipe: {},
  },
  getters: {
    popularRecipes: ({ popularRecipes }) => popularRecipes,
    searchRecipes: ({ searchRecipes }) => searchRecipes,
    categoryRecipes: ({ categoryRecipes }) => categoryRecipes,
    categories: ({ categories }) => categories,
    titleValue: ({ titleValue }) => titleValue,
    recipeList: ({ recipeList }) => recipeList,
    modalRecipe: ({ modalRecipe }) => modalRecipe,
  },
  mutations: {
    [SET_POPULAR_RECIPES](state, value) {
      state.popularRecipes = value;
    },
    [SET_SEARCH_RECIPES](state, value) {
      state.searchRecipes = value;
    },
    [SET_CATEGORY_RECIPES](state, value) {
      state.categoryRecipes = value;
    },
    [SET_CATEGORIES](state, value) {
      state.categories = value;
    },
    [CHANGE_TITLE_VALUE](state, value) {
      state.titleValue = value;
    },
    [CHANGE_RECIPE_LIST](state, value) {
      state.recipeList = value;
    },
    [SET_MODAL_RECIPE](state, value) {
      state.modalRecipe = value;
    },
  },
  actions: {
    async getPopularRecipes({ commit, dispatch }) {
      try {
        dispatch('togglePreloader', true);
        let arr = [];
        for (let i = 0; i < 8; i++) {
          const response = await axios.get('/random.php');
          arr.push(response);
        }
        arr = arr.flat().map(item => item.meals[0]);
        const resipeObjects = serializeRecipes(arr);
        commit(SET_POPULAR_RECIPES, resipeObjects);
        dispatch('changeRecipeList', 'popular');
      } catch ({ message }) {
        this.$bvToast.toast('Error', {
          message,
          variant: 'error',
          solid: true,
        });
      } finally {
        dispatch('togglePreloader', false);
      }
    },
    async getSearchResult({ commit, dispatch }, value) {
      try {
        dispatch('togglePreloader', true);
        const response = await axios.get('/search.php', { params: {
            s: value,
          }
        });
        dispatch('changeRecipeList', 'search');
        if (!response.meals) {
          const title = 'Search result is not found';
          dispatch('changeTitleValue', title);
          return commit(SET_SEARCH_RECIPES, {});
        }
        const resultRecipes = serializeRecipes(response.meals);
        commit(SET_SEARCH_RECIPES, resultRecipes);
      } catch ({ message }) {
        this.$bvToast.toast('Error', {
          message,
          variant: 'error',
          solid: true,
        });
      } finally {
        dispatch('togglePreloader', false);
      }
    },
    async getCategoryResult({ commit, dispatch }, value) {
      try {
        dispatch('togglePreloader', true);
        const response = await axios.get('/filter.php', { params: {
          c: value,
        }
        });
        const resultRecipes = serializeRecipes(response.meals);
        commit(SET_CATEGORY_RECIPES, resultRecipes);
        dispatch('changeRecipeList', 'category');
      } catch ({ message }) {
        this.$bvToast.toast('Error', {
          message,
          variant: 'error',
          solid: true,
        });
      } finally {
        dispatch('togglePreloader', false);
      }
    },
    async getRecipeById({ commit, dispatch }, id) {
      try {
        dispatch('togglePreloader', true);
        const response = await axios.get(`/lookup.php?i=${id}`);
        commit(SET_MODAL_RECIPE, response.meals[0]);
      } catch ({ message }) {
        this.$bvToast.toast('Error', {
          message,
          variant: 'error',
          solid: true,
        });
      } finally {
        dispatch('togglePreloader', false);
      }
    },
    async getCategories({ commit, dispatch }) {
      try {
        dispatch('togglePreloader', true);
        const response = await axios.get('/list.php?c=list');
        commit(SET_CATEGORIES, response.meals);
      } catch ({ message }) {
        this.$bvToast.toast('Error', {
          message,
          variant: 'error',
          solid: true,
        });
      } finally {
        dispatch('togglePreloader', false);
      }
    },
    changeTitleValue({ commit }, value) {
      commit(CHANGE_TITLE_VALUE, value);
    },
    changeRecipeList({ commit }, value) {
      commit(CHANGE_RECIPE_LIST, value);
    },
  }
};

export default recipes;