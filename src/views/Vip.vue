<template>
  <div id="home-page" class="page content">
    <img class="is-hidden-mobile" style="border-radius:10px" :src="themePath + 'vip_banner_page.png'" />
    <img class="is-hidden-tablet" style="border-radius:10px" :src="themePath + 'vipbanner.png'" />

    <div v-if="loggedIn">
      <div
        v-if="vipLevel != null"
        style="
          background-color: #021025;
          border-radius: 10px;
          padding: 10px;
          display: flex;
          margin-bottom: 40px;
        "
      >
        <p style="width: 30%; margin: 0">Level: {{ vipLevel.currentLevel }}</p>
        <p style="display: flex; align-items: center; width: 80%">
          ${{ roundDown(vipLevel.wagerThisLevel, 2)
          }}<progress
            style="
              width: 90%;
              margin: 0 auto;
              margin-left: 10px;
              margin-right: 10px;
            "
            class="progress is-primary"
            :value="
              roundDown(vipLevel.wagerThisLevel / vipLevel.wagerToNextLevel, 2) * 100
            "
            max="100"
          ></progress
          >${{ roundDown(vipLevel.wagerToNextLevel, 2) }}
        </p>
      </div>

      <div
        style="
          background-color: #021025;
          border-radius: 10px;
          padding: 10px;
          width: 50%;
          text-align: center;
          margin-bottom: 40px;
        "
      >
        <p v-if="rakeback.length > 0">Rakeback Available</p>
        <table class="bets-table" v-if="rakeback.length > 0">
          <thead>
            <td>Currency</td>
            <td>Amount</td>
          </thead>
          <tbody v-for="r in rakeback">
            <tr>
              <td>
                <img :src="'/img/' + r.currency.toLowerCase() + '.png'" />
              </td>
              <td>{{ r.available.toFixed(8) }}</td>
            </tr>
          </tbody>
        </table>
        <button
          v-if="rakeback.length > 0"
          @click.prevent="claimRakeback()"
          class="button is-primary"
        >
          Claim
        </button>
        <p v-if="rakeback.length == 0">No rakeback available</p>
      </div>
    </div>

    <section class="vip-offer-view">
      <div class="vip-offer-icon">
        <img :src="themePath + 'vip_offer_icon.png'" />
      </div>
      <div class="vip-offer-info">
        <div class="vip-offer-info-head">
          <div class="vip-head-1">Join the Shark VIP Club today and receive the best VIP service across the Seas!</div>
        </div>
        <div class="vip-info-offer-des">
          <p>
            At Shark VIP Club we care about our Sharks.  You will receive the biggest bonuses and rewards available.  When opening your account you’ll hit the Green Laternshark level, then can you make it all the way to become the monster Megalodon and earn the ultimate rewards!
          </p>
        </div>
      </div>
    </section>

    <section class="vip-cards">
      <img :src="themePath + 'vipcard1.png'"/>
      <img :src="themePath + 'vipcard2.png'"/>
      <img :src="themePath + 'vipcard3.png'"/>
      <img :src="themePath + 'vipcard4.png'"/>
      <img :src="themePath + 'vipcard5.png'"/>
      <img :src="themePath + 'vipcard6.png'"/>
    </section>

    <div class="vip-level">
      <div class="vip-heading">OUR <span>LEVELS</span></div>
      <span class="btnLeft" @click.prevent="scrollLeft('scrollLevels')"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z"
          /></svg
      ></span>
      <div ref="scrollLevels" class="vip-level-cards">
        <div class="vip-level-card">
          <div class="level-icon">
            <img :src="themePath + 'vip_level_icon1.png'" style="max-width:200px;" />
          </div>
          <div class="level-name">Green Lanternshark</div>
          <div class="level-info">
            <div class="level-value">$0</div>
            <div class="value-key">Wager required</div>
          </div>
          <div class="level-info">
            <div class="level-value">5%</div>
            <div class="value-key">Rakeback</div>
          </div>
          <div class="level-info">
            <div class="level-value">10-20%</div>
            <div class="value-key">Daily Cashback</div>
          </div>
          <div class="level-info">
            <div class="level-value">-</div>
            <div class="value-key">Level up bonus</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon">
            <img :src="themePath + 'vip_level_icon2.png'" style="max-width:200px;" />
          </div>
          <div class="level-name">Zebra Shark</div>
          <div class="level-info">
            <div class="level-value">$1,000</div>
            <div class="value-key">Wager required</div>
          </div>
          <div class="level-info">
            <div class="level-value">7%</div>
            <div class="value-key">Rakeback</div>
          </div>
          <div class="level-info">
            <div class="level-value">10-20%</div>
            <div class="value-key">Daily Cashback</div>
          </div>
          <div class="level-info">
            <div class="level-value">$5</div>
            <div class="value-key">Level up bonus</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon">
            <img :src="themePath + 'vip_level_icon3.png'" style="max-width:200px;" />
          </div>
          <div class="level-name">Leopard Shark</div>
          <div class="level-info">
            <div class="level-value">$10,000</div>
            <div class="value-key">Wager required</div>
          </div>
          <div class="level-info">
            <div class="level-value">8%</div>
            <div class="value-key">Rakeback</div>
          </div>
          <div class="level-info">
            <div class="level-value">10-20%</div>
            <div class="value-key">Daily Cashback</div>
          </div>
          <div class="level-info">
            <div class="level-value">$20</div>
            <div class="value-key">Level up bonus</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon">
            <img :src="themePath + 'vip_level_icon4.png'" style="max-width:200px;" />
          </div>
          <div class="level-name">Lemon Shark</div>
          <div class="level-info">
            <div class="level-value">$50,000</div>
            <div class="value-key">Wager required</div>
          </div>
          <div class="level-info">
            <div class="level-value">9%</div>
            <div class="value-key">Rakeback</div>
          </div>
          <div class="level-info">
            <div class="level-value">10-20%</div>
            <div class="value-key">Daily Cashback</div>
          </div>
          <div class="level-info">
            <div class="level-value">$50</div>
            <div class="value-key">Level up bonus</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon">
            <img :src="themePath + 'vip_level_icon5.png'" style="max-width:200px;" />
          </div>
          <div class="level-name">Blacktip Shark</div>
          <div class="level-info">
            <div class="level-value">$250,000</div>
            <div class="value-key">Wager required</div>
          </div>
          <div class="level-info">
            <div class="level-value">10%</div>
            <div class="value-key">Rakeback</div>
          </div>
          <div class="level-info">
            <div class="level-value">10-20%</div>
            <div class="value-key">Daily Cashback</div>
          </div>
          <div class="level-info">
            <div class="level-value">$250</div>
            <div class="value-key">Level up bonus</div>
          </div>
          <div class="level-info">
            <div class="level-value">YES</div>
            <div class="value-key">Exclusive Promos</div>
          </div>
          <div class="level-info">
            <div class="level-value">YES</div>
            <div class="value-key">VIP Account Management</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon">
            <img :src="themePath + 'vip_level_icon6.png'" style="max-width:200px;" />
          </div>
          <div class="level-name">Tiger Shark</div>
          <div class="level-info">
            <div class="level-value">$1,000,000</div>
            <div class="value-key">Wager required</div>
          </div>
          <div class="level-info">
            <div class="level-value">12%</div>
            <div class="value-key">Rakeback</div>
          </div>
          <div class="level-info">
            <div class="level-value">10-20%</div>
            <div class="value-key">Daily Cashback</div>
          </div>
          <div class="level-info">
            <div class="level-value">$1,000</div>
            <div class="value-key">Level up bonus</div>
          </div>
          <div class="level-info">
            <div class="level-value">YES</div>
            <div class="value-key">Exclusive Promos</div>
          </div>
          <div class="level-info">
            <div class="level-value">YES</div>
            <div class="value-key">VIP Account Management</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon">
            <img :src="themePath + 'vip_level_icon7.png'" style="max-width:200px;" />
          </div>
          <div class="level-name">Great White</div>
          <div class="level-info">
            <div class="level-value">$5,000,000</div>
            <div class="value-key">Wager required</div>
          </div>
          <div class="level-info">
            <div class="level-value">16%</div>
            <div class="value-key">Rakeback</div>
          </div>
          <div class="level-info">
            <div class="level-value">10-20%</div>
            <div class="value-key">Daily Cashback</div>
          </div>
          <div class="level-info">
            <div class="level-value">$5,000</div>
            <div class="value-key">Level up bonus</div>
          </div>
          <div class="level-info">
            <div class="level-value">YES</div>
            <div class="value-key">Exclusive Promos</div>
          </div>
          <div class="level-info">
            <div class="level-value">YES</div>
            <div class="value-key">VIP Account Management</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon">
            <img :src="themePath + 'vip_level_icon8.png'" style="max-width:200px;" />
          </div>
          <div class="level-name">Megalodon</div>
          <div class="level-info">
            <div class="level-value">$10,000,000</div>
            <div class="value-key">Wager required</div>
          </div>
          <div class="level-info">
            <div class="level-value">20%</div>
            <div class="value-key">Rakeback</div>
          </div>
          <div class="level-info">
            <div class="level-value">20%</div>
            <div class="value-key">Daily Cashback</div>
          </div>
          <div class="level-info">
            <div class="level-value">$10,000</div>
            <div class="value-key">Level up bonus</div>
          </div>
          <div class="level-info">
            <div class="level-value">YES</div>
            <div class="value-key">Exclusive Promos</div>
          </div>
          <div class="level-info">
            <div class="level-value">YES</div>
            <div class="value-key">VIP Account Management</div>
          </div>
        </div>
      </div>
      <span class="btnRight" @click.prevent="scrollRight('scrollLevels')"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z"
          /></svg
      ></span>
    </div>

    <div class="vip-daily-cashback">
      <div class="vip-heading">DAILY <span>CASHBACK</span></div>
      <span class="btnLeft" @click.prevent="scrollLeft('scrollCashback')"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z"
          />
        </svg>
      </span>
      <div ref="scrollCashback" class="vip-level-cards">
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$20-$499</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">10%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$500-$699</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">11%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$700-$799</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">12%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$800-$999</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">13%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$1000-$1499</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">14%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$1500-$1999</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">15%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$2000-$2499</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">16%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$2500-$3499</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">17%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$3500-$3999</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">18%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$4000-$4999</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">19%</div>
          </div>
        </div>
        <div class="vip-level-card">
          <div class="level-icon"><img :src="themePath + 'coins.png'" /></div>
          <div class="level-info">
            <div class="value-key">Deposit Amount</div>
            <div class="level-value deposit-amount">$5000+</div>
          </div>
          <div class="level-info">
            <div class="value-key">Cashback</div>
            <div class="level-value">20%</div>
          </div>
        </div>
      </div>
      <span class="btnRight" @click.prevent="scrollRight('scrollCashback')"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M10,20A10,10,0,1,0,0,10,10,10,0,0,0,10,20ZM8.711,4.3l5.7,5.766L8.7,15.711,7.3,14.289l4.289-4.242L7.289,5.7Z"
          />
        </svg>
      </span>
    </div>
    <section class="join-vip-text">
      <p>
        Cashback is only credited if the players real money loss, excluding
        bonus losses, from the previous day is $10 or more.
      </p>
      <p>
        Cashback bonuses must be wagered 3x the total deposit amount in the
        previous day.
      </p>
      <p>
        Higher VIP levels may not have wager requirements at the casinos
        discretion.
      </p>
    </section>
    <section v-if="!loggedIn" class="join-vip">
      <a class="button is-primary" @click.prevent="$emit('showAuth')">Join Now!</a>
    </section>
  </div>
