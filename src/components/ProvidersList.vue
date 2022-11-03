<template>
<div class="providers-list">
  <div class="provider-header">
    <h2>Our <span>Providers</span></h2>
  </div>
  <div class="provider-row is-hidden-mobile">
    <div class="provider"><router-link :to="'/games/lobby/Pragmatic Play'"><img src="/img/pragmatic.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Hacksaw'"><img src="/img/hacksaw.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Nolimit City'"><img src="/img/nolimit.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Wazdan'"><img src="/img/wazdan.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/BGaming'"><img src="/img/bgaming.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Thunderkick'"><img src="/img/thunderkick.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Quickspin'"><img src="/img/quickspin.png"></router-link></div>
  </div>
  <div class="provider-row is-hidden-mobile">
    <div class="provider"><router-link :to="'/games/lobby/Evolution'"><img src="/img/evolution.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Play\'n Go'"><img src="/img/playngo.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Spribe'"><img src="/img/spribe.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Platipus'"><img src="/img/platipus.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Habanero'"><img src="/img/habanero.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Evoplay'"><img src="/img/evoplay.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Belatra'"><img src="/img/belatra.png"></router-link></div>
  </div>

  <div class="provider-row is-hidden-tablet is-hidden-desktop">
    <div class="provider"><router-link :to="'/games/lobby/Pragmatic Play'"><img src="/img/pragmatic.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Hacksaw'"><img src="/img/hacksaw.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Play\'n Go'"><img src="/img/playngo.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Nolimit City'"><img src="/img/nolimit.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Wazdan'"><img src="/img/wazdan.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/BGaming'"><img src="/img/bgaming.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Thunderkick'"><img src="/img/thunderkick.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Spribe'"><img src="/img/spribe.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Quickspin'"><img src="/img/quickspin.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Evolution'"><img src="/img/evolution.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Platipus'"><img src="/img/platipus.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Habanero'"><img src="/img/habanero.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Evoplay'"><img src="/img/evoplay.png"></router-link></div>
    <div class="provider"><router-link :to="'/games/lobby/Belatra'"><img src="/img/belatra.png"></router-link></div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>