<template>
<div class="modal wallet-modal" @click.self="$emit('close')">
  <div class="modal-content">
      <div class="columns">
        <div class="column is-one-quarter modal-side-menu">
          <h2 class="is-hidden-mobile" style="margin-bottom:30px;">Affiliate Program</h2>
          <button class="button button" v-bind:class="{ highlight: currentTab=='overview' }" @click.prevent="currentTab='overview'">Overview</button>
          <button class="button button" v-bind:class="{ highlight: currentTab=='referrals' }" @click.prevent="loadReferrals()">Referrals</button>
          <button class="button button" v-bind:class="{ highlight: currentTab=='commission' }" @click.prevent="loadCommission();">Commission</button>
        </div>
        <div class="column modal-right-column">
          <div class="close-modal is-hidden-mobile" @click.self="$emit('close')">X</div>

          <div v-if="currentTab=='overview'" class="overview-tab">
            <div class="left-align" style="display:flex;flex-direction:column;font-size:20px;line-height:46px;">
              <p style="font-size:14px;line-height:25px">Refer players to {{siteName}} and earn money on every bet they make, win or lose!</p>
              <p style="font-size:14px;margin-bottom:12px;">Share your referral link or promo code below to start earning.</p>
              <label>Referral Link</label>
              <div class="copy-button-input">
                <input id="referralLink" v-model="referralLink" disabled>
                <CopyButton :value="referralLink" />
              </div>

              <label>Promo Code</label>
              <div class="copy-button-input">
                <input id="promoCode" v-model="username" disabled>
                <CopyButton :value="username" />
              </div>
            </div>
          </div>

          <div v-if="currentTab=='commission'" class="commission-tab" style="text-align:center;">
            <p v-if="commission.length===0">You do not have any earnings yet</p>
            <table v-if="commission.length>0" class="bets-table" style="margin-left:-50px;">
              <thead>
                <tr>
                  <th style="text-align:right!important;">Total Earnings</th>
                  <th style="text-align:right!important;">Withdrawn</th>
                  <th style="text-align:right!important;">Available</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in commission">
                  <td style="text-align:right!important;">{{c.total.toFixed(8)}}<img :src="'/img/' + c.currency.toLowerCase() + '.png'"></td>
                  <td style="text-align:right!important;">{{c.withdrawn.toFixed(8)}}<img :src="'/img/' + c.currency.toLowerCase() + '.png'"></td>
                  <td style="text-align:right!important;">{{(c.total - c.withdrawn).toFixed(8)}}<img :src="'/img/' + c.currency.toLowerCase() + '.png'"></td>
                </tr>
              </tbody>
            </table>
            <button v-if="commission.length>0" type="submit" class="button is-primary" style="width:150px;font-size:16px;padding: 5px;height: 30px;" @click.prevent="withdrawCommission">Withdraw</button>
            <br>
            <br>
            <p>Commission is calculated as: ((house edge * wager amount) / 2) * commission rate</p>
            <p>Your commission rate is: {{commissionRate * 100}}%</p>

          </div>

          <div v-if="currentTab=='referrals'" class="referrals-tab">
            <p v-if="referrals.length===0">You do not have any refferals yet</p>
            <table v-if="referrals.length>0" class="bets-table">
              <thead>
                <tr>
                  <th style="text-align:left!important;">Username</th>
                  <th>Registered</th>
                  <th>Total Deposits</th>
                  <th>Wagered</th>
                  <!-- <th style="text-align:right!important;">Commission</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="referral in referrals">
                  <td style="text-align:left!important;">{{referral.username}}</td>
                  <td>{{referral.registered.split(' ')[0]}}</td>
                  <td>{{referral.deposits}}</td>
                  <td>${{referral.wagered}}</td>
                  <!--<td style="text-align:right!important;">{{referral.commission}}</td>  -->
                  
                  <!-- <td style="text-align:right!important;">-</td>  -->
                </tr>
              </tbody>
            </table>
            <div v-if="referrals.length>0" style="display:flex;justify-content:center">
              <a style="margin-right:20px" v-if="prevEnabled" href="#" @click.prevent="refferalsPage--; loadReferrals()">Prev</a>
              <a style="margin-right:20px; color:#63728f!important" v-if="!prevEnabled" href="#" @click.prevent="">Prev</a>
              <a v-if="nextEnabled" href="#" @click.prevent="refferalsPage++; loadReferrals()">Next</a>
              <a v-if="!nextEnabled" style="color:#63728f!important" href="#" @click.prevent="">Next</a>
            </div>
          </div>        
        </div>
      </div>
  </div>
</div>  
</template>


<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'
import CopyButton from './CopyButton'

export default defineComponent({
  name: 'AffiliateModal',
  props: ['tab'],
  computed: {
    ...mapGetters(['user']),
  },
  components: {
    CopyButton,
  },
  data() {
    return {
      currentTab: 'overview',
      email: '',
      username: '',
      referralLink: '',
      refferalsPage: 0,
      referrals: [],
      commission: [],
      siteName: config.SiteName,
      prevEnabled: false,
      nextEnabled: true,
      commissionRate: 0
    }
  },
  watch: {
  },
  async mounted() {
    this.username = this.user.name;
    this.referralLink = config.SiteUrl + '/?r=' + this.username;
  },
  methods: {
    async loadReferrals() {
      this.currentTab='referrals';
      var response = await this.$securedAxios.get('/affiliate/referrals?page=' + this.refferalsPage);
      if(response.data) {
        if(response.data.referrals.length == 0) return;
        this.referrals = response.data.referrals;

        if(this.refferalsPage > 0) {
          this.prevEnabled = true;
        } else {
          this.prevEnabled = false;
        }

        if(this.referrals.length == 10) {
          this.nextEnabled = true;
        } else {
          this.nextEnabled = false;
        }
      }
    },
    async loadCommission() {
      this.currentTab='commission';
      var response = await this.$securedAxios.get('/affiliate/commission');
      if(response.data) {
        if(response.data.commission.length == 0) return;
        this.commission = response.data.commission;
        this.commissionRate = response.data.rate
      }
    },
    async withdrawCommission() {
      var response = await this.$securedAxios.post('/affiliate/withdraw');
      this.$toast.success('Withdrawing Commission...');
      this.$emit('close');
    }
  }
});
</script>