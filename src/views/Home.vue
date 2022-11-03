<template>
  <div id="home-page" class="container is-max-widescreen page" style="padding-top:56px!important;">
    <!-- <Carousel :items-to-show="3" :wrap-around="true" :autoplay="4000" :snapAlign="center" class="is-hidden-mobile home-page-carousel">
      <Slide v-for="slide in slides" :key="slide">
      <a v-if="slide.url == 'transfer'" class="carousel__item" href="mailto:support@sharkcasino.io">
        <img class="is-hidden-mobile" :src="slide.img" />
        <img class="is-hidden-tablet" :src="slide.mobImg" />
      </a>
      <a v-if="slide.url == 'discord'" class="carousel__item" href="https://t.me/sharkCasinoChat">
          <img class="is-hidden-mobile" :src="slide.img" />
          <img class="is-hidden-tablet" :src="slide.mobImg" />
        </a>
      <router-link v-if="slide.url != 'transfer' && slide.url != 'discord'" class="carousel__item" :to="slide.url">
        <img class="is-hidden-mobile" :src="slide.img" />
        <img class="is-hidden-tablet" :src="slide.mobImg" />
      </router-link>
      </Slide>

      <template #addons>
        <Navigation />
         <Pagination />
      </template> 
    </Carousel> -->
    
    <!-- <Carousel class="is-hidden-tablet" :items-to-show="1" :wrap-around="true" :autoplay="4000" :snapAlign="start">
      <Slide v-for="slide in slides" :key="slide">
        <a v-if="slide.url == 'transfer'" class="carousel__item" href="mailto:support@sharkcasino.io">
          <img class="is-hidden-mobile" :src="slide.img" />
          <img class="is-hidden-tablet" :src="slide.mobImg" />
        </a>
        <a v-if="slide.url == 'discord'" class="carousel__item" href="https://t.me/sharkCasinoChat">
          <img class="is-hidden-mobile" :src="slide.img" />
          <img class="is-hidden-tablet" :src="slide.mobImg" />
        </a>
      <router-link v-if="slide.url != 'transfer' && slide.url != 'discord'" class="carousel__item" :to="slide.url">
        <img class="is-hidden-mobile" :src="slide.img" />
        <img class="is-hidden-tablet" :src="slide.mobImg" />
      </router-link>
      </Slide>

      <template #addons>
        <Navigation />
         <Pagination />
      </template> 
    </Carousel> -->
    
    <div class="buy-crypto-banner">
      <div class="crypto-icons">
      <p style="width:124px;">Play with</p>
      <ul class="crypto-options">
        <li>
          <img src="/img/btc.png" alt="BTC">
        </li>
        <li>
          <img src="/img/eth.png" alt="ETH">
        </li>
        <li>
          <img src="/img/ltc.png" alt="BTC">
        </li>
        <li>
          <img src="/img/bch.png" alt="ETH">
        </li>
        <li>
          <img src="/img/doge.png" alt="BTC">
        </li>
      </ul>
      </div>
      <div style="display: flex;width: 100%;justify-content: space-between;">
        <p>No Crypto?</p>
      <ul style="justify-content:space-around;">
        <li>
          <img src="/img/mastercard.svg" alt="master-card">
        </li>
        <li>
          <img src="/img/visa.svg" alt="visa">
        </li>
      </ul>
      <button color="primary" type="button" class="button is-primary" @click.prevent="$emit('showBuyCrypto');">Buy Crypto</button>
      </div>
    </div>
    
    <Categories category="lobby" />
    <SearchBar />

    <!-- <div><RenderString :content="htmlContent" /></div> -->

    <GamesList v-if="freeSpinsGames.length > 0" name="freespins" header="<span>Free</span> Spins" :games="freeSpinsGames" />
       <GamesList name="toppicks" header="Our <span>Top</span> Picks" :games="gameLists[0]" />
    <GamesList name="newgames" header="<span>New</span> Games" :games="gameLists[1]" />
    <GamesList name="provablyfair" header="Provably <span>Fair</span>" :games="gameLists[6]" />
      <GamesList name="livegames" header="<span>Live</span> Games" :games="gameLists[4]" />
    <GamesList name="gameshows" header="Game <span>Shows</span>" :games="gameLists[5]" />
    <GamesList name="tablegames" header="<span>Table</span> Games" :games="gameLists[2]" />
      
    <GamesList name="slotgames" header="<span>Slot</span> Games" :games="gameLists[3]" />
    <ProvidersList />
    <BetsTable  v-if="betsTableEnabled" />

    <div v-if="showCryptoPrices" class="currency-rates">
      <div class="currency-rate" v-for="w in wallets" v-bind:key="w.id">
        <template v-if="w.isCrypto === true">
          <img :src="'/img/' + w.symbol.toLowerCase() + '.png'">
          <p>${{w.exchangeRate.toFixed(2)}}</p>
        </template>
      </div>
    </div>
    
    
  </div>
