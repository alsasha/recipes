<template>
  <div id="app">
    <Header></Header>
    <BContainer>
      <Categories/>
      <template v-if=isShowPopular>
        <PopularRecipes
          @onPrevItemMouseOver='changePoster'
        />
      </template>
      <SearchRecipes v-else @onPrevItemMouseOver='changePoster'/>
    </BContainer>
    <PosterBg :poster=poster></PosterBg>
  </div>
</template>

<script>
import PosterBg from '@/components/PosterBg.vue';
import Header from '@/components/Header.vue';
import Categories from '@/components/Categories.vue';
import PopularRecipes from '@/components/PopularRecipes.vue';
import SearchRecipes from '@/components/SearchRecipes.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    poster: '',
  }),
  mounted() {
    this.getCategories();
    this.getPopularRecipes();
  },
  computed: {
    ...mapGetters(['isShowPopular'])
  },
  components: {
    PosterBg,
    Header,
    Categories,
    PopularRecipes,
    SearchRecipes,
  },
  methods: {
    ...mapActions(['getCategories', 'getPopularRecipes']),
    changePoster(poster) {
      this.poster = poster;
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
