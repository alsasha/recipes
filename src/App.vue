<template>
  <div id="app">
    <RecipeModal :recipe=modalRecipe />
    <Header></Header>
    <BContainer>
      <Categories/>
      <Title/>
      <PopularRecipes
        v-if='recipeList === "popular"'
        @onRecipeClick='showModal'
        @onPrevItemMouseOver='changePoster'
      />
      <CategoryRecipes
        v-if='recipeList === "category"'
        @onRecipeClick='showModal'
        @onPrevItemMouseOver='changePoster'
      />
      <SearchRecipes
        v-if='recipeList === "search"'
        @onRecipeClick='showModal'
        @onPrevItemMouseOver='changePoster'
      />
      <FavoriteRecipes
        v-if='recipeList === "favorites"'
        @onRecipeClick='showModal'
        @onPrevItemMouseOver='changePoster'
      />
    </BContainer>
    <PosterBg :poster=poster></PosterBg>
    <Preloader
      v-if='isShowPreloader'
    />
  </div>
</template>

<script>
import PosterBg from '@/components/PosterBg.vue';
import Header from '@/components/Header.vue';
import Categories from '@/components/Categories.vue';
import PopularRecipes from '@/components/PopularRecipes.vue';
import SearchRecipes from '@/components/SearchRecipes.vue';
import CategoryRecipes from '@/components/CategoryRecipes.vue';
import FavoriteRecipes from '@/components/FavoriteRecipes.vue';
import RecipeModal from '@/components/RecipeModal.vue';
import Title from '@/components/Title.vue';
import Preloader from '@/components/Preloader.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    poster: '',
  }),
  mounted() {
    this.getCategories();
    this.getPopularRecipes();
    this.setFavorites();
  },
  computed: {
    ...mapGetters(['isShowPopular', 'recipeList', 'modalRecipe' ,'isShowPreloader']),
  },
  components: {
    PosterBg,
    Header,
    Categories,
    PopularRecipes,
    SearchRecipes,
    CategoryRecipes,
    FavoriteRecipes,
    RecipeModal,
    Title,
    Preloader,
  },
  methods: {
    ...mapActions(['getCategories', 'getPopularRecipes', 'getRecipeById', 'setFavorites']),
    changePoster(poster) {
      this.poster = poster;
    },
    showModal(id) {
      this.getRecipeById(id);
      this.$bvModal.show('modal');
    }
  }
}
</script>

<style>
#app {
  /* font-family: Helvetica, Avenir, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  min-height: 100vh;
}
</style>
