<template>
<div class="sports-page">
    <div class="sports-container is-sports-theater" :class="`${ theaterMode === true ? 'is-theater' : ''}`">
      <div class="sports-iframe-container is-sports-theater" :class="`${ theaterMode === true ? 'is-theater' : ''}`">
        <iframe v-if="showCurrencySelect == false" :src="launchUrl" frameborder="0" allowfullscreen scrolling="auto" class="sports-iframe" id="sports-iframe">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from 'vuex'
export default defineComponent({
  name: "Sports",
  computed: {
    ...mapGetters(['loggedIn', 'selectedCurrency']),
  },
  watch: {
    selectedCurrency() {
      this.openSports();
    },
    loggedIn() {
      if(this.loggedIn == false) {
        this.launchUrl = '';
        this.showCurrencySelect = true;
      } else {
        this.openSports();
      }
    }
  },
  data() {
    return {
      launchUrl: '',
      showCurrencySelect: true,
    }
  },
  async mounted() {
    this.openSports();

    window.addEventListener('message', (event) => {
      if (event.origin.includes('sports.8et.co.uk')){
        if (event.data.code === 1001) {
          this.$emit('showAuth');
        }
      }
    });
  },
  methods: {
    async openSports() {
      this.$emit('hideChat');
      this.$emit('hideMenu');

      const response = await this.$securedAxios({
                method: 'get',
                url: `/sports/get-url?currency=${this.selectedCurrency}&displayCurrency=USD`,
                });

      try {
        var parsed = JSON.parse(response.data);
        if(parsed.Url != undefined) {
            this.launchUrl = parsed.Url;
            this.showCurrencySelect = false;
        } 
      } catch (e) { 
        // TODO show error to user for normal errors
        if(response.data.errorMessage == 'Country blocked')
        {
          this.$emit('showCountryBlock');
        }
      }
    },
  }
});
</script>