</template>

<style scoped>
.buy-crypto-banner {
  display: flex;flex-direction: row;justify-content: space-between;background-color: var(--second-bg-color);border-radius: 10px;padding: 10px 15px;margin-top: 20px;align-content: center;align-items: center;
}

.buy-crypto-banner .crypto-options img {
  width: 30px;
  margin-right:62px;
}

.buy-crypto-banner p {
  font-size: 20px;
font-family: FiraSans-Bold;
color: #e0f2ff;
display: none;
}

.buy-crypto-banner ul {
  display: flex;justify-content: space-between;align-content: center;align-items: center;
  width: 200px;
}

.buy-crypto-banner ul li {
display: flex;
}

.buy-crypto-banner button {
  font-size: 14px;
}

.currency-rates {
  display: flex;
  text-align: center;
  justify-content: center;
  margin-bottom: 20px;
  width:100%;
  overflow: hidden;
  overflow-x: auto;
}

.crypto-icons {
  display: none;
  justify-content: start;width: 100%;
}

@media screen and (min-width: 600px) {
  .currency-rates {
    flex-wrap: wrap;
  }

  .crypto-icons {
    display: flex;
  }

  .buy-crypto-banner p {
    font-size: 20px;
    display: block;
  }

  .buy-crypto-banner ul {
  
/* margin-left: -89px; */
}




}

.currency-rate {
  padding: 20px;
}

.currency-rate p {
  font-family: FiraSans-Bold;
}

.currency-rate img {
  width: 32px;
  height: 32px;  
}


.carousel__item img {
  width: 100%;
  object-fit: fill;
  max-height: 225px;
  border-radius: 8px;
}

.carousel__item {
  min-height: unset;
  width: 100%;
  /* background-color: var(--main-color); */
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 600px) {
.carousel__item {
  min-height: 200px;
}
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
  opacity: 0.6!important;
}


.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
}
/* .carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
} */

</style>

<script>
import { defineComponent, defineAsyncComponent  } from "vue";
import { mapGetters } from 'vuex'
// import RenderString from "@/components/RenderString.vue"
import Categories from '@/components/Categories.vue'
import SearchBar from '@/components/SearchBar.vue'
import GamesList from '@/components/GamesList.vue'
const ProvidersList = defineAsyncComponent(() => import('@/components/ProvidersList.vue'))
const BetsTable = defineAsyncComponent(() => import('@/components/BetsTable.vue'))
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import ResetPassword from "./ResetPassword.vue";

