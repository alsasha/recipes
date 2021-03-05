<template>
  <div class="mb-4">
    <h3 class="popular-header mb-3">{{ titleValue }}</h3>
    <BRow>
      <BCol
        v-for='(value, key, index) in popularRecipes'
        :key='index'
        sm='4'
        class="mb-3"
      >
        <PrevRecipeItem
          @mouseover.native="onPrevItemMouseOver(value.strMealThumb)"
          @click.native="onRecipeClick(value)"
          :recipe='value'
          />
      </BCol>
    </BRow>
  </div>
</template>

<script>
import PrevRecipeItem from '@/components/PrevRecipeItem.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'PopularRecipes',
  components: {
    PrevRecipeItem,
  },
  computed: {
    ...mapGetters(['popularRecipes', 'popularTitleValue']),
    titleValue() {
      return this.popularTitleValue ? this.popularTitleValue : 'Popular recipes in this week';
    },
  },
  methods: {
    onRecipeClick(value) {
      this.$bvModal.show('modal');
      this.$emit('onRecipeClick', value);
    },
    onPrevItemMouseOver(poster) {
      this.$emit('onPrevItemMouseOver', poster);
    }
  }
}
</script>

<style scoped>
  .popular-header {
    color: white;
    font-weight: 100;
    text-transform: uppercase;
    position: relative;
    font-size: 32px;
    padding-left: 10px;
  }
  .popular-header:before {
    content: '';
    position: absolute;
    height: 80%;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    background-color: #fff;
    left: 0;
  }
  .prev-items-wrap {
    display: flex;
    flex-wrap: wrap;
  }
</style>