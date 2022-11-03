<template>
<div id="home-page" class="page content">
  <h2>Self Exclusion</h2>
<p>
      <em
        >If you are concerned about your gambling or feel as if you need a
        break, please use our self exclusion option, you can decide the time you
        are excluded for and once set this will not be un-done in any
        circumstance. If you need any advice or help about how best to use this
        feature then please speak to our support staff.</em
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
padding: 20px;
min-height: 650px;
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SelfExclusion",
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