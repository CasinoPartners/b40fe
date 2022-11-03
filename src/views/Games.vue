<template>
  <div id="home-page" class="container is-max-widescreen page" style="padding-top:56px!important;">
    <Categories :category="category" />

    <SearchBar />
    <div class="providers-filters-btn">
    <div class="filter-btns">
      <router-link :to="{name: 'Games', params: {category: 'slots'}}">
        All
      </router-link>
      <router-link :to="{name: 'Games', params: {category: 'new'}}">
        New
      </router-link>
      <router-link :to="{name: 'Games', params: {category: 'feature-buy-in'}}">
        Buy Feature
      </router-link>
    </div>
    <div class="provider-selector" ref="providers">
      <span @click.prevent="providerMenuVisible = !providerMenuVisible" @blur="providerMenuVisible = false">
      <div>
        {{provider}}
      </div>
      <i class="down-arrow"></i>
      </span>
      <div v-if="providerMenuVisible" class="dropdown-menu">
          <p class="control has-icons-left">
            <input @input="filterProviders" class="input search-box" v-model="searchTerm" type="text" placeholder="Search">
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        <div v-for="p in filteredProviders" :key="p.key" @click.prevent="provider = p.name; page = 0; loadGames();providerMenuVisible=false;">
          <span v-if="p.name!='Providers'">{{p.name}}</span>
          <span v-if="p.name=='Providers'">All Providers</span>
        </div>
      </div>
    </div>
    </div>

    <div class="games-container">
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

      <div style="text-align:center; margin-top:40px;margin-bottom:80px;">
        <p v-if="games.length===0">No games found</p>
        <button v-if="showLoadButton && games.length > 0" @click.prevent="pageGames" class="button is-free">Load More</button>
      </div>
    </div>

    <BetsTable  v-if="betsTableEnabled" />
    
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import Categories from '@/components/Categories.vue'
import SearchBar from '@/components/SearchBar.vue'
const BetsTable = defineAsyncComponent(() => import('@/components/BetsTable.vue'))
import {formatImgUrl} from '@/utils';

export default defineComponent({
  name: "Home",
  components: {
    Categories,
    SearchBar,
    BetsTable
  },
  data() {
    return {
      category: 'lobby',
      games: [],
      searchTerm: '',
      filteredProviders: [],
      page: 0,
      provider: 'Providers',
      showLoadButton: true,
      providerMenuVisible: false,
      betsTableEnabled: config.BetsTableEnabled,
      providers : [
        { key: 'all', name: 'Providers'},
    ],
    }
  },
  created () {
    document.addEventListener('click', this.documentClick)
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick)
  },
  watch: {
    async $route(to, from) {
      this.category = this.$route.params.category;
      this.provider = this.$route.params.provider;
      if(this.provider === undefined || this.provider === '') {
        this.provider = 'Providers'
      }
      this.page = 0;
      this.loadGames();
    },
  },
  async mounted() {
    this.category = this.$route.params.category;
    this.provider = this.$route.params.provider;
    if(this.provider === undefined || this.provider === '') {
      this.provider = 'Providers'
    }

    await this.loadProviders();
    await this.loadGames();
  },
  methods: {
    async loadProviders() {
      var response = await this.$plainAxios.get('/games/get-providers');
      if(response.data) {
        this.providers = [...this.providers, ...response.data];
        this.filteredProviders = [...this.providers];
      }      
    },
    documentClick(e) {
      const el2 = this.$refs.providers;
      if (el2 != undefined && ( el2 !== e.target) && !el2.contains(e.target)) {
          this.providerMenuVisible =false;
      }
    },
    filterProviders() {
      this.filteredProviders = this.providers.filter(val => val.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      if(this.searchTerm === '') {
        this.filteredProviders = [...this.providers];
      }
    },
    formatImgUrl(game) {
      return formatImgUrl(game)
    },
    getProviderKey() {
      for (let i = 0; i < this.providers.length; i++) {
        const p = this.providers[i];
        if(p.name == this.provider) {
          return p.key;
        }
      }
    },
    async pageGames() {
      this.page++;
      var response = await this.$plainAxios.get('/games/get-games?category=' + this.category + '&page=' + this.page + '&provider=' + this.getProviderKey());
      if(response.data) {
        this.games = [...this.games, ...response.data];
        if(response.data.length < 10) {
          this.showLoadButton = false;
        }
      } else {
        this.showLoadButton = false
      }
      
    },
    async loadGames() {
      var response = await this.$plainAxios.get('/games/get-games?category=' + this.category + '&page=' + this.page + '&provider=' + this.getProviderKey());
      if(response.data) {
        this.games = response.data;
        this.showLoadButton = true;
      }
    }
  }
})
</script>