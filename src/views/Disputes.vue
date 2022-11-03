<template>
<div id="home-page" class="page content">
  <h2>Dispute Resolution</h2>
    <p>
      <em
        >In the event of any dispute, our support staff will always aim to amicably settle the dispute first and foremost, if you feel as though your dispute was not settled in a fair or satisfactory way, then you must contact the regulator within 6 months, please give clear and unequivocal details of the complaint to ensure it’s dealt with as speedily as possible.</em
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
min-height: 650px;
max-width: 1200px;
padding: 20px;
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Disputes",
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