<template>
  <div class="mb-4">
    <BRow>
      <BCol
        v-for='(value, key, index) in popularRecipes'
        :key='index'
        lg='4'
        sm='6'
        class="mb-3"
      >
        <PrevRecipeItem
          @mouseover.native="onPrevItemMouseOver(value.strMealThumb)"
          @click.native="onRecipeClick(value.idMeal)"
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
    ...mapGetters(['popularRecipes']),
  },
  methods: {
    onRecipeClick(id) {
      this.$emit('onRecipeClick', id);
    },
    onPrevItemMouseOver(poster) {
      this.$emit('onPrevItemMouseOver', poster);
    }
  }
}
</script>

<style scoped>
  .prev-items-wrap {
    display: flex;
    flex-wrap: wrap;
  }
</style>