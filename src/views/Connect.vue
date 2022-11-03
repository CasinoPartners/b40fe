<template>
<div id="home-page" class="container is-max-widescreen page">  
</div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from 'vuex'

export default defineComponent({
  name: "Connect",
  computed: {
    ...mapGetters(['loggedIn']),
  },
  data() {
    return {
      provider: '',
    }
  },
  async mounted() {
    await this.verifyConnect();
  },
  methods: {
    async verifyConnect(){
      var response = await this.$securedAxios.post('/externallogin/verifyconnect?provider');
      window.location.href = config.SiteUrl;
    },
  }
});
</script>