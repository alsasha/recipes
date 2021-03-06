<template>
  <div>
    <BRow >
      <template
        v-for='(value, key, index) in favoriteRecipes'
      >
        <BCol
        class="mb-3"
        xl='4' md='6' sm='12'
        :key='key'
        :index='index'
        v-if='value'
      >
        <RecipeItem
          @mouseover.native="onPrevItemMouseOver(value.strMealThumb)"
          @click.native="onRecipeClick(value.idMeal)"
          :recipe=value
        />
      </BCol>
      </template>
    </BRow>
  </div>
</template>

<script>
import RecipeItem from '@/components/RecipeItem.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'FavoriteRecipes',
  components: {
    RecipeItem,
  },
  computed: {
    ...mapGetters(['favoriteRecipes']),
  },
  methods: {
    onRecipeClick(id) {
      this.$emit('onRecipeClick', id);
    },
    onPrevItemMouseOver(poster) {
      this.$emit('onPrevItemMouseOver', poster);
    }
  },
}
</script>

<style scoped>
</style>