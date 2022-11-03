<template>
<div class="currency-selector" @click.prevent="currencyMenuVisble = !currencyMenuVisble" @blur="currencyMenuVisble = false" ref="dropdownMenu">
  <span>
  <div>
    <img :src="'/img/' + selectedCurrency.toLowerCase() + '.png'"> {{selectedCurrency.toUpperCase()}}
  </div>
  <i class="down-arrow"></i>
  </span>
  <div v-if="currencyMenuVisble" class="dropdown-menu">
    <div v-for="w in wallets" :key="w.id" @click.prevent="changeCurrency(w.symbol)">
      <img :src="'/img/' + w.symbol.toLowerCase() + '.png'"> {{w.symbol}}
    </div>
  </div>
</div> 
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'

export default defineComponent({
  computed: {
    ...mapGetters(['wallets', 'selectedCurrency']),
  },
  data() {
    return {
      currencyMenuVisble: false,
    }
  },
  created () {
    document.addEventListener('click', this.documentClick)
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick)
  },
  methods: {
    documentClick(e) {
      var el = this.$refs.dropdownMenu;
      var target = e.target;
      if (( el !== target) && !el.contains(target)) {
        this.currencyMenuVisble =false;
      }
    },
    changeCurrency(currency) {
      this.$store.commit('setSelectedCurrency', currency);
    },
  }
});
</script>