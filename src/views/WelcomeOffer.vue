<template>
<div id="home-page" class="page content" style="text-align:center;">
  <img class="is-hidden-mobile" style="border-radius:10px;" :src="themePath + 'depositbanner.png'" />
  <img class="is-hidden-tablet" style="border-radius:10px;" :src="themePath + 'welcomebanner.png'" />

  <div class="title-section">
    <div class="title-section-left">
      <img :src="themePath + 'chest.png'"/>
    </div>
    <div class="title-section-right">
      <h2><span>$500</span> Welcome Bonus</h2> 
      <p>Simply make your first deposit today and receive up to 100% Welcome bonus up to $500.</p>
      <p>Need help? Our Customer Service Sharks are available 24/7 for all your questions.</p>
    </div>
    
  </div>

  <!-- <div style="display: flex;margin: 0 auto;align-content: center;justify-content: center;">
    <img :src="themePath + 'cashbackbanner.png'" class="cbbanner is-hidden-mobile"/>
    <img :src="themePath + 'cashbackbanner.png'" class="cbbanner is-hidden-tablet"/>
  </div> -->
  
  
  <button v-if="!loggedIn" class="button is-primary" style="font-size:22px;margin-top:20px;" @click.prevent="$emit('showAuth')">CLAIM NOW</button>
  <button v-if="loggedIn" class="button is-primary" style="font-size:22px;margin-top:20px;" @click.prevent="$emit('showWallet')">CLAIM NOW</button>

  <div style="text-align:left;margin-top:40px;">
  <ol class="welcome-offer-description-text">
    <li>The minimum deposit required to receive the bonus is $30 (or the equivalent in the currency the deposit was made).</li>
    <li>Full <router-link to="/bonus-terms">Bonus Terms and Conditions</router-link> apply.</li>
  </ol>
</div>
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

.title-section {
    display:flex;width:100%;align-items:center;margin-top:20px ;
  }

  .title-section-left {
    width:0;
  }

  .title-section-left img {
    display: none;
  }

  .title-section-right {
    display:flex;flex-direction:column;
  }

  .title-section-right h2 {
    font-family: Ackbar;color: #e0f2ff;font-size: 35px;
  }

  .title-section-right p {
    line-height: 1.2;
    font-family: FiraSans-Light;
    font-size: 16px;
  }

  .offer-container {
    display: flex;flex-wrap: wrap;justify-content: center;margin-top:20px;
    gap: 20px;
  }

  .offer-container img {
    border-radius: 4px;
    margin:10px;
  }

  .cbbanner {
    border-radius: 4px;margin-top:20px;
    width: 100%;
max-width: 600px;
  }

@media screen and (min-width: 600px) {

  .title-section {
    display:flex;width:100%;align-items:center;
  }

  .title-section-left {
    width:30%;
  }

  .title-section-left img {
    width:200px;
    display: unset;
  }

  .title-section-right {
    display:flex;flex-direction:column;
  }

  .title-section-right h2 {
    font-family: Ackbar;color: #e0f2ff;font-size: 40px;
  }

  .title-section-right p {
     line-height: 1.2;
    font-family: FiraSans-Light;
    font-size: 16px;
    padding: 0 30px;
  }

  .offer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top:20px;
    gap: 20px;
  }

  .offer-container img {
     width: 48%;
    border-radius: 10px;
    margin: 0;
  }

  
}


</style>

<script>
import { defineComponent } from "vue";
import { mapGetters } from 'vuex'

export default defineComponent({
  name: "WelcomeOffer",
  computed: {
    ...mapGetters(['loggedIn'])
  },
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