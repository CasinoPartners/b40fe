<template>
<div>
<div class="bet-table-buttons">
  <!-- <button :class="`button ${ activeButton === 'all' ? 'is-primary' : ''}`" @click.prevent="currentBets = allBets; activeButton = 'all'">All Bets</button> -->
  <button :class="`button ${ activeButton === 'hr' ? 'is-primary' : ''}`" @click.prevent="currentBets = hrBets; activeButton = 'hr'">Big Wins</button>
  <button v-if="loggedIn" :class="`button ${ activeButton === 'own' ? 'is-primary' : ''}`" @click.prevent="currentBets = ownBets; activeButton = 'own'">My Bets</button>
</div>
<table class="bets-table">
  <thead>
    <tr>
      <th style="text-align:left!important;">Game</th>
      <th>Player</th>
      <th class="is-hidden-mobile">Bet Amount</th>
      <th class="is-hidden-mobile">Multiplier</th>
      <th style="text-align:right!important;">Payout</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="bet in currentBets" :key="bet.id">
      <td style="text-align:left!important;">{{bet.game}}</td>
      <td class="highlight">{{bet.userName}}</td>
      <td class="is-hidden-mobile"><div class="currency">{{displayFiat === true ? '$' + bet.wager.toFixed(2) : bet.cryptoWager.toFixed(8)}}<img :src="'/img/' + bet.currency.toLowerCase() + '.png'"></div></td>
      <td class="is-hidden-mobile">{{bet.multiplier}}x</td>
      <td style="text-align:right!important;" class="win" v-bind:class="{ loss: bet.cryptoPayout < bet.cryptoWager }"><div class="currency">{{displayFiat === true ? '$' + bet.payout.toFixed(2) : bet.cryptoPayout.toFixed(8)}}<img :src="'/img/' + bet.currency.toLowerCase() + '.png'"></div></td> 
    </tr>
  </tbody>
</table>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['allBets', 'hrBets', 'ownBets', 'loggedIn', 'displayFiat']),
  },
  data() {
    return {
      activeButton: 'hr',
      currentBets: [],
    }
  },
  async mounted() {
    if(this.allBets.length === 0) {
      const response = await this.$securedAxios({
        method: 'get',
        url: '/bets/bets',
      });

      if(response.data != null) {
        this.currentBets = response.data.highRollerBets;
        this.$store.commit('setBets', response.data);
      }
    } else {
      this.currentBets = this.hrBets;
    }
  }
}
</script>s