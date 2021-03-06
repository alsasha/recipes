import mutations from '@/store/mutations';

const { TOGGLE_PRELOADER } = mutations;

const showLoader = {
  state: {
    isShowPreloader: false,
  },
  getters: {
    isShowPreloader: ({ isShowPreloader }) => isShowPreloader,
  },
  mutations: {
    [TOGGLE_PRELOADER](state, bool) {
      state.isShowPreloader = bool;
    },
  },
  actions: {
    togglePreloader({ commit }, bool) {
      commit('TOGGLE_PRELOADER', bool);
    }
  }
};

export default showLoader;