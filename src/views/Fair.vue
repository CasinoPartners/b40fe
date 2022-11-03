<template>
<div id="home-page" class="page content">
  <h2>Fairness & RNG Testing</h2>
<p>
      <em
        >{{businessName}} will work with approved testing houses to conduct
        external compliance testing to verify elements such as functionality,
        display, transaction, rules and mathematical efficiency (i.e the “RTP”
        (Return to player) calculation) to ensure the overall compliance of our
        products to applicable regulatory requirements. All house games will be
        subject to these tests. Additionally, we commit to internal testing
        including Integration testing and user acceptance testing, thus
        guaranteeing all games integrated into our platform returns the expected
        user experience.</em
      >
    </p>
    <p>
      <em
        >The theoretical Return to Player “RTP” calculation is a theoretical
        calculation of the expected % of wagers that a specific game will return
        to player after an amount of plays (e.g 100,000,000 game plays.) While
        every single game play will be truly unpredictable and it will be
        possible to see all viable outcomes on a specific bet, the average
        return of a specific game in the long run will approach the theoretical
        RTP value. The RTP value is calculated via either a theoretical or
        simulated approach depending on the game type.</em
      >
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
min-height: 650px;
padding: 20px;
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Fair", 
  data() {
    return {
      siteName: config.SiteName,
      siteUrl: config.SiteUrl,
      siteDomain: config.DomainName,
      businessName: config.BusinessName
    }
  }
});
</script>