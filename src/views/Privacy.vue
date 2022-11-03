<template>
<div id="home-page" class="page content">
<h3>KYC Policy, Privacy and Personal Data Management</h3>
<p>
      <em
        >We are committed above all else to protecting and respecting your
        privacy and maintaining the trust of our customers.</em
      >
    </p>
    <p>
      <em
        >Upon opening an account we will be obligated to verify your full,
        address and age to ensure you are eligible to play on our platform, we
        will ask for I.D and address proof. We may also ask to provide proof
        that the payment method you use is attributed to you soley.</em
      >
    </p>
    <p>
      <em
        >{{businessName}} will collect this information with the sole purpose of
        fulfilling it’s legal and ethical obligation to protect it’s customers,
        we will never share your information with any third party, nor will it
        be used in any other capacity within our business except to comply with
        the KYC policies outlined.&nbsp;</em
      >
    </p>
    <p>
      <em
        >You will be able to contact our live support, either via the live chat
        or through our e-mail at any time.&nbsp;</em
      >
    </p></div>
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
  name: "Privacy",
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