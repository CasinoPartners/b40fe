<template>
<div>
  <section class="categories-card-view">
  <div class="categories-container">
    <div class="category-button" :class="`${ category === 'lobby' ? 'is-active' : ''}`" @click.prevent="routeTo({ name: 'Home'})">
    <a><img :src="themePath + 'lobby_icon.png'"><span>Lobby</span></a>
    </div>
    <div class="category-button" :class="`${ category === 'slots' ? 'is-active' : ''}`" @click.prevent="routeTo({ name: 'Games', params: { category: 'slots' }})">
    <a><img :src="themePath + 'slots_icon.png'"><span>Slots</span></a>
    </div>
    <div class="category-button" :class="`${ category === 'live' ? 'is-active' : ''}`" @click.prevent="routeTo({ name: 'Games', params: { category: 'live' }})">
    <a><img :src="themePath + 'live_icon.png'"><span>Live</span></a>
    </div>
    <div class="category-button" :class="`${ category === 'table' ? 'is-active' : ''}`" @click.prevent="routeTo({ name: 'Games', params: { category: 'table' }})">
    <a><img :src="themePath + 'table_icon.png'"><span>Table</span></a>
    </div>
    <div v-if="!sportsEnabled" class="category-button" :class="`${ category === 'shows' ? 'is-active' : ''}`" @click.prevent="routeTo({ name: 'Games', params: { category: 'shows' }})">
      <a><img :src="themePath + 'game_shows_icon.png'"><span>Game Shows</span></a>
    </div>
    <div v-if="sportsEnabled" class="category-button" :class="`${ category === 'sports' ? 'is-active' : ''}`" @click.prevent="routeTo({ name: 'Sports'})">
      <a><img :src="themePath + 'sports_icon.png'"><span>Sports</span></a>
    </div>
  </div>
  </section>
  <div class="category-selector" style="background-color:#2b2a3c;" @click.prevent="categoryMenuVisible = !categoryMenuVisible" @blur="categoryMenuVisible = false">
      <span>
      <div>
        <img :src="themePath + categoryNameWithIcon.img">{{categoryNameWithIcon.name}}
      </div>
      <i class="down-arrow"></i>
      </span>
      <div v-if="categoryMenuVisible" class="dropdown-menu">
        <div @click.prevent="routeTo({ name: 'Home'})">
          <img :src="themePath + 'lobby_icon.png'">Lobby
        </div>
        <div @click.prevent="routeTo({ name: 'Games', params: { category: 'slots' }})">
         <img :src="themePath + 'slots_icon.png'">Slots
        </div>
        <div @click.prevent="routeTo({ name: 'Games', params: { category: 'live' }})">
          <img :src="themePath + 'live_icon.png'">Live
        </div>
        <div @click.prevent="routeTo({ name: 'Games', params: { category: 'table' }})">
          <img :src="themePath + 'table_icon.png'">Table
        </div>
        <div v-if="!sportsEnabled" @click.prevent="routeTo({ name: 'Games', params: { category: 'shows' }})">
          <img :src="themePath + 'game_shows_icon.png'">Game Shows
        </div>
        <div v-if="sportsEnabled" @click.prevent="routeTo({ name: 'Sports'})">
          <img :src="themePath + 'sports_icon.png'">Sports
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: ['category'],
  data() {
    return {
      categoryMenuVisible: false,
      themePath: config.ThemePath,
      sportsEnabled: config.SportsEnabled
    }
  },
  computed: {
    categoryNameWithIcon: function () {
      switch(this.category) {
        case 'lobby':
          return {name :"Lobby", img: "lobby_icon.png"};
        case 'slots':
          return {name :"Slots", img: "slots_icon.png"};
        case 'live':
          return {name :"Live", img: "live_icon.png"};
        case 'table':
          return {name :"Table", img: "table_icon.png"};
        case 'shows':
          return {name :"Game Shows", img: "game_shows_icon.png"};
        case 'sports':
          return {name :"Sports", img: "sports_icon.png"};
      }
      return {name :"Lobby", img: "lobby_icon.png"};
    }
  },
  methods: {
    routeTo(route) {
      this.$router.push(route)
    }
  }
}
</script>