export default defineComponent({
  name: "Home",
  components: {
    Categories,
    SearchBar,
    GamesList,
    ProvidersList,
    BetsTable,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    ResetPassword,
    // RenderString
  },
  computed: {
    ...mapGetters(['wallets']),
  }, 
  async mounted() {
    const response = await this.$securedAxios({
                method: 'get',
                url: '/bonuses/get-freespins',
                });
      if(response.data) {
        this.freeSpinsCurrency = response.data.currency;
        var a = JSON.parse(response.data.games);
        for(var i = 0; i < a.length; i++) {
          var provider = a[i].split(':')[0];
          var game = a[i].split(':')[1];
          this.freeSpinsGames.push({
            "url": "/game/" + provider.replace('pragmaticexternal', 'pragmatic') + "/" + game,
            "imgUrl": "https://cdn.softswiss.net/i/s3/" + provider + "/" + game + ".png"
          })
        }
      }
  },
  data() {
    return {
    freeSpinsCurrency: '',
    freeSpinsGames: [],
    showCryptoPrices: config.ShowCryptoPrices,
    betsTableEnabled: config.BetsTableEnabled,
    slides: config.HomePageSlides,
    gameLists: [
      [
        {
          "url": "/game/relax/WantedDeadoraWild",
          "imgUrl": "https://cdn.softswiss.net/i/s3/relax/WantedDeadoraWild.png"
        },
        {
          "url": "/game/pragmatic/SugarRush1",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/SugarRush1.png"
        },
        {
          "url": "/game/relax/DorkUnit",
          "imgUrl": "https://cdn.softswiss.net/i/s3/relax/DorkUnit.png"
        },
         {
          "url": "/game/playngo/BookofDead",
          "imgUrl": "https://cdn.softswiss.net/i/s3/playngo/BookofDead.png"
        },
        {
          "url": "/game/nolimit/RoadRage",
          "imgUrl": "https://cdn.softswiss.net/i/s3/nolimit/RoadRage.png"
        },
        {
          "url": "/game/pragmatic/SweetBonanza",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/SweetBonanza.png"
        },
        {
          "url": "/game/nolimit/BookofShadows",
          "imgUrl": "https://cdn.softswiss.net/i/s3/nolimit/BookofShadows.png"
        },
        {
          "url": "/game/pragmatic/FruitParty2",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/FruitParty2.png"
        },
        {
          "url": "/game/pragmatic/TheDogHouseMegaways1",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/TheDogHouseMegaways1.png"
        },
         {
          "url": "/game/nolimit/xWaysHoarderxSplit",
          "imgUrl": "https://cdn.softswiss.net/i/s3/nolimit/xWaysHoarderxSplit.png"
        },
        {
          "url": "/game/pragmatic/GatesOfOlympus1",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/GatesOfOlympus1.png"
        },
        {
          "url": "/game/pragmatic/StarlightPrincess",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/StarlightPrincess.png"
        },
        {
          "url": "/game/yggdrasil/LolliPop",
          "imgUrl": "https://cdn.softswiss.net/i/s3/yggdrasil/LolliPop.png"
        },
        {
          "url": "/game/habanero/SGHappyApe",
          "imgUrl": "https://cdn.softswiss.net/i/s3/habanero/SGHappyApe.png"
        },
        {
          "url": "/game/yggdrasil/RaptorDoublemax",
          "imgUrl": "https://cdn.softswiss.net/i/s3/yggdrasil/RaptorDoublemax.png"
        },
        {
          "url": "/game/blueprint/GorillaGoldMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/epicmedia/GorillaGoldMegaways.png"
        },
        {
          "url": "/game/softswiss/BonanzaBillion",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/BonanzaBillion.png"
        },
        {
          "url": "/game/yggdrasil/ValleyOfTheGods",
          "imgUrl": "https://cdn.softswiss.net/i/s3/yggdrasil/ValleyOfTheGods.png"
        },
        {
          "url": "/game/habanero/SGFortuneDogs",
          "imgUrl": "https://cdn.softswiss.net/i/s3/habanero/SGFortuneDogs.png"
        },
        {
          "url": "/game/blueprint/FishinFrenzyMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/blueprint/FishinFrenzyMegaways.png"
        },
        {
          "url": "/game/softswiss/LuckyFarmBonanza",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/LuckyFarmBonanza.png"
        },
        {
          "url": "/game/habanero/SGLanternLuck",
          "imgUrl": "https://cdn.softswiss.net/i/s3/habanero/SGLanternLuck.png"
        },
        {
          "url": "/game/blueprint/LuckoftheIrishMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/epicmedia/LuckoftheIrishMegaways.png"
        },
        {
          "url": "/game/softswiss/BookOfCats",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/BookOfCats.png"
        },
        {
          "url": "/game/habanero/SGHotHotFruit",
          "imgUrl": "https://cdn.softswiss.net/i/s3/habanero/SGHotHotFruit.png"
        },
        {
          "url": "/game/blueprint/BankinBacon",
          "imgUrl": "https://cdn.softswiss.net/i/s3/epicmedia/BankinBacon.png"
        },
        {
          "url": "/game/softswiss/AztecMagicMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/AztecMagicMegaways.png"
        },
      ],
      [
        {
          "url": "/game/pragmaticexternal/FloatingDragonMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/FloatingDragonMegaways.png"
        },
        {
          "url": "/game/relax/MoneyTrain3",
          "imgUrl": "https://cdn.softswiss.net/i/s3/relax/MoneyTrain3.png"
        },
        {
          "url": "/game/hacksaw/AlphaEagle96",
          "imgUrl": "https://cdn.softswiss.net/i/s3/relax/AlphaEagle96.png"
        },
        {
          "url": "/game/bigtimegaming/MaxMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/relax/MaxMegaways.png"
        },
        {
          "url": "/game/nolimit/TheBorder",
          "imgUrl": "https://cdn.softswiss.net/i/s3/nolimit/TheBorder.png"
        },
        {
          "url": "/game/pragmaticexternal/BookofGoldenSands",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/BookofGoldenSands.png"
        },
        {
          "url": "/game/pragmaticexternal/HappyHooves",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/HappyHooves.png"
        },
        {
          "url": "/game/pushgaming/blazeofra1-01",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pushgaming/blazeofra1-01.png"
        },
        {
          "url": "/game/pragmaticexternal/OctobeerFortunes",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/OctobeerFortunes.png"
        },
        {
          "url": "/game/softswiss/FortyFruityMillion",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/FortyFruityMillion.png"
        },
        {
          "url": "/game/yggdrasil/OfSabersandMonsters",
          "imgUrl": "https://cdn.softswiss.net/i/s3/yggdrasil/OfSabersandMonsters.png"
        },
        {
          "url": "/game/pushgaming/Deadly5",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pushgaming/Deadly5.png"
        },
        {
          "url": "/game/yggdrasil/RagingPop",
          "imgUrl": "https://cdn.softswiss.net/i/s3/yggdrasil/RagingPop.png"
        },
        {
          "url": "/game/nolimit/TheRave",
          "imgUrl": "https://cdn.softswiss.net/i/s3/nolimit/TheRave.png"
        },
        {
          "url": "/game/quickspin/StickyBanditsTrailofBlood",
          "imgUrl": "https://cdn.softswiss.net/i/s3/quickspin/StickyBanditsTrailofBlood.png"
        },
      ],
      [
        {
          "url": "/game/platipus/EuropeanRoulette",
          "imgUrl": "https://cdn.softswiss.net/i/s3/platipus/EuropeanRoulette.png"
        },
        {
          "url": "/game/platipus/baccarat",
          "imgUrl": "https://cdn.softswiss.net/i/s3/platipus/baccarat.png"
        },
        {
          "url": "/game/platipus/blackjack",
          "imgUrl": "https://cdn.softswiss.net/i/s3/platipus/blackjack.png"
        },
        {
          "url": "/game/evoplay/TexasHoldemPoker3D",
          "imgUrl": "https://cdn.softswiss.net/i/s3/evoplay/TexasHoldemPoker3D.png"
        },
        {
          "url": "/game/evoplay/PokerTeenPatti",
          "imgUrl": "https://cdn.softswiss.net/i/s3/evoplay/PokerTeenPatti.png"
        },
        {
          "url": "/game/platipus/blackjackvip",
          "imgUrl": "https://cdn.softswiss.net/i/s3/platipus/blackjackvip.png"
        },
        {
          "url": "/game/softswiss/MultihandBlackjack",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/MultihandBlackjack.png"
        },
        {
          "url": "/game/softswiss/EuropeanRoulette",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/EuropeanRoulette.png"
        }
      ],
      [ 
        {
          "url": "/game/playngo/AnkhofAnubis",
          "imgUrl": "https://cdn.softswiss.net/i/s3/playngo/AnkhofAnubis.png"
        },
        {
          "url": "/game/relax/ChaosCrew",
          "imgUrl": "https://cdn.softswiss.net/i/s3/relax/ChaosCrew.png"
        },
        {
          "url": "/game/relax/DoubleRainbow",
          "imgUrl": "https://cdn.softswiss.net/i/s3/relax/DoubleRainbow.png"
        },
        {
          "url": "/game/nolimit/Deadwood",
          "imgUrl": "https://cdn.softswiss.net/i/s3/nolimit/Deadwood.png"
        },
        {
          "url": "/game/pushgaming/jamminjars2",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pushgaming/jamminjars2.png"
        },
        {
          "url": "/game/nolimit/Mental",
          "imgUrl": "https://cdn.softswiss.net/i/s3/nolimit/Mental.png"
        },
        {
          "url": "/game/pushgaming/razorshark",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pushgaming/razorshark.png"
        },
        { 
          "url": "/game/blueprint/ReturnofKongMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/epicmedia/ReturnofKongMegaways.png"
        },
        {
          "url": "/game/softswiss/LuckyLadyMoon",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/LuckyLadyMoon.png"
        },
        {
          "url": "/game/yggdrasil/Multifly",
          "imgUrl": "https://cdn.softswiss.net/i/s3/yggdrasil/Multifly.png"
        },
        {
          "url": "/game/habanero/SGWizardsWantWar",
          "imgUrl": "https://cdn.softswiss.net/i/s3/habanero/SGWizardsWantWar.png"
        },
        {
          "url": "/game/blueprint/LightningStrikeMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/blueprint/LightningStrikeMegaways.png"
        },
        {
          "url": "/game/softswiss/AlohaKingElvis",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/AlohaKingElvis.png"
        },
        {
          "url": "/game/habanero/SGCandyTower",
          "imgUrl": "https://cdn.softswiss.net/i/s3/habanero/SGCandyTower.png"
        },
        {
          "url": "/game/blueprint/BuffaloRisingMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/epicmedia/BuffaloRisingMegaways.png"
        },
        {
          "url": "/game/softswiss/FireLightning",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/FireLightning.png"
        },
        {
          "url": "/game/habanero/SGOrbsOfAtlantis",
          "imgUrl": "https://cdn.softswiss.net/i/s3/habanero/SGOrbsOfAtlantis.png"
        },
        {
          "url": "/game/blueprint/SweetSuccessMegaways",
          "imgUrl": "https://cdn.softswiss.net/i/s3/epicmedia/SweetSuccessMegaways.png"
        },
        {
          "url": "/game/softswiss/Road2Riches",
          "imgUrl": "https://cdn.softswiss.net/i/s3/softswiss/Road2Riches.png"
        },
        
      ],
      [
        {
          "url": "/game/evolution/blackjack",
          "imgUrl": "/img/evoblackjack.png"
        },
        {
          "url": "/game/evolution/roulette",
          "imgUrl": "/img/roulette.jpg"
        },
        {
          "url": "/game/evolution/lightning_roulette",
          "imgUrl": "/img/lightning_roulette.jpg"
        },
        {
          "url": "/game/evolution/LightningBlackjack",
          "imgUrl": "/img/lightning_blackjack.jpg"
        },
        {
          "url": "/game/evolution/lightning_baccarat",
          "imgUrl": "/img/lightning_baccarat.jpg"
        },
        {
          "url": "/game/evolution/lightningdice",
          "imgUrl": "/img/lightning_dice.jpg"
        },
        {
          "url": "/game/evolution/texas_holdem_bonus",
          "imgUrl": "/img/texas_holdem_bonus_poker.jpg"
        },
        {
          "url": "/game/evolution/craps",
          "imgUrl": "/img/craps.jpg"
        },
      ],
      [
        {
          "url": "/game/evolution/crazytime",
          "imgUrl": "/img/crazy_time.jpg"
        },
        {
          "url": "/game/pragmatic/BoomCity",
          "imgUrl": "https://cdn.softswiss.net/i/s3/pragmaticexternal/BoomCity.png"
        },
        {
          "url": "/game/evolution/dealnodeal",
          "imgUrl": "/img/deal_or_no_deal.jpg"
        },
        {
          "url": "/game/evolution/monopoly",
          "imgUrl": "/img/monopoly.jpg"
        },
        {
          "url": "/game/evolution/GonzosTreasureHunt",
          "imgUrl": "/img/gonzo.jpg"
        },
        {
          "url": "/game/evolution/megaball",
          "imgUrl": "/img/mega_ball.jpg"
        },
        {
          "url": "/game/evolution/cashorcrash",
          "imgUrl": "/img/cash_or_crash.jpg"
        },
        {
          "url": "/game/evolution/dream_catcher",
          "imgUrl": "/img/dream_catcher.jpg"
        },
      ],
      [
        {
          "url": "/game/spribe/aviator",
          "imgUrl": "https://cdn.softswiss.net/i/s3/spribe/aviator.png"
        },
        {
          "url": "/game/spribe/dice",
          "imgUrl": "https://cdn.softswiss.net/i/s3/spribe/dice.png"
        },
        {
          "url": "/game/spribe/plinko",
          "imgUrl": "https://cdn.softswiss.net/i/s3/spribe/plinko.png"
        },
        {
          "url": "/game/spribe/mines",
          "imgUrl": "https://cdn.softswiss.net/i/s3/spribe/mines.png"
        },
        {
          "url": "/game/spribe/hilo",
          "imgUrl": "https://cdn.softswiss.net/i/s3/spribe/hilo.png"
        },
        {
          "url": "/game/spribe/miniroulette",
          "imgUrl": "https://cdn.softswiss.net/i/s3/spribe/miniroulette.png"
        },
        {
          "url": "/game/spribe/keno",
          "imgUrl": "https://cdn.softswiss.net/i/s3/spribe/keno.png"
        },
        {
          "url": "/game/spribe/goal",
          "imgUrl": "https://cdn.softswiss.net/i/s3/spribe/goal.png"
        },
        
      ],
  ],
  }
  }
})
</script>
