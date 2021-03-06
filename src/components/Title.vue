<template>
  <h3 class="popular-header mb-3">{{ titleValue }}</h3>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Title',
  computed: {
    ...mapGetters(['titleValue']),
  },
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
</style>