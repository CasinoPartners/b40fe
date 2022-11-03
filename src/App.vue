<template>
  <div>
    <div v-if="isSplash" class="splash-main">
      <section class="splash-container">
        <!-- <img class="logo" :src="themePath + 'logo2.png'" :alt="domainName" /> -->
        Bet40.com
      </section>
    </div>
    <div v-if="!isSplash">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <i class="fa fa-bars side-menu-toggle is-hidden-mobile" @click.prevent="toggleMenu"/>
        <router-link to="/" class="navbar-item" style="color: #d81d1d;">
          <!-- <img class="logo" :class="loggedIn ? 'is-hidden-mobile' : ''" :src="themePath + 'logo2.png'" :alt="domainName" style="color:#fff;" /> -->
          <!-- <img v-if="loggedIn" class="mobile-logo" :class="loggedIn ? 'is-hidden-tablet' : ''" :src="themePath + 'favicon.png'" :alt="domainName" /> -->
          Bet40.com
        </router-link>    
      </div>

      <div class="navbar-menu">
        <div class="navbar-end" :class="loggedIn ? '' : 'logged-out-navbar-end'">
          <div class="navbar-item">
            <div v-if="!loggedIn" class="buttons">
              <a class="button is-inverse" @click.prevent="authModalCurrentTab = 'login'; authModalVisible = true;">Log in</a>
              <a class="button is-primary" @click.prevent="authModalCurrentTab = 'register'; authModalVisible = true;" style="margin-right:10px;">Register</a>
            </div>
            <div v-if="loggedIn" class="logged-in-nav">
                 <div class="balance-container" ref="dropdownMenu1">
                <span class="d-content" @click.prevent="balanceDropdownVisible = !balanceDropdownVisible">
                  <img :src="'/img/' + selectedCurrency.toLowerCase() + '.png'">
                  <p v-if="!hideBalance" style="font-weight:bold" v-html="balance"></p>
                  <p v-if="hideBalance">In Play</p>
                  <span class="dropdown-icon">v</span>
                  <button class="button is-primary wallet-button" @click.prevent="walletModalVisible = true;">Wallet</button>
                </span>
                <div v-if="balanceDropdownVisible" class="dropdown-menu">
                   <p class="control has-icons-left">
                    <input class="input search-box" v-model="searchedWalletValue" type="text" placeholder="Search">
                    <span class="icon is-small is-left">
                      <i class="fas fa-search"></i>
                    </span>
                  </p>
                  <div v-for="w in filteredWallets" class="dropdown-item" v-bind:key="w.id" @click.prevent="selectBalance(w.balance, w.symbol); balanceDropdownVisible = false">
                      <p>{{formatBalance(w.balance, w.exchangeRate)}}</p>
                    <div class="currency-info">
                      <img :src="'/img/' + w.symbol.toLowerCase() + '.png'">
                      {{w.symbol}}
                    </div>
                  </div>
                  <hr style="background-color: var(--second-bg-color);margin: 8px;"/>

                  <div class="field">
                    <input @click.prevent="toggleFiatDisplay" id="displayFiat" type="checkbox" v-model="fiatToggle">
                    <label id="displayFiatLabel" for="displayFiat">Display FIAT</label>
                  </div>

                  <div class="field">
                    <input @click.prevent="hideZeroBalances = !hideZeroBalances" id="hideZeroBalances" type="checkbox" v-model="hideZeroBalances">
                    <label id="hideZeroBalancesLabel" for="hideZeroBalances">Hide 0 balances</label>
                  </div>
                </div>
              </div>
               <div class="navbar-avtars">
              <img :src="themePath + 'avatar.png'" @click.prevent="accountDropdown = !accountDropdown" ref="dropdownMenuAccount"/>
              <img v-if="loggedIn" class="is-hidden-mobile" src="/img/chat.png" @click.prevent="toggleChat"/>
              <div class="account-options" v-if="accountDropdown">
                <div v-for="(item, index) in accountOptions" :key="index" @click.prevent="accountActions(item)">
                  {{item.name}}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav> 

    <router-view @hideChat="closeChat" @showBuyCrypto="if(loggedIn) {this.walletModalVisible = true; this.walletModalTab = 'buycrypto'} else { this.authModalVisible = true }" @showWallet="walletModalVisible = true;" @hideMenu="closeSideMenu" @showAuth="this.authModalVisible = true" @showReg="this.authModalCurrentTab = 'register';this.authModalVisible =true;" @showGameBlock="showGameBlock" />

    <div id="chat-panel" class="chat-panel" v-if="showChat && chatEnabled && loggedIn">
      <div class="chat-header is-hidden-tablet">
        <div class="chat-close" @click.prevent="closeChat">x</div>
      </div>
      <div id="chat-messages" class="chat-messages">
        <div v-for="msg in chatMessages" class="chat-message">
          <div class="chat-message-header">
            <p class="chat-username">{{msg.userName}}</p>
            <p class="chat-time">{{msg.date.split('T')[1].substring(0,5)}}</p>
          </div>
          <div class="chat-message-text" v-html="msg.content">
          </div>
        </div>
      </div>
      <div class="chat-controls">
        <form class="form" @submit.prevent="sendChatMessage">
          <input id="chat-input" class="input chat-input" v-model="chatMessage" autocomplete="off" placeholder="Enter message">
          <img class="chat-send-button" :src="themePath + 'send.png'" @click.prevent="sendChatMessage">
        </form>
      </div>
    </div>

    <aside id="side-menu" v-if="showSideMenu" class="side-menu">
      <div class="side-menu-close is-hidden-tablet" @click.prevent="closeSideMenu">x</div>
      <template v-for="section in sideMenu.Sections">
        
        <template v-for="link in section.Links">
          <a v-if="link.IsHeader" class="sub-header" :title="link.Title" :class="link.HasIcon ? 'with-icon' : ''">
            <img v-if="link.HasIcon" :src="link.IconUrl">{{link.Text}}
          </a>

          <router-link v-if="!link.IsHeader && link.IsRoute" :to="{name: link.RouteTo, params: link.RouteParams}" :title="link.Title" :class="[link.HasIcon ? 'with-icon' : '', link.IsSubMenu ? 'sub-menu' : '']">
            <img v-if="link.HasIcon" :src="link.IconUrl">{{link.Text}}
          </router-link>
        </template>   
        <hr>
      </template>
      <a href="#" class="with-icon" @click.prevent="closeSideMenuIfMobile(); affiliateModalVisible = true"><img :src="themePath + 'affiliate_icon.png'" alt="affiliates" />Affiliates</a>
      <a v-if="supportChatEnabled" href="#" class="with-icon" @click.prevent="closeSideMenuIfMobile(); openSupportChat()"><img :src="themePath + 'support_icon.png'" alt="live support" />Live Support</a>

    </aside>

    <footer>
      <div class="columns">
      <div class="column is-3 is-offset-2">

      <div class="footer-links">
        <a v-if="supportChatEnabled" href="#" @click.prevent="openSupportChat">Live Support</a>
        <a v-if="!supportChatEnabled" :href="'mailto:' + supportEmail">Support</a>
        <router-link to="/terms">Terms and Conditions</router-link>
        <router-link to="/responsible-gambling">Responsible Gaming</router-link>
        <router-link to="/self-exclusion">Self Exclusion</router-link>
        <router-link to="/disputes">Dispute Resolution</router-link>
        <router-link to="/aml">AML</router-link>
        <router-link to="/fair">Fairness & RNG Testing Methods</router-link>
        <router-link to="/privacy">KYC Policy, Privacy and Personal Data Management</router-link>
        <router-link to="/payouts">Account Payouts and Bonus</router-link>
        <router-link to="/bonus-terms">Bonus Terms and Conditions</router-link>
      </div>
      </div>
      <div class="column">
        <h4>Follow Us</h4>
        <div class="social-buttons">
          <a v-if="telegramLink != ''" :href="telegramLink" target="_blank"><i class="fa fa-telegram"/></a>
          <a v-if="twitterLink != ''" :href="twitterLink" target="_blank"><i class="fa fa-twitter"/></a>
          <a v-if="discordLink != ''" :href="discordLink" target="_blank"><i class="fab fa-discord"/></a>
          <a v-if="facebookLink != ''" :href="facebookLink" target="_blank"><i class="fa fa-facebook"/></a>
          <a v-if="instagramLink != ''" :href="instagramLink" target="_blank"><i class="fa fa-instagram"/></a>
          <a v-if="tikTokLink != ''" :href="tikTokLink" target="_blank"><i class="fab fa-tiktok"/></a>
        </div>
      </div>

      </div>
      <br>
      <div style="max-width:1000px;margin:0 auto;font-size:14px;">
      <p>Copyright ©2022, {{domainName}}. All rights reserved.</p>
      <br>
      <p>{{domainName}} is operated by R. Bostock Enterprises B.V. (reg. nr. 159489), Johan Van Walbeeckplein 24, Willemstad, Curaçao, and regulated under gaming license nr. 1668/JAZ issued to Curaçao eGaming, Authorized and Regulated by the Government of Curacao.</p>
      <br>
      <a :href="'https://verification.curacao-egaming.com/validateview.aspx?domain=' + domainName" target="_blank">
            <img :src="'https://verification.curacao-egaming.com/validate.ashx?domain=' + domainName" alt="" width="80" />
          </a>
          <br>
          <br>
      <p>Payments and financial transactions are processed by R. Bostock Enterprises Ltd (registration number HE 424401) of Annis Komninis, Soleas Court, 5th Floor, Office 502, 1060, Nicosia, Cyprus.</p>
      <br>
      <p>By accessing, or continuing to use or browse this website, you agree that we may use certain cookies to improve your experience with us. We only use cookies which will enhance your experience and which will not interfere with your privacy.</p>
      <br>
      <p>In order to register for this website, the user is required to accept the <router-link to="/terms">General Terms and Conditions</router-link>. In the event the General Terms and Conditions are updated, existing users may choose to discontinue using the products and services before the said update shall become effective, which is a minimum of two weeks after it has been announced.</p>
      </div>
    </footer>

    <div v-if="showMobileFooter" class="mobile-footer is-hidden-tablet">
      <div class="mobile-footer-button" @click.prevent="toggleMenu">Menu</div>
      <router-link style="color:#e0f2ff;" to="/">Games</router-link>
      <router-link v-if="sportsEnabled" style="color:#e0f2ff;" to="/sports">Sports</router-link>
      <a v-if="supportChatEnabled" style="color:#e0f2ff;" href="#" @click.prevent="openSupportChat">Support</a>
      <div v-if="chatEnabled && loggedIn" class="mobile-footer-button" @click.prevent="toggleChat">Chat</div>
    </div>

    <AuthModal v-if="authModalVisible" :tab="authModalCurrentTab" @close="authModalVisible = false" />
    <WalletModal v-if="walletModalVisible" :tab="walletModalTab" @close="walletModalVisible = false" />
    <AccountModal v-if="accountModalVisible" :tab="accountModalTab" @close="accountModalVisible = false" />
    <GameBlockedModal v-if="gameBlockedModalVisible" @close="gameBlockedModalVisible = false" :msg="gameBlockedMessage" />
    <AffiliateModal v-if="affiliateModalVisible" :tab="overview" @close="affiliateModalVisible = false" />
  </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