</template>

<style scoped>
h2,
h3,
h4 {
  color: #e0f2ff !important;
  font-family: FiraSans;
}

.page {
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  min-height: 650px;
}

.bets-table thead td {
  color: #dbdbdb;
}

.bets-table img {
  width: 26px;
  height: 26px;
}
</style>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "VIP",
  computed: {
    ...mapGetters(["loggedIn"]),
  },
  data() {
    return {
      vipLevel: null,
      rakeback: [],
      themePath: config.ThemePath,
    };
  },
  async mounted() {
    await this.loadVip();
  },
  methods: {
    scrollLeft(reference) {
      const ref = this.$refs[reference]
       ref.scrollTo({
      left: ref.scrollLeft -= 240,
      behavior: 'smooth',
    })
    },

    scrollRight (reference) {
      const ref = this.$refs[reference]
      ref.scrollTo({
      left: ref.scrollLeft += 240,
      behavior: 'smooth',
    })
    },
    roundDown(x, n) {
      return Math.floor(x * Math.pow(10, n) + 1e-6) / Math.pow(10, n);
    },
    async loadVip() {
      const response = await this.$securedAxios({
        method: "get",
        url: "/bonuses/get-vip",
      });

      if (response.status == 200) {
        this.vipLevel = response.data.vipLevel;
        this.rakeback = response.data.rakeback;
      }
    },
    async claimRakeback() {
      const response = await this.$securedAxios({
        method: "post",
        url: "/bonuses/claim-rakeback",
      });

      if (response.data.error == undefined) {
        this.$toast.success("Claiming Rakeback...");
      } else {
        this.$toast.error(response.data.error);
      }
    },
  },
});
</script>