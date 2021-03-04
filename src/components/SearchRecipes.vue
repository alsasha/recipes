<template>
  <div>
    <h3 class="search-header mb-3">{{ searchTitleValue }}</h3>
    <BRow >
      <BCol
        class="mb-3"
        v-for='(value, key, index) in searchRecipes'
        :key=index
        sm='6'>
          <SearchRecipeItem
            @mouseover.native="onPrevItemMouseOver(value.strMealThumb)"
            @click.native="onRecipeClick"
            :recipe=value
          />
      </BCol>
    </BRow>
  </div>
</template>

<script>
import SearchRecipeItem from '@/components/SearchRecipeItem.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'SearchRecipes',
  components: {
    SearchRecipeItem,
  },
  computed: {
    ...mapGetters(['searchRecipes', 'searchTitleValue']),
  },
  methods: {
    onPrevItemMouseOver(poster) {
      this.$emit('onPrevItemMouseOver', poster);
    }
  },
}
</script>

<style scoped>
  .search-header {
    color: white;
    font-weight: 100;
    text-transform: uppercase;
    position: relative;
    font-size: 32px;
    padding-left: 10px;
  }
  .search-header:before {
    content: '';
    position: absolute;
    height: 80%;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    background-color: #fff;
    left: 0;
  }
</style>