<template>
<div id="home-page" class="page content">
  <h2>Responsible Gaming</h2>
<p>
      <em
        >{{businessName}} across all brands it controls will maintain a constant
        commitment to promoting responsible gaming. Games provided are for the
        sole purpose of entertainment and take our responsibility to prevent any
        players showing signs of problem gambling from playing on our platforms.
        Our support staff are here to help with advice on what you can do if you
        believe gambling is becoming a problem. and are trained to spot
        behaviours which may be indicative of problem gaming</em
      >
    </p>
    <p>
      <em
        >If any of the following apply to you, please reach out to our customer
        support immediately;</em
      >
    </p>
    <p>
      <em>Do you have a hard time focussing outside of your gambling?</em>
    </p>
    <p>
      <em
        >Do you forfeit completing daily tasks or attending social events due to
        gambling?</em
      >
    </p>
    <p>
      <em>Do you spend the majority of your day gambling?</em>
    </p>
    <p>
      <em>Do you feel you have to gamble more if you are losing?</em>
    </p>
    <p>
      <em
        >If any of these apply to you please consider taking a break and
        deciding if online gaming is the right leisure activity for you?</em
      >
    </p>
    <p>
      <em
        >We will take great measures to ensure players under the age of 18 are
        not able to access our products.</em
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
  name: "ResponsibleGambling",
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