<template>
  <div class='prev-item' >
    <BRow>
      <BCol sm='5'>
        <div class="prev-item-img-wrap">
          <div class="prev-item-img" :style=recipePoster>
          </div>
        </div>
      </BCol>
      <BCol sm='7'>
        <div class="prev-item-info d-flex flex-column">
          <h4 class="prev-item-title">{{ recipeName }}</h4>
          <div class="d-flex mb-2">
            <BBadge
              v-for='(value, key) in tags'
              :key=key
              class="mr-1"
            >{{value}}</BBadge>
          </div>
          <div class="prev-item-descr"><b>Category:</b> {{ recipe.strCategory || '' }}</div>
          <div class="prev-item-descr"><b>Area:</b> {{ recipe.strArea }}</div>
          <BButton size="lg" class="mt-3 prev-item-btn ml-auto mt-auto">Read more</BButton>
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<script>
export default {
  name: 'SearchRecipeItem',
  props: {
    recipe: {
      type: Object,
      default: () => ({}),
    }
  },
  computed: {
    tags() {
      return this.recipe.strTags ? this.recipe.strTags.split(',').slice(0, 5) : [];
    },
    recipeName() {
      const name = this.recipe.strMeal;
      if (name) {
        return name.length >= 30 ? name.slice(0, 30) + '...' : name;
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
  .prev-item-img-wrap {
    overflow: hidden;
    position: relative;
    padding-bottom: 100%;
    width: 100%;
    transition: all 0.2s ease;
    margin-right: -10px;
  }
  .prev-item >>> .col {
    padding-right: 0;
  }
  .prev-item {
    border-radius: 10px;
    background-color: rgb(214, 214, 214);
    padding: 10px;
    cursor: pointer;
    height: 100%;
    transition: all 0.2s ease;
  }
  .prev-item-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-position: center center;
    background-size: cover;
  }
  .prev-item-img img {
    max-width: 100%;
  }
  .prev-item-title {
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
    font-size: 28px;
  }
  .prev-item-info {
    flex: 1;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
    height: 100%;
  }
  .prev-item:hover {
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  .prev-item-descr {
    color: black;
  }
  .prev-item-btn {
    background-color: rgba(21, 97, 74, 0.85)
  }
</style>