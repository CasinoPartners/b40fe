<template>
<div class="modal" @click.self="$emit('close')">
  <div class="modal-content">
    <div class="close-modal" @click.self="$emit('close')">X</div>
    <br>
    <div v-if="msg == 'Country blocked'">
      <p>Game not available in your country.</p>
      <br>
      <p>If you are using a VPN please disable it and try again.</p>
    </div>
    <div v-if="msg != 'Country blocked'">
      <p>Game not available</p>
      <br>
      <p>Error Message: {{msg}}</p>
    </div>
  </div>
</div>  
</template>

<style scoped>
.modal-content {
  width: 350px;
padding: 20px;
height: 180px;
font-size: 18px;
}
</style>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameBlockedModal',
  props: ['msg'],

});
</script>