<template>
  <div class='prev-item' >
    <div class="prev-item-img mr-3" :style=recipePoster>
    </div>
    <div class="prev-item-info d-flex flex-column">
      <h4 class="prev-item-title">{{ recipeName }}</h4>
      <div class="d-flex mb-2">
        <BBadge
          v-for='(value, key) in tags'
          :key=key
          class="mr-1"
        >{{value}}</BBadge>
      </div>
      <BButton class="mt-3 prev-item-btn ml-auto mt-auto">Read more</BButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrevRecipeItem',
  props: {
    recipe: {
      type: Object,
      default: () => ({}),
    }
  },
  computed: {
    tags() {
      return this.recipe.strTags ? this.recipe.strTags.split(',').slice(0, 2) : [];
    },
    recipeName() {
      const name = this.recipe.strMeal;
      if (name) {
        return name.length >= 25 ? name.slice(0, 25) + '...' : name;
      }
      return 'Tasty meal';
    },
    recipePoster() {
      return  {
        'background-image': `url(${this.recipe.strMealThumb})`
      };
    },
  },

}
</script>

<style scoped>
  .prev-item {
    border-radius: 10px;
    background-color: rgb(214, 214, 214);
    padding: 10px;
    cursor: pointer;
    display: flex;
    transition: all 0.2s ease;
    min-height: 150px;
    height: 100%;
  }
  .prev-item-img {
    flex: 1;
    border-radius: 10px;
    background-position: center center;
    background-size: cover;
  }
  .prev-item-title {
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
    font-size: 20px;
  }
  .prev-item-info {
    flex: 1;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
  }
  .prev-item:hover {
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  .prev-item-btn {
    background-color: rgba(21, 97, 74, 0.85);
    color: white;
  }
  @media (max-width: 768px) {
    .prev-item-title {
      font-size: 18px;
    }
    .prev-item-btn {
      padding: 8px;
    }
  }
</style>