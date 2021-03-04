<template>
  <div class="bg" :style='posterImage'>
  </div>
</template>

<script>
export default {
  name: 'PosterBg',
  props: {
    poster: {
      type: String,
      required: true,
    },
  },
  computed: {
    posterImage() {
      return this.poster ? {
        'background-image': `url(${this.poster})`
      } : '';
    },
  },
}
</script>

<style scoped>
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-position: center;
    background-size: cover;
    z-index: -1;
    background-image: linear-gradient(to top left, rgb(34, 85, 29), rgb(21, 97, 74));
  }
  .bg:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to top left, rgba(34, 85, 29, 0.85), rgba(21, 97, 74, 0.85))
  }
</style>