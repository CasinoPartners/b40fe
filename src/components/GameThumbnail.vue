<template>
 <div class="game-thumbnail">
  <router-link v-if="game != undefined" :to="game.url">
    <img v-lazy="{src: game.imgUrl, loading: '/img/loadingbg.png'}" />
    <div class="game-thumbnail-hover">
      <i class="fa fa-play"></i>
    </div>
  </router-link>
  </div>  
</template>

<script>
export default {
  props: ['game'],
}
</script>