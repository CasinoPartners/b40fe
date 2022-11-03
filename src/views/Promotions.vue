<template>
<div id="home-page" class="page content">
  <h2>Promotions</h2>
  <div class="promo-container">
    <div class="promo-card">
      <router-link to="/welcome-bonus">
        <img :src="themePath + '1stdeposit.jpg'">
        <p><span>150%</span> bonus up to <span>2 BTC</span> + <span>300</span> Free Spins</p>
      </router-link>
    </div>
    <div class="promo-card">
      <router-link to="/welcome-bonus">
        <img :src="themePath + '2nddeposit.jpg'">
        <p><span>100%</span> bonus up to <span>2 BTC</span> + <span>200</span> Free Spins</p>
      </router-link>
    </div>
    <div class="promo-card">
      <router-link to="/welcome-bonus">
        <img :src="themePath + '3rddeposit.jpg'">
        <p><span>100%</span> bonus up to <span>2 BTC</span> + <span>100</span> Free Spins</p>
      </router-link>
    </div>
    <div class="promo-card">
      <router-link to="/welcome-bonus">
        <img :src="themePath + '4thdeposit.jpg'">
        <p><span>100%</span> deposit bonus up to <span>2 BTC</span></p>
      </router-link>
    </div>
    <div class="promo-card">
      <router-link to="/pragmatic-drops-and-wins">
        <img :src="themePath + 'dropspromo.jpg'">
        <p>Tournament + Daily Drops <span>£1,000,000</span> per month</p>
      </router-link>
    </div>
  </div>
</div>
</template>

<style scoped>
h2, h3, h4 {
  color: #e0f2ff!important;
  font-family: FiraSans;
}

.page {
  margin: 0 auto;
max-width: 1200px;
padding: 0px;
min-height: 650px;
text-align: center;
}

.promo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.promo-card {
  width: 250px;
  margin-bottom: 40px;
}

.promo-card a {
  display: flex;
  flex-direction: column;
}

.promo-card img {
 border-top-left-radius: 10px;
  border-top-right-radius: 10px; 
}

.promo-card p {
  color: #909fbe;
background-color: #223651;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
padding: 10px 30px;
}

.promo-card span {
  color: #fff;
  font-weight: bold;
}

@media screen and (min-width: 600px) {
.promo-container{
  justify-content: left;
}

.promo-card {
  margin-right: 50px;
}
}

</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Promotions",
  data() {
    return {
      themePath: config.ThemePath
    }
  }
});
</script>