<template>
<div id="home-page" class="page content">
  <img class="is-hidden-mobile" src="/img/pragmaticdropsbanner.jpg" />
  <img class="is-hidden-tablet" src="/img/pragmaticdropsbannermob.jpg" />

  <h2>$1,000,000 Pragmatic Drops & Wins</h2>
  <p>Each month players receive $1 million in random drops while playing Pragmatic Play games!</p>
  <p>To take part all you have to do is play any Pragmatic Play slot game or Live casino games including blackjack, roulette or game shows.</p>
  <p>Prizes are credited instantly to your account while playing.</p>
  <br>
  <router-link :to="'/games/lobby/Pragmatic'" class="button is-primary">Play Now</router-link>

</div>
</template>

<style scoped>
h2, h3, h4 {
  color: #e0f2ff!important;
  font-family: FiraSans;
}

.page {
  margin: 0 auto;
max-width: 1200px;
padding: 20px;
min-height: 650px;
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "VipTransfer",
  data() {
    return {
      siteName: config.SiteName,
      siteUrl: config.SiteUrl,
      siteDomain: config.DomainName,
      businessName: config.BusinessName,
      themePath: config.ThemePath
    }
  }
});
</script>