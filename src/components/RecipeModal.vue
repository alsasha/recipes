<template>
  <BModal
    id='modal'
    hide-footer
    hide-header
    size='xl'
    content-class="recipe-modal"
    dialog-class='recipe-modal-dialog'
  >
    <header class="modal-header mb-3">
      <div
        class="recipe-modal-back d-flex align-items-center"
        @click='onBackClick'
      >
        <BIconArrowLeft font-scale='2'></BIconArrowLeft>
        <div class="recipe-modal-back-text ml-2">Back</div>
      </div>
      <BIconHeartFill
        class="recipe-modal-fav"
        font-scale='2'
        :style='iconStyle'
        @click='onFavClick(recipe.idMeal, recipe, $event)'
      ></BIconHeartFill>
    </header>
    <BRow>
      <BCol lg='5' >
        <div class="recipe-modal-img-wrap mb-3">
          <div class="recipe-modal-img" :style='posterStyle'></div>
        </div>
        <BTable :items='items' class="recipe-modal-table"></BTable>
      </BCol>
      <BCol lg='7' >
        <div class="recipe-modal-info">
          <h2 class="recipe-modal-header">
            {{recipe.strMeal}}
          </h2>
          <div class="recipe-modal-tags d-flex flex-wrap mb-2">
            <div class="recipe-modal-tag mr-2" v-for='(value, key, index) in tags' :key='index'>{{value}}</div>
          </div>
          <div class="recipe-modal-category mb-3">
            <b>Category:</b> {{recipe.strCategory}} <br>
            <b>Area:</b> {{recipe.strArea}}
          </div>
        </div>
        <p style='font-size: 23px;'>{{recipe.strInstructions}}</p>
      </BCol>
    </BRow>
  </BModal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RecipeModal',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['favoriteRecipes']),
    tags() {
      return this.recipe.strTags ? this.recipe.strTags.split(',').slice(0, 2) : [];
    },
    posterStyle() {
      return this.recipe.strMealThumb ? {
        'background-image': `url(${this.recipe.strMealThumb})`
      } : '';
    },
    items() {
      const tableData = [];
      for (let i = 1; i < 20; i++) {
        if (this.recipe[`strIngredient${i}`]) {
          const tableRow = {ingredient: this.recipe[`strIngredient${i}`],
          measure: this.recipe[`strMeasure${i}`]};
          tableData.push(tableRow);
        } else {
          break;
        }
      }
      return tableData;
    },
    isFav() {
      return this.favoriteRecipes[this.recipe.idMeal];
    },
    iconStyle() {
      return this.isFav ? 'color: lightsalmon' : 'color: white';
    }
  },
  methods: {
    ...mapActions(['addToFavorites', 'removeFromFavorites']),
    onBackClick() {
      this.$bvModal.hide('modal');
    },
    onFavClick(id, recipe, e) {
      if (this.isFav) {
        e.target.style.color = 'white';
        this.removeFromFavorites(id);
      } else {
        e.target.style.color = 'lightsalmon';
        this.addToFavorites(recipe);
      }
    }
  },
};
</script>

<style scoped>
  .recipe-modal-back, .recipe-modal-fav {
    cursor: pointer;
  }
  .recipe-modal-back-text {
    font-size: 20px;
    text-transform: uppercase;
  }
  .recipe-modal-tag {
    padding: 10px 20px;
    background-color: rgba(32, 71, 29, 0.4);
    border-radius: 10px;
  }
  .recipe-modal-category {
    font-size: 25px;
  }
  .recipe-modal-header {
    color: white;
    font-weight: 300;
    font-size: 40px;
  }
  .recipe-modal-img-wrap {
    position: relative;
    padding-bottom: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
  .recipe-modal-img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-position: center center;
    background-size: cover;
  }
  .recipe-modal-table {
    color: white;
  }
</style>

<style>
  .recipe-modal {
    padding:0;
    background-color: rgba(255, 255, 255, 0.3) !important;
    color: white;
    border: 0;
  }
  .recipe-modal-dialog {
    background-color: rgba(32, 71, 29, 0.7);
  }

</style>