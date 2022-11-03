<template>
  <div class="games-list-container">
    <div class="games-list-header">
      <h2 v-html="header"></h2>
      <div>
        <img class="arrow left-arrow" src="/img/arrow-button.png" @click.prevent="scrollLeft(name)"/>
        <img class="arrow" src="/img/arrow-button.png" @click.prevent="scrollRight(name)"/>
      </div>
    </div>
    <div :id="name" class="games-list">
      <GameThumbnail v-for="game in games" :key="game.url" :game="game" />
    </div>
  </div>
</template>

<script>
import GameThumbnail from '@/components/GameThumbnail.vue'

export default {
  props: ['header', 'name', 'games'],
  data() {
    return {
    }
  },
  components: {
    GameThumbnail,
  },
  methods: {
    // TODO better way to do this?
    scrollLeft(id) {
      var el = document.getElementById(id.replace(' ', ''));
      el.scrollLeft -= el.clientWidth;
    },
    scrollRight(id) {
      var el = document.getElementById(id.replace(' ', ''));
      el.scrollLeft += el.clientWidth;
    },
  }
}
</script>