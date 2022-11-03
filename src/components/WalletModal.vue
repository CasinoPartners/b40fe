<template>
<div class="modal wallet-modal" @click.self="$emit('close')">
  <div class="modal-content">
      <div class="columns">
          <div class="close-modal is-hidden-tablet" @click.self="$emit('close')">X</div>
        <div class="column is-one-quarter modal-side-menu">
          <h2 class="is-hidden-mobile" style="margin-bottom:30px;">Wallet</h2>
          <button class="button button" v-bind:class="{ highlight: currentTab=='deposit' }" @click.prevent="currentTab='deposit'">Deposit</button>
          <button class="button button" v-bind:class="{ highlight: currentTab=='buycrypto' }" @click.prevent="currentTab='buycrypto'">Buy Crypto</button>
          <button class="button button" v-bind:class="{ highlight: currentTab=='withdraw' }" @click.prevent="currentTab='withdraw'">Withdraw</button>
          <button class="button button" v-bind:class="{ highlight: currentTab=='tip' }" @click.prevent="currentTab='tip'">Tip</button>
          <button class="button button" v-bind:class="{ highlight: currentTab=='bonuses' }" @click.prevent="currentTab='bonuses'">Bonuses</button>
          <button class="button button" v-bind:class="{ highlight: currentTab=='promocode' }" @click.prevent="currentTab='promocode'">Promo Code</button>
        </div>
        <div class="column modal-right-column">
          <div class="close-modal is-hidden-mobile" @click.self="$emit('close')">X</div>

          <div v-if="currentTab=='deposit'" class="deposit-tab" style="min-height: 500px;">
            <div v-if="welcomeOffer != null" style="background-color: #0d4275;padding: 10px;border-radius: 10px;text-align:center">
              <h2 style="font-family:FiraSans-Bold">{{welcomeOffer.bonusOffer.title}}: <span>{{welcomeOffer.data.PercentMatch}}% Up to {{welcomeOffer.data.MaxBonusAmount}} {{welcomeOffer.data.Currency}}</span> <span v-if="welcomeOffer.data.FreeSpinsAmount > 0" style="color:#e0f2ff">+ {{welcomeOffer.data.FreeSpinsAmount}} Free Spins</span></h2>
              
              <!-- <p>Deposit ${{welcomeOffer.data.MinDeposit}} or more to receive bonus</p> -->
              <br>
              <button class="button is-primary" style="font-size:14px;" @click.prevent="enableWelcomeOffer(welcomeOffer.bonusOffer.id)">{{getEnableText(welcomeOffer.bonusOffer.id)}}</button>
            </div>
            <br>

            <div v-if="!selectedWallet.isCrypto">
              <p>FIAT deposits temporarily disabled</p>
            </div>
            
            <p v-if="selectedCurrency === 'ETH'" style="color: red;">Please do not send ETH from Coinbase as it may not credit automatically.</p>
            
            <div v-if="selectedWallet.isCrypto">
              <div v-if="selectedWallet.isCrypto">
            <label>Currency</label>
            <CurrencySelector />

            <!-- <label v-if="networks.length > 0">Network</label>
            <div class="currency-selector" @click.prevent="networkMenuVisble = !networkMenuVisble" @blur="networkMenuVisble = false" ref="dropdownMenu">
              <span>
              <div>
                {{selectedNetworkName}}
              </div>
              <i class="down-arrow"></i>
              </span>
              <div v-if="networkMenuVisble" class="dropdown-menu">
                <div v-for="n in networks" :key="n.name" @click.prevent="changeNetwork(n.name)">
                  {{n.name}}
                </div>
              </div>
            </div> -->

            <label v-if="showGenerateButton === false">Address</label>
            <div v-if="showGenerateButton === false" class="copy-button-input">
              <input id="depositAddress" v-model="depositAddress" disabled>
              <CopyButton :value="depositAddress" />
            </div>
            <button v-if="showGenerateButton === true" class="button is-primary" :class="addressGenerating ? 'button--loading': ''" style="margin-bottom:14px;" :disabled="addressGenerating" @click.prevent="generateDepositAddress"><span :class="addressGenerating ? 'buttontxt-visibility-hide' : ''">Create Address</span></button>


            <label v-if="selectedCurrency === 'XRP'">Tag</label>
            <div v-if="selectedCurrency === 'XRP'" class="copy-button-input">
              <input id="depositAddress" v-model="depositTag" disabled>
              <CopyButton :value="depositTag" />
            </div>

            <p v-if="showGenerateButton === false">Only send {{selectedCurrency.toUpperCase()}} to this address. Deposits may take some time to credit to your account.</p>

            <div v-if="showGenerateButton === false" class="qrcode">
                <qrcode-vue :value="depositAddress" :size="150" level="H" />
            </div>

            <div class="left-align">
              <p class="">Minimum Deposit: <span class="highlight">{{formatCurrency(minDeposit)}}</span></p> 
            </div>
            </div>
            </div>
          </div>

          <div v-if="currentTab=='buycrypto'" class="buycrypto-tab">
            <iframe width="100%" height="100%" frameborder='none' style="height: 400px;border-radius: 10px;" src="https://widget.changelly.com?from=usd&to=btc%2Cbch%2Ceth%2Cdoge%2Cltc&amount=50&address=&fromDefault=usd&toDefault=btc&merchant_id=DbYjGU7TCcdcXkX5&payment_id=&v=3&type=no-rev-share&color=1b68ea&headerId=1&logo=hide&buyButtonTextId=1">Can't load widget</iframe>
          </div>


          <div v-if="currentTab=='withdraw'" class="withdraw-tab">
            <div v-if="!selectedWallet.isCrypto">
              <p>FIAT withdrawals coming soon...</p>
            </div>

            <div v-if="selectedWallet.isCrypto">
            <div class="left-align">
              <label>Currency</label>
              <CurrencySelector />

              <!-- <label v-if="networks.length > 0">Network</label>
            <div class="currency-selector" @click.prevent="networkMenuVisble = !networkMenuVisble" @blur="networkMenuVisble = false" ref="dropdownMenu">
              <span>
              <div>
                {{selectedNetworkName}}
              </div>
              <i class="down-arrow"></i>
              </span>
              <div v-if="networkMenuVisble" class="dropdown-menu">
                <div v-for="n in networks" :key="n" @click.prevent="changeNetwork(n.name)">
                  {{n.name}}
                </div>
              </div>
            </div> -->


              <label>Address <span class="error" v-if="addressError">*</span></label>
              <input id="withdrawAddress" class="input" v-model="withdrawAddress" autocomplete="off">

              <label v-if="selectedCurrency === 'XRP'">Tag</label>
              <div v-if="selectedCurrency === 'XRP'" class="copy-button-input">
                <input id="depositAddress" class="input" v-model="withdrawTag">
              </div>

              <label v-if="mfaEnabled">MFA Code<span class="error" v-if="mfaError">*</span></label>
              <input v-if="mfaEnabled" id="mfaCode" type="text" v-model="mfaCode" autocomplete="off">
              

              <div class="columns">
                <div class="column">
                  <label>Amount <span class="error" v-if="amountError">*</span></label>
                  <div class="side-button-wrapper">
                    <input id="withdrawAmount" class="input" v-model="withdrawAmount" autocomplete="off">
                    <div class="withdrawMax sidebutton black" @click.prevent="setMaxWithdrawAmount">Max</div>
                  </div>
                </div>
                <div class="column">
                  <label>Available Balance</label>
                  <input id="balanceAmount" v-bind:value="formatCurrency(availableBalance)" disabled>
                </div>
              </div>
            </div>

            <button type="submit" class="button is-primary withdraw-button" @click.prevent="withdraw">Withdraw</button>

            <div class="left-align">
              <div class="error">
                {{withdrawErrorMessage}}
              </div>
              <p class="">Minimum withdrawal: <span class="highlight">{{formatCurrency(minWithdrawalAmount)}}</span></p> 
              <p>Network Fee: <span class="highlight">{{formatCurrency(withdrawalFee)}}</span></p>
            </div>
            </div>
          </div>

          <div v-if="currentTab=='tip'" class="tip-tab">
            <div v-if="selectedWallet.isCrypto">
            <div class="left-align">
              <label>Currency</label>
              <CurrencySelector />

              <label>Player <span class="error" v-if="tipToError">*</span></label>
              <input id="tipTo" class="input" v-model="tipTo" autocomplete="off">
              
              <label v-if="mfaEnabled">MFA Code<span class="error" v-if="mfaError">*</span></label>
              <input v-if="mfaEnabled" id="mfaCode" type="text" v-model="mfaCode" autocomplete="off">

              <div class="columns">
                <div class="column">
                  <label>Amount <span class="error" v-if="tipAmountError">*</span></label>
                  <div class="side-button-wrapper">
                    <input id="tipAmount" class="input" v-model="tipAmount" autocomplete="off">
                    <div class="tipMax sidebutton black" @click.prevent="setMaxTipAmount">Max</div>
                  </div>
                </div>
                <div class="column">
                  <label>Available Balance</label>
                  <input id="balanceAmount" v-bind:value="formatCurrency(availableTipBalance)" disabled>
                </div>
              </div>
            </div>

            <button type="submit" class="button is-primary withdraw-button" @click.prevent="tip">Send Tip</button>

            <div class="left-align">
              <div class="error">
                {{tipErrorMessage}}
              </div>
              <p class="">Minimum Tip: <span class="highlight">{{formatCurrency(minTipAmount)}}</span></p> 
            </div>
            </div>
          </div>

          <div v-if="currentTab=='promocode'" class="promo-tab">
            <h2>Promo Code</h2>
            <form class="form promo-form" @submit.prevent="useCode">
              <input id="code" class="input" v-model="code" autocomplete="off" placeholder="Code">
              <button type="submit" class="button is-primary">Submit</button>
            </form>
          </div>

          <div v-if="currentTab=='bonuses'" class="bonus-tab">
            <div v-if="showConfirmForfeit">
              <p>Are you sure you want to forefeit your active bonus?</p>
              <p>Your real balance after forfeit will be {{formatBonusCurrency(activeBonus.realAmount)}}</p>
              <br>
              <button class="button is-success" style="margin-right: 40px;" @click.prevent="showConfirmForfeit = false">Cancel</button>
              <button class="button is-danger" @click.prevent="forfeitBonus()">Confirm</button>
            </div>
            <div v-if="!showConfirmForfeit">
              <div v-if="activeBonus != null" class="active-bonus-container">
                <h2 class="active-bonus-title">Active Bonus</h2>
                <p>Wager Required: {{formatBonusCurrency(activeBonus.currentWager)}} / {{formatBonusCurrency(activeBonus.wagerRequired)}}</p>
                <progress style="width:80%;margin:0 auto; margin-top:10px;" class="progress is-primary" :value="roundDown(activeBonus.currentWager  / activeBonus.wagerRequired, 2) * 100" max="100"></progress>
                <div class="columns">
                  <div class="column" style="text-align:left">
                    <p>Real Balance:</p>
                    <p>Bonus Balance:</p>
                    <p>Rollover:</p>
                    <p>Max Bet:</p>
                  </div>
                  <div class="column" style="text-align:right">
                    <p>{{formatBonusCurrency(activeBonus.realAmount)}}</p>
                    <p>{{formatBonusCurrency(activeBonus.bonusAmount)}}</p>
                    <p>{{activeBonus.rollover}}x</p>
                    <p>${{activeBonus.maxBet}}</p>
                  </div>
                </div>
                <button class="button is-danger" @click.prevent="showConfirmForfeit=true">Forfeit</button>
              </div>

              <div style="margin:10px;margin-top:20px">
                <h2 style="margin-bottom:10px;">Welcome Offers</h2>
                <div>
                  <div v-for="wo in welcomeOffers" style="background-color: #0d4275;padding: 10px;border-radius: 10px;text-align:center">
                    <h2 style="font-family:FiraSans-Bold">{{wo.bonusOffer.title}}: <span>{{wo.data.PercentMatch}}% Up to {{wo.data.MaxBonusAmount}} {{wo.data.Currency}}</span> <span v-if="wo.data.FreeSpinsAmount > 0" style="color:#e0f2ff">+ {{wo.data.FreeSpinsAmount}} Free Spins</span></h2>
                  <p>Deposit ${{wo.data.MinDeposit}} or more to receive bonus</p>
                  <button class="button is-primary" style="font-size:14px;margin-top:10px" @click.prevent="enableWelcomeOffer(wo.bonusOffer.id)">{{getEnableText(wo.bonusOffer.id)}}</button>
                  </div>
                </div>
              </div>

              <div style="margin:10px;margin-top:20px">
                <h2 style="margin-bottom:10px;">Bonuses Available</h2>
                <div style="display: flex;justify-content: space-evenly;">
                  <div v-for="bo in bonuses.filter(x => x.bonusOffer.type > 2)" style="background-color: #0d4275;padding: 10px;border-radius: 10px;text-align:center;width:300px;">
                    <h2 style="font-family:FiraSans-Bold">{{bo.bonusOffer.title}}</h2>
                    <button class="button is-primary" style="font-size:14px;margin-top:10px" @click.prevent="claimBonus(bo.id)">Claim</button>
                  </div>
                </div>
              </div>
              
              <div v-if="welcomeOffers.length == 0 && bonuses.length==0 && activeBonus == null">
                  <p>No bonuses available at this time</p>
              </div>
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
import QrcodeVue from 'qrcode.vue'
import CopyButton from './CopyButton'
import CurrencySelector from './CurrencySelector'