const AuthModal = defineAsyncComponent(() => import('@/components/AuthModal.vue'))
const WalletModal = defineAsyncComponent(() => import("@/components/WalletModal.vue"));
const AffiliateModal = defineAsyncComponent(() => import("@/components/AffiliateModal.vue"));
const AccountModal = defineAsyncComponent(() => import("@/components/AccountModal.vue"));
const GameBlockedModal = defineAsyncComponent(() => import("@/components/GameBlockedModal.vue"));
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export default defineComponent({
  name: "App",
  components: {
    AuthModal,
    WalletModal,
    GameBlockedModal,
    AccountModal,
    AffiliateModal
  },
  computed: {
    ...mapGetters(['loggedIn', 'username', 'jwt', 'hideBalance', 'wallets', 'selectedCurrency', 'displayFiat', 'chatMessages', 'email', 'supportChatId']),
    balance() {
      for(var i = 0; i < this.wallets.length; i++)
      {
        if(this.wallets[i].symbol === this.selectedCurrency) {
          if(this.displayFiat) {
            return '$' + (this.wallets[i].balance * this.wallets[i].exchangeRate).toFixed(2);
          }
          const values = /^([0-9]+\.?[0-9]*?)(0*)$/.exec(this.wallets[i].balance.toFixed(8)+'');
          return values[1]+`<span style="opacity:0.5">${values[2]}</span>`;
        }
      }
      return 0;
    },
    filteredWallets() {
      if(this.hideZeroBalances) {
        return this.wallets.filter(w => w.balance > 0);
      }
      return this.wallets.filter(val => val.symbol.toLowerCase().includes(this.searchedWalletValue.toLowerCase()));
    }
  },
  watch: {
    jwt() {
      this.$socket.start(this.jwt); // TODO move to store
      this.$socket.setToast(this.$toast);
    },
    $route (to, from){
      if(to.name == 'Sports') {
        this.showMobileFooter = false;
      } else {
      this.showMobileFooter = true;
      }

      if(this.isMobile()) {
        this.closeSideMenu();
      }
    }
  },
  data() {
    return {
      searchedWalletValue: '',
      isSplash: false,
      authModalVisible: false,
      authModalCurrentTab: 'login',
      walletModalVisible: false,
      affiliateModalVisible: false,
      walletModalTab: 'deposit',
      balanceDropdownVisible: false,
      fiatToggle: true,
      hideZeroBalances: false,
      gameBlockedModalVisible: false,
      gameBlockedMessage: '',
      accountModalVisible: false,
      accountModalTab: 'profile',
      showSideMenu: true,
      chatMessage: '',
      showChat: true,
      domainName: config.DomainName,
      discordLink: config.DiscordLink,
      telegramLink: config.TelegramLink,
      twitterLink: config.TwitterLink,
      facebookLink: config.FacebookLink,
      instagramLink: config.InstagramLink,
      tikTokLink: config.TikTokLink,
      supportEmail: config.SupportEmail,
      logoUrl: config.LogoUrl,
      mobileLogoUrl: config.MobileLogoUrl,
      sideMenu: config.SideMenu,
      themePath: config.ThemePath,
      sportsEnabled: config.SportsEnabled,
      chatEnabled: config.ChatEnabled,
      supportChatEnabled: config.SupportEnabled,
      showMobileFooter: true,
      accountDropdown: false,
      accountOptions: [
        {
          action: 'modal',
          name: 'Wallet',
          url: null
        },
         {
          url: null,
          name: 'Account',
          action: 'modal'
        },
         {
          url: '/vip',
          name: 'VIP',
          action: 'url'
        },
         {
          url: null,
          name: 'Bonuses',
          action: 'modal,'
        },
         {
          url: null,
          name: 'Promo Code',
          action: 'modal'
        }, {
          url: null,
          name: 'Affiliate',
          action: 'modal'
        },
         {
          url: null,
          name: 'Transactions',
          action: 'modal'
        }, {
          url: null,
          name: 'Live Support',
          action: 'modal'
        }, 
        {
          url: null,
          name: 'Logout',
          action: 'logout'
        }
      ]
    }
  },
  created () {
    document.addEventListener('click', this.documentClick)

    // TODO Get rid of this hack! Should not need to have app on the window 
    // @ts-expect-error
    window.$_app = this;
  },
  destroyed () {
    document.removeEventListener('click', this.documentClick)
  },
  methods: {
    showGameBlock(msg)
    {
      this.gameBlockedModalVisible = true;
      this.gameBlockedMessage = msg;
    },
     async accountActions(item) {
      if(item.url) {
        this.$router.push(item.url)
      }
      else {
       if(item.name == 'Wallet'){
        this.walletModalTab= 'deposit',
        this.walletModalVisible = true;
       }
       if(item.name == 'Account') {
        this.accountModalVisible = true;
       }
       if(item.name == 'Promo Code'){
        this.walletModalTab= 'promocode',
        this.walletModalVisible = true;
       }
       if(item.name == 'Bonuses'){
        this.walletModalTab= 'bonuses',
        this.walletModalVisible = true;
       }
       if(item.name == 'Affiliate'){
        this.affiliateModalVisible = true;
       }
       if(item.name == 'Transactions'){
        this.accountModalVisible = true;
        this.accountModalTab = 'transactions';
       }
       if(item.name == 'Live Support'){
        this.openSupportChat();
       }
       if(item.name == 'Logout') {
        await this.logout();
       }
      }
    },
    async logout() {
      this.$store.commit("logout");
    },
    openSupportChat() {
      if(this.loggedIn) {
        Intercom('boot', {
          app_id: config.IntercomAppId,
          hide_default_launcher: true,
          email: this.email,
          name: this.username,
          user_id: this.supportChatId
        });
      } else {
        Intercom('boot', {
          app_id: config.IntercomAppId,
          hide_default_launcher: true,
        });
      }
      Intercom('show');
    },
    getStyle(id, name)
    {
        var element = document.getElementById(id);
        return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
    },
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    toggleChat() {
      var style = this.getStyle('chat-panel', 'display');
      if(style != 'flex') {
        document.getElementById('chat-panel').style.setProperty("display", "flex", "important");        
      } else {
        document.getElementById('chat-panel').style.setProperty("display", "none", "important");
      }
    },
    toggleMenu() {
      var style = this.getStyle('side-menu', 'display');
      if(style != 'block') {
        document.getElementById('side-menu').style.setProperty("display", "block", "important");
      } else {
        document.getElementById('side-menu').style.setProperty("display", "none", "important");
      }
    },
    closeSideMenu() {
      try {
        document.getElementById('side-menu').style.setProperty("display", "none", "important");
      } catch {
      }
      
    },
    closeSideMenuIfMobile() {
      if(this.isMobile()) {
        this.closeSideMenu();
      }
    },
    closeChat() {
      try {
        document.getElementById('chat-panel').style.setProperty("display", "none", "important");
      } catch{

      }
    },
    sendChatMessage() {
      this.$socket.sendChatMessage(this.chatMessage);
      this.chatMessage = '';
    },
    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    setCookie(name, value) {
      const d = new Date();
      d.setTime(d.getTime() + 28 * 24 * 60 * 60 * 1000);
      const expires = "expires=" + d.toUTCString();
      var domainName = window.location.hostname;
      document.cookie = name + "=" + value + ";" + expires + ";path=/;secure;domain=." + domainName;
    },
    documentClick(e) {
      // TODO refactor this!
      var el2 = this.$refs.dropdownMenu1;
      if (el2 != undefined && ( el2 !== e.target) && !el2.contains(e.target)) {
        if(e.target.id !== 'displayFiat' && e.target.id !== 'displayFiatLabel' && e.target.id !== 'hideZeroBalances' && e.target.id !== 'hideZeroBalancesLabel' )
        {
          this.balanceDropdownVisible =false;
        }
      }

      let dropdownMenuAccount = this.$refs.dropdownMenuAccount;
      if (dropdownMenuAccount != undefined && ( dropdownMenuAccount !== e.target) && !dropdownMenuAccount.contains(e.target)) {
          this.accountDropdown =false;
      }
    },
    roundDown(x, n) {
      return Math.floor(x * Math.pow(10, n) + 1e-6) / Math.pow(10, n);
    },
    formatBalance(balance, exchangeRate) {
      if(this.displayFiat) {
        return '$' + Number(this.roundDown(balance * exchangeRate, 8)).toFixed(2);
      }
      return Number(this.roundDown(balance, 8)).toFixed(8);
    },
    selectBalance(balance, currency) {
      this.$store.commit('setSelectedCurrency', currency);
    },
    toggleFiatDisplay() {
      this.$store.commit('setDisplayFiat', !this.displayFiat);
    }
  },
  async mounted() {
    var cookie = this.getCookie('elr');
    if(cookie != '') {
      this.$store.commit('login', JSON.parse(cookie));
      document.cookie = "elr=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else {
      await this.$store.commit("loginFromStorage");
    }

    var savedCurrency = localStorage.getItem('selectedCurrency');
    if(savedCurrency != null)
    {
      this.$store.commit('setSelectedCurrency', savedCurrency);
    }
    

    try {
      this.$socket.start(this.jwt); // TODO best place?

    } catch (error) {
    }

    var params = new URLSearchParams(window.location.search);
    if (params.has("r")) {
      this.setCookie("ref", params.get("r"));
    }

    var cookie2 = this.getCookie('defaultcurrencyid');
    if(cookie2 == '') {
      this.setCookie("defaultcurrencyid", uuidv4());
    }

    try {
      FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        this.setCookie("defaultsettingsid", result.visitorId);
      });
    } catch (error) {
      
    }
    
    setTimeout(() => {
      this.isSplash = false;
    }, 1500);


  }
});

</script>