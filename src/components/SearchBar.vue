<template>
  <div class="search-container">
    <div class="search-bar-container">
      <div class="field">
        <p class="control has-icons-left">
          <input v-on:keyup="search" @input="e => searchTerm = e.target.value" class="input search-box" v-model="searchTerm" type="text" placeholder="Search">
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
    </div>

    <div v-if="searchTerm.length >= 3">
      <div class="games-list-header">
        <h2>Search <span>Results</span></h2>
      </div>

      <div class="games-list" v-if="games.length > 0">
        <div v-for="game in games" :game="game" :key="game.id" class="game-thumbnail">
          <router-link :to="'/game/' + game.provider + '/' + game.id.split(':')[1]">
            <img v-lazy="{src: formatImgUrl(game), loading: '/img/loadingbg.png'}" />
            <div class="game-thumbnail-hover">
              <i class="fa fa-play"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="games.length === 0">
        No games found
      </div>
    </div>
  </div>
</template>

<script>
import {formatImgUrl} from '@/utils';

export default {
  data() {
    return {
      searchTerm: '',
      games: [],
    }
  },
  methods: {
    formatImgUrl(game) {
      return formatImgUrl(game)
    },
    async search() {
      if(this.searchTerm.length >= 3) {
        var response = await this.$plainAxios.get('/games/search-games?searchTerm=' + this.searchTerm);
        this.games = response.data;
      }
    }
  }
}
</script>