<template>
  <div
    class='recipe-item'
    :data-fav='isFavorite'
  >
    <BRow style='height: 100%'>
      <BCol cols='5' style='padding-right: 0px'>
        <div class="recipe-item-img-wrap">
          <div class="recipe-item-img" :style=recipePoster>
          </div>
        </div>
      </BCol>
      <BCol cols='7'>
        <div class="recipe-item-info d-flex flex-column">
          <div class="recipe-item-header d-flex">
            <h4 class="recipe-item-title">{{ recipeName }}</h4>
            <BIconHeart
              class="ml-auto mt-1"
              :style='iconStyle'
              font-scale='2'
              @click.prevent='onFavClick(recipe.idMeal, recipe, $event)'
            ></BIconHeart>
          </div>
          <div class="recipe-item-badge d-flex">
            <BBadge
              v-for='(value, key) in tags'
              :key=key
              class="mr-1 mb-2"
            >{{value}}</BBadge>
          </div>
          <div class="recipe-item-descr"><b>Category:</b> {{ recipe.strCategory || '' }}</div>
          <div class="recipe-item-descr mb-2"><b>Area:</b> {{ recipe.strArea }}</div>
          <BButton size="lg" class="recipe-item-btn ml-auto mt-auto">Read more</BButton>
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RecipeItem',
  props: {
    recipe: {
      required: true,
    }
  },
  methods: {
    ...mapActions(['addToFavorites', 'removeFromFavorites']),
    onFavClick(id, recipe, e) {
      e.stopPropagation();
      const item = e.target.closest('.recipe-item');
      if (item.getAttribute('data-fav')) {
        e.target.style.color = 'black';
        this.removeFromFavorites(id);
      } else {
        e.target.style.color = 'lightsalmon';
        this.addToFavorites(recipe);
      }
    },
    checkFavorite(id) {
      return this.favoriteRecipes[id] ? true : false;
    },
  },
  computed: {
    ...mapGetters(['favoriteRecipes']),
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
    iconStyle() {
      return this.isFavorite ? 'color: lightsalmon' : 'color: black';
    },
    isFavorite() {
      return this.checkFavorite(this.recipe.idMeal);
    }
  },
}
</script>

<style scoped>
  .recipe-item-img-wrap {
    overflow: hidden;
    position: relative;
    padding-bottom: 120%;
    width: 100%;
    transition: all 0.2s ease;
    margin-right: -10px;
  }
  .recipe-item >>> .col {
    padding-right: 0;
  }
  .recipe-item {
    border-radius: 10px;
    background-color: rgb(214, 214, 214);
    padding: 10px;
    cursor: pointer;
    height: 100%;
    transition: all 0.2s ease;
  }
  .recipe-item-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-position: center center;
    background-size: cover;
  }
  .recipe-item-img img {
    max-width: 100%;
  }
  .recipe-item-title {
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
    font-size: 28px;
  }
  .recipe-item-info {
    flex: 1;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
    height: 100%;
  }
  .recipe-item:hover {
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  .recipe-item-descr {
    color: black;
  }
  .recipe-item-btn {
    background-color: rgba(21, 97, 74, 0.85)
  }
  .recipe-item-badge {
    flex-wrap: wrap;
  }
  @media (max-width: 990px) {
    .recipe-item-img {
      border-radius: 10px 0 10px 0;
    }
    .recipe-item {
      padding: 0 10px 0 0;
    }
    .recipe-item-info {
      padding: 10px 0 10px 0;
    }
  }
  @media (max-width: 768px) {
    .recipe-item-img-wrap {
      padding-bottom: 0%;
      height: 100%;
    }
    .recipe-item-img {
      border-radius: 10px 0 0 10px;
    }
  }
</style>