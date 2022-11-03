<template>
<div class="game-page">
    <div class="game-container is-hidden-mobile" :class="`${ theaterMode === true ? 'is-theater' : ''}`">
      <div v-if="!theaterMode" class="game-title-container">
        <p v-if="game != null" class="game-title">{{game.name}} - {{game.providerName}}</p>
        <!-- <a href="#" class="fairness-icon"><img :src="themePath + 'fairness_icon.png'"/></a> -->
      </div>

      <div class="game-iframe-container" :class="`${ theaterMode === true ? 'is-theater' : ''}`">
        <img v-if="showCurrencySelect == true" :src="themePath + 'gamepagebg2.jpg'" class="game-bg-image">
        
        <div   class="game-iframe" id="game-iframe">
        </div>
      </div>
      
      <div class="icons-container">
        <div style="width:100%;display:flex;">
        <a href="#" style="cursor:pointer;" @click.prevent="fullscreen()"><img src="/img/full_screen_icon.png"/></a>
        <a href="#" style="cursor:pointer;" @click.prevent="toggleTheaterMode()"><img src="/img/theater_mode_icon.png"/></a>
        <!-- <a href="#"><img src="/img/stats_icon.png"/></a> -->
        <!-- <a href="#"><img src="/img/favourite_icon.png"/></a> -->
        </div>

        <div class="switch-container">
          <button :class="`button ${ isFun === false ? 'highlight' : ''}`">Real Play</button>
          <button :class="`button ${ isFun === true ? 'highlight' : ''}`">Free Play</button>
          <!-- <button :class="`button ${ isFun === false ? 'highlight' : ''}`" @click.prevent="isFun = false">Real Play</button>
          <button :class="`button ${ isFun === true ? 'highlight' : ''}`" @click.prevent="isFun = true">Free Play</button> -->
        </div>
      </div>

      <div v-if="showCurrencySelect" class="game-currency-select-container">
        <div style="align-items: center;z-index:1;">
          <div class="play-button-container">        
            <button v-if="!loggedIn"  class="button is-primary" @click.prevent="$emit('showAuth')">Real play</button>
            <button v-if="loggedIn" class="button is-primary" @click.prevent="openGame(false, false)">Real Play</button>
            <button class="button is-free" @click.prevent="openGame(true, false)">Free Play</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCurrencySelect && game !== null" class="mobile-game-currency-select-container is-hidden-tablet is-hidden-desktop">
        <img class="thumbnail" v-lazy="{src: formatImgUrl(game), loading: '/img/loadingbg.png'}" />
        <div style="align-items: center;z-index:1;">
          <div class="play-button-container">        
            <button v-if="!loggedIn"  class="button is-primary" @click.prevent="$emit('showAuth')">Real play</button>
            <button v-if="loggedIn" class="button is-primary" @click.prevent="openGame(false, true)">Real Play</button>
            <button class="button is-free" @click.prevent="openGame(true, true)">Free Play</button>
          </div>
        </div>
      </div>

    <div v-if="betsTableEnabled" class="game-bets-table-container">
      <BetsTable />
    </div>
  </div>
</template>

<style>
  #game-iframe iframe {
    width: 100%;
height: 100%;
display: block;
  }
</style>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { mapGetters } from 'vuex'
const BetsTable = defineAsyncComponent(() => import('@/components/BetsTable.vue'))
import {formatImgUrl} from '@/utils';

export default defineComponent({
  name: "Game",
  components: {
    BetsTable,
  },
  computed: {
    ...mapGetters(['loggedIn', 'selectedCurrency']),
  },
  data() {
    return {
      game: null,
      launchUrl: '',
      showCurrencySelect: true,
      isFun: false,
      theaterMode: false,
      isPlaying: false,
      themePath: config.ThemePath,
      betsTableEnabled: config.BetsTableEnabled
    }
  },
  watch: {
    async $route(to, from) {
      this.$store.commit('showBalance');
      this.removeIFrames();
    },
    selectedCurrency() {
      this.launchUrl = '';
      this.showCurrencySelect = true;
      this.isPlaying = false;
      this.removeIFrames();
    },
    loggedIn() {
      if(this.loggedIn == false) {
        this.launchUrl = '';
        this.showCurrencySelect = true;
        this.isPlaying = false;
        this.removeIFrames();
      }
    }
  },
  async mounted() {
    this.removeIFrames();
    const gameName = this.$route.params.game;
    const provider = this.$route.params.provider;

    var response = await this.$plainAxios.get('/games/get-game?id=' + provider + ':' + gameName);
    if(response.data) {
      this.game = response.data;
    } else {
      // window.location = '/';
    }
  },
  methods: {
    removeIFrames() {
      var iframes = document.querySelectorAll('iframe');
      for (var i = 0; i < iframes.length; i++) {
          iframes[i].parentNode.removeChild(iframes[i]);
      }
    },
    formatImgUrl(game) {
      return formatImgUrl(game)
    },
    toggleTheaterMode() {
      if(this.isPlaying) {
        this.theaterMode = !this.theaterMode;
        if(this.theaterMode == true) {
          this.$store.commit('hideBalance');
          this.$emit('hideChat');
          this.$emit('hideMenu');
        }
      }
    },
    fullscreen() {
      const iframe = document.getElementById("game-iframe");
      if (
        document.fullscreenEnabled 
        || document.webkitFullscreenEnabled 
        || document.mozFullScreenEnabled 
        || document.msFullscreenEnabled
      ) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
      } 
    },
    async openGame(isDemo, isMobile) {
      const game = this.$route.params.game;
      const provider = this.$route.params.provider;

      var url = '';
      if(isDemo) {
        url = `/games/game-demo-url?currency=${this.selectedCurrency}&displayCurrency=USD&game=${game}&provider=${provider}&isMobile=${isMobile}`;
      } else {
        url = `/games/game-url?currency=${this.selectedCurrency}&displayCurrency=USD&game=${game}&provider=${provider}&isMobile=${isMobile}`;
      }

      const response = await this.$securedAxios({
                method: 'get',
                url: url,
                });

      try {
        var parsed = JSON.parse(response.data);
        if(parsed.launch_options.game_url != undefined || parsed.launch_options.desktop_url || parsed.launch_options.mobile_url || parsed.launch_options.static_server) {
          if(isDemo) {
            this.isFun = true;
          }
          
          this.showCurrencySelect = false;
          this.isPlaying = true;
          this.$store.commit('hideBalance');

          if((provider === 'playngo' || provider == 'hacksaw') && isMobile === true) {
            // TODO bug, playngo not returning mobile url?
            window.location = parsed.launch_options.mobile_url;
          } else {
            var gameLaunchOptions = {target_element: 'game-iframe'};
            gameLaunchOptions['launch_options'] = parsed.launch_options;
            var success = (gameDispatcher) => {
            }
            var error = (error) => {
              console.log(error); 
            }
            window.sg.launch(gameLaunchOptions, success, error);
          }
        } else {
          this.$emit('showGameBlock', parsed.message);
        }
      } catch (e) {
        if(response.data.errorMessage == 'Country blocked')
        {
          this.$emit('showGameBlock', 'Country blocked');
        } else {
          this.$emit('showGameBlock', response.data.errorMessage);
        }
      }
    },
  }
});
</script>