<template>
<div id="home-page" class="page content">
  <h2>AML Policy</h2>
<p>
      <em
        >{{businessName}} must protect the integrity of it’s gaming activities and
        aims to keep its website free from cheating, crime &amp; money
        laundering activity, which will only serve to damage {{businessName}}
        reputation and potentially damage the playing experience of our
        customers.&nbsp;</em
      >
    </p>
    <p>
      <em
        >The finance team reserve the right to question &amp; request supporting
        documentation to ascertain the source of any funds deposited into the
        site. In the event of further documentation being required a temporary
        account block will be applied and in the event of failure to satisfy the
        investigation monies will be returned via the method they were
        deposited. We will always do our utmost to ensure that these
        investigations are performed as speedily as possible to minimise and
        interruption to our customer experience, and ask for your understanding
        that these policies are here to protect both {{businessName}} and our
        customers from any negative experience.</em
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
  name: "AML",
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