export default defineComponent({
  name: 'WalletModal',
  props: ['tab'],
  computed: {
    ...mapGetters(['wallets', 'selectedCurrency', 'displayFiat', 'mfaEnabled']),
    selectedWallet() {
      for(var i = 0; i < this.wallets.length; i++)
      {
        if(this.wallets[i].symbol === this.selectedCurrency)
        {
          return this.wallets[i];
        }
      }
      return null;
    },
    selectedNetwork() {
      var wallet = this.selectedWallet;
      if(wallet === null) return null;

      for(var i = 0; i < wallet.networks.length; i++)
      {
        if(wallet.networks[i].name === this.selectedNetworkName)
        {
          return wallet.networks[i];
        }
      }
      return null;
    },
    exchangeRate() {
      var wallet = this.selectedWallet;
      if(wallet === null) return 1;
      return wallet.exchangeRate;
    },
    platformExchangeRate() {
      var wallet = this.selectedWallet;
      if(wallet === null) return 1;

      var network = this.selectedNetwork;

      var exchangeRate = wallet.exchangeRate;

      if(network == null) {
        return exchangeRate;
      }

      if(network.platformCurrency !== this.selectedCurrency) {
        for(var i = 0; i < this.wallets.length; i++)
        {
          if(this.wallets[i].symbol === network.platformCurrency) {
            exchangeRate = this.wallets[i].exchangeRate;
          }
        }
      }
      return exchangeRate;
    },
    minWithdrawalAmount() {
      var network = this.selectedNetwork;
      if(network === null) return 0;
      
      if(network.platformCurrency !== this.selectedCurrency) {
        return network.minWithdrawal * this.platformExchangeRate / this.exchangeRate;
      }
      return network.minWithdrawal;
    },
    minTipAmount() {
      var network = this.selectedNetwork;
      if(network === null) return 0;
      
      if(network.platformCurrency !== this.selectedCurrency) {
        return network.minTip * this.platformExchangeRate / this.exchangeRate;
      }
      return network.minTip;
    },
    availableBalance() {
      var wallet = this.selectedWallet;
      if(wallet === null) return 0;

      var b = 0;
      b = this.roundDown(wallet.balance - this.withdrawalFee, 8);
      if(b < 0) b = 0;
      return b;
    },
    availableTipBalance() {
      var wallet = this.selectedWallet;
      if(wallet === null) return 0;
      return wallet.balance;
    },
    networks() {
      var wallet = this.selectedWallet;
      if(wallet.networks === null) return [];
      return wallet.networks;
    },
    withdrawalFee() {
      var wallet = this.selectedWallet;
      if(wallet === null) return 0;
      var network = this.selectedNetwork;
      if(network === null) return 0;

      if(network.platformCurrency !== this.selectedCurrency) {
        return network.withdrawalFee * this.platformExchangeRate / this.exchangeRate;
      }
      return network.withdrawalFee;
    },
    minDeposit() {
      var network = this.selectedNetwork;

      if(network === null) return 0;

      if(network.platformCurrency !== this.selectedCurrency) {
        return network.minDeposit * this.platformExchangeRate / this.exchangeRate;
      }
      return network.minDeposit;
    }
  },
  components: {
    QrcodeVue,
    CopyButton,
    CurrencySelector
  },
  data() {
    return {
      code: '',
      currentTab: this.tab,
      depositAddress: '',
      withdrawAmount: '', // can be in usd or crypto depending on what players display optionns are
      withdrawAddress: '',
      amountError: false,
      addressError: false,
      withdrawErrorMessage: '',
      selectedNetworkName: '',
      networkMenuVisble: false,
      depositTag: '',
      withdrawTag: '',
      withdrawing: false,
      mfaCode: '',
      mfaError: false,
      tipping: false,
      welcomeOffer: null, 
      welcomeOffers: [],
      bonuses: [],
      activeBonus: null,
      showGenerateButton: false,
      showConfirmForfeit: false,
      fiatAmount: 0,
      fiatAmountError: '',
      fiatProcessor: config.FiatProcessor,
      fiatLink: '',
      addressGenerating: false,
      tipToError: false,
      tipAmountError: false,
      tipTo: '',
      tipAmount: 0,
      bonusExchangeRate: 1
    }
  },
  watch: {
    async selectedCurrency() {
      this.selectedNetworkName = this.networks[0].name;
      await this.updateDepositAddress()
    },
  },
  created () {
    document.addEventListener('click', this.documentClick)
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick)
  },
  async mounted() {
    this.selectedNetworkName = this.networks[0].name;
    await this.updateDepositAddress();

    await this.getBonuses();
  },
  methods: {
    async useCode() {
      var response = await this.$securedAxios.post('/bonuses/use-code', {
        code: this.code,
      });

      if(response.data.error == undefined ) {
        this.$toast.success('Claiming Promo...');
        this.$emit("close");
      } else {
        this.$toast.error(response.data.error);
      }
    },
    getEnableText(id) {
      for (let i = 0; i < this.bonuses.length; i++) {
        const element = this.bonuses[i];
        if(element.bonusOffer.id === id && element.status === 4) { 
          return "Disable";
        }
      }

      return "Enable";
    },
    async getDepositLink() {
      const response = await this.$securedAxios({
                method: 'post',
                url: '/wallet/get-deposit-link?amount=' + this.fiatAmount + '&currency=' + this.selectedWallet.symbol,
                });
      this.fiatLink = response.data.url;
    },
    async claimBonus(id) {
      const response = await this.$securedAxios({
                method: 'post',
                url: '/bonuses/claim-bonus',
                data: {
                  id: id
                }
                });

      if(response.data.error != undefined) {
        this.$toast.error(response.data.error);
      } else {
        this.$toast.success('Bonus Claimed');
      }

      this.$emit('close');
    },
    async enableWelcomeOffer(id) {
      // TODO disable button while waiting
      const response = await this.$securedAxios({
                method: 'post',
                url: '/bonuses/enable-welcome-offer',
                data: {
                  id: id
                }
                });

      if(response.data.error != undefined) {
        this.$toast.error(response.data.error);
      } else {
        // TODO change button text to "Disable" and any other welcom offers to "Enable"
        this.$toast.success('Bonus Enabled');
      }

      this.$emit('close');
    },
    async forfeitBonus() {
      const response = await this.$securedAxios({
                method: 'post',
                url: '/bonuses/forfeit-bonus',
                });
      if(response.status == 200) {
        this.$toast.success('Forfeiting Bonus...');
      }
      this.$emit('close');
    },
    roundDown(x, n) {
      return Math.floor(x * Math.pow(10, n) + 1e-6) / Math.pow(10, n);
    },
    documentClick(e) {
      var el = this.$refs.dropdownMenu;
      var target = e.target;
      if (( el !== target) && !el.contains(target)) {
        this.networkMenuVisble =false;
      }
    },
    formatCurrency(amount) {
      if(this.displayFiat) {
        return '$' + (amount * this.exchangeRate).toFixed(2);
      }
      return amount.toFixed(8);
    },
    formatBonusCurrency(amount) {
      if(this.displayFiat) {
        return '$' + (amount * this.bonusExchangeRate).toFixed(2);
      }
      return amount.toFixed(8);
    },
    setMaxTipAmount() {
      if(this.displayFiat) {
        this.tipAmount = this.roundDown(this.availableTipBalance  * this.exchangeRate, 2);
      } else {
        this.tipAmount = this.roundDown(this.availableTipBalance,8);
      }
    },
    setMaxWithdrawAmount() {
      if(this.displayFiat) {
        this.withdrawAmount = this.roundDown(this.availableBalance  * this.exchangeRate, 2);
      } else {
        this.withdrawAmount = this.roundDown((this.availableBalance),8);
      }
      if(this.withdrawAmount < 0) {
        this.withdrawAmount = 0;
      }
    },
    async changeNetwork(n) {
      this.selectedNetworkName = n;
      await this.updateDepositAddress();
    },
    async updateDepositAddress() {
      try {
        const response = await this.$securedAxios({
                method: 'get',
                url: '/wallet/deposit-address?currency=' + this.selectedCurrency + '&networkName=' + this.selectedNetworkName,
                });
              
          this.depositAddress = response.data.address;
          this.showGenerateButton = false;
      } catch (error) {
        this.showGenerateButton = true;
      }
      
    },
    async generateDepositAddress() {
      try{
        this.addressGenerating = true;
        const response = await this.$securedAxios({
                  method: 'post',
                  url: '/wallet/deposit-address?currency=' + this.selectedCurrency + '&networkName=' + this.selectedNetworkName,
                  });
                
        this.depositAddress = response.data.address;
        this.showGenerateButton = false;
        this.addressGenerating = false;
      } catch (error) {
        this.showGenerateButton = true;
        this.addressGenerating = false;
      }
    },
    async getBonuses() {
      const response = await this.$securedAxios({
                method: 'get',
                url: '/bonuses/get-bonuses',
                });
              
      // TODO for ones that are already enabled change text of button to disable
      if(response.data.welcomeOffers.length > 0) {
        this.welcomeOffer = response.data.welcomeOffers[0];
        this.welcomeOffer.data = JSON.parse(response.data.welcomeOffers[0].bonusOffer.data);
      }

      this.welcomeOffers = response.data.welcomeOffers;
      this.bonuses = response.data.bonuses;

      this.activeBonus = response.data.activeBonus;
      this.bonusExchangeRate = response.data.bonusExchangeRate;
      
    },
    async withdraw() {
      if(this.withdrawing) return;
      this.withdrawing = true;

      var amount = parseFloat(this.withdrawAmount);
      if(this.displayFiat) {
        amount = parseFloat(this.withdrawAmount) / this.exchangeRate;
      }

      this.withdrawErrorMessage = ''
      this.amountError = false;
      this.addressError = false;

      if(amount === null || amount === 0 || isNaN(amount)) {
        this.withdrawErrorMessage = 'Please enter amount'
        this.amountError = true;
        this.withdrawing = false;
        return;
      }

      if(amount < this.minWithdrawalAmount) {
        this.withdrawErrorMessage = 'Withdraw amount is too low'
        this.amountError = true;
        this.withdrawing = false;
        return
      }

      if(amount > this.availableBalance) {
        this.withdrawErrorMessage = 'Withdraw must be less than balance minus fee'
        this.amountError = true;
        this.withdrawing = false;
        return
      }

      if(this.withdrawAddress === '') {
        this.withdrawErrorMessage = 'Please enter a deposit address'
        this.addressError = true;
        this.withdrawing = false;
        return;
      }

      if(this.mfaCode === '' && this.mfaEnabled === true) {
        this.withdrawErrorMessage = 'Please enter a MFA code'
        this.mfaError = true;
        this.withdrawing = false;
        return;
      }

      try {
        const response = await this.$securedAxios({
          method: 'post',
          url: '/wallet/withdraw',
          data: {
            currency: this.selectedCurrency,
            amount: amount,
            address: this.withdrawAddress,
            network: this.selectedNetworkName,
            tag: this.withdrawTag,
            mfaCode: this.mfaCode
          }
        });
      
        if(response.status === 200) {
          if(response.data.success == false) {
            this.withdrawErrorMessage = response.data.errorMessage
            this.$toast.error(response.data.errorMessage);
          } else {
            this.$store.commit('walletDebit', {amount: (amount + this.withdrawalFee), currency: this.selectedCurrency});
            this.$toast.default('Withdrawal requested.');
            this.$emit('close');
          }
        } 
        else {
          this.withdrawErrorMessage = response.data.errorMessage
        }  
        this.withdrawing = false;
      }  
      catch(e) {
        this.withdrawErrorMessage = 'Withdraw error'
        this.withdrawing = false;
      }
    },
    async tip() {
      if(this.tipping) return;
      this.withdrawing = true;

      var amount = parseFloat(this.tipAmount);
      if(this.displayFiat) {
        amount = parseFloat(this.tipAmount) / this.exchangeRate;
      }

      this.tipErrorMessage = ''
      this.tipAmountError = false;
      this.tipToError = false;

      if(amount === null || amount === 0 || isNaN(amount)) {
        this.tipErrorMessage = 'Please enter amount'
        this.tipAmountError = true;
        this.tipping = false;
        return;
      }

      if(amount < this.minTipAmount) {
        this.tipErrorMessage = 'Tip amount is too low'
        this.tipAmountError = true;
        this.tipping = false;
        return
      }

      if(amount > this.availableTipBalance) {
        this.tipErrorMessage = 'Tip must be less than or equal to balance'
        this.tipAmountError = true;
        this.tipping = false;
        return
      }

      if(this.tipTo === '') {
        this.tipErrorMessage = 'Please enter a player name'
        this.tipToError = true;
        this.tipping = false;
        return;
      }

      if(this.mfaCode === '' && this.mfaEnabled === true) {
        this.tipErrorMessage = 'Please enter a MFA code'
        this.mfaError = true;
        this.tipping = false;
        return;
      }

      try {
        const response = await this.$securedAxios({
          method: 'post',
          url: '/wallet/tip',
          data: {
            currency: this.selectedCurrency,
            amount: amount,
            tipTo: this.tipTo,
            network: this.selectedNetworkName,
            mfaCode: this.mfaCode
          }
        });
      
        if(response.status === 200) {
          if(response.data.success == false) {
            this.tipErrorMessage = response.data.errorMessage
            this.$toast.error(response.data.errorMessage);
          } else {
            this.$store.commit('walletDebit', {amount: amount, currency: this.selectedCurrency});
            this.$toast.success('Tip sending...');
            this.$emit('close');
          }
        } 
        else {
          this.tipErrorMessage = response.data.errorMessage
        }  
        this.tipping = false;
      }  
      catch(e) {
        this.tipErrorMessage = 'Tip error'
        this.tipping = false;
      }
    }
  }
});
</script>