<template>
<div id="home-page" class="page content" style="max-width: 800px;">
  <img class="is-hidden-mobile" :src="themePath + 'spinsbanner.png'" style="border-radius: 10px;" />
  <img class="is-hidden-tablet" :src="themePath + 'spinsbanner.png'" style="border-radius: 10px;"/>


  <h2>Wednesday Free Spins</h2>
  <p>Wednesday means only one thing at Shark Casino, it's FREE SPINS DAY!</p>
  <p>Simply login and deposit and get rewarded up to 100 FREE SPINS today!</p>
<p>To get the free spins please enter the bonus code before the deposit.</p>
<p>Deposit a minimum of $10 and get 30 Free Spins - use promo code SHARK30</p>
<p>Deposit a minimum of $25 and get 50 Free Spins - use promo code SHARK50</p>
<p>Deposit a minimum of $50 and get 100 Free Spins - use promo code SHARK100</p>


  <p class="welcome-offer-description-text">
    Full <router-link to="/bonus-terms">Bonus Terms and Conditions</router-link> apply.
  </p>

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
  name: "FreeSpins",
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