<template>
  <div class="preloader d-flex justify-content-center align-items-center">
    <b-spinner
      type="grow"
      variant='success'
    ></b-spinner>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
}
</script>

<style scoped>
  .preloader {
    top: 0;
    position: fixed;
    width: 100%;
    left: 0;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
    z-index: 1051;
  }
</style>