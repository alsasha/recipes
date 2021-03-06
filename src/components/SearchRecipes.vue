<template>
  <div>
    <BRow >
      <BCol
        class="mb-3"
        v-for='(value, key, index) in searchRecipes'
        :key=index
        xl='4' md='6' sm='12'>
          <RecipeItem
            @mouseover.native="onPrevItemMouseOver(value.strMealThumb)"
            @click.native="onRecipeClick(value.idMeal)"
            :recipe=value
          />
      </BCol>
    </BRow>
  </div>
</template>

<script>
import RecipeItem from '@/components/RecipeItem.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'SearchRecipes',
  components: {
    RecipeItem,
  },
  computed: {
    ...mapGetters(['searchRecipes']),
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