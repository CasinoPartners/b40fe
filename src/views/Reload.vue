<template>
<div id="home-page" class="page content" style="max-width: 800px;">
  <img class="is-hidden-mobile" :src="themePath + 'reloadbanner.png'" style="border-radius: 10px;" />
  <img class="is-hidden-tablet" :src="themePath + 'reloadbanner.png'" style="border-radius: 10px;"/>

  <h2>Monday 100% Reload Bonus</h2>
  <p>After the weekend what better than a Monday Sharky Reload Bonus!! Simply make a deposit at SharkCasino.io and you can claim 100% match up to $2,000 right now!</p>
  <p>Bonus Code = MONRELOAD1</p>
  <div style="text-align:left;margin-top:40px;">
  <ol class="welcome-offer-description-text">
    <li>Please enter the bonus code before making your deposit.</li>
    <li>The reload bonus is only available to players of VIP level 3 and above.</li>
    <li>Bonus is valid for 7 days.</li>
    <li>The bonus is available on your first deposit only every Monday.</li>
    <li>To get the bonus, you must make a deposit of at least $30 in any supported currency.</li>
    <li>The maximum bonus amount is 100% of the deposit amount, but not more than $2000 in any supported currency.</li>
    <li>Maximum bet while wagering is $5. Players betting over the limit could have their bonus, balance and winnings forfeit.</li>
    <li>Bonus funds must be wagered 30X before they can be added to the real money balance and withdrawn.</li>
    <li>Only bets using bonus money count towards the wagering requirement. Bonus money will be used after the original deposit has been used.</li>
    <li>Games contribute different amounts to the rollover. Slots contribute 100% while all other games contribute 5%.</li>
    <li>Players cannot use the buy bonus feature in slot games while the bonus is active. Doing so may result in your bonus balance and winnings being forfeit.</li>
    <li>Players may only claim the Reload once every Monday.</li>
    <li>If an account is found to be linked to another account that has already received the Reload bonus , the bonus funds and winnings may be confiscated from both accounts.</li>
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
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Reload",
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