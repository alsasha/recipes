<template>
  <div class='mb-3'>
    <h3 class="categories-title mb-3">
      Categories
    </h3>
    <div class="categories-items-wrap">
      <div
        v-for='(value, key, index) in categories'
        :key='index'
        class="categories-item mr-2 mb-2"
        @click='onCategoryClickEmit(value.strCategory)'
      >{{ value.strCategory }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Categories',
  computed: {
    ...mapGetters(['categories']),
  },
  data: () => ({
    slide: 0,
    sliding: null
  }),
  methods: {
    ...mapActions(['getCategoryResult', 'changeTitleValue']),
    onCategoryClickEmit(value) {
      this.changeTitleValue(`${value} category`);
      this.getCategoryResult(value);
    }
  }
}
</script>

<style scoped>
  .categories-title {
    color: white;
    font-weight: 100;
    text-transform: uppercase;
    position: relative;
    font-size: 32px;
    padding-left: 10px;
  }
  .categories-title:before {
    content: '';
    position: absolute;
    height: 80%;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    background-color: #fff;
    left: 0;
  }
  .categories-items-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .categories-item {
    padding: 10px 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .categories-item:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    .categories-items-wrap {
      overflow-x: scroll;
      flex-wrap: nowrap;
    }
  }
</style>