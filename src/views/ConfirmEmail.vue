<template>
<div id="home-page" class="page">
  <div v-if="showSuccess">
    <h2 class="success">Email confirmed</h2>
    <p>Your email address was confirmed</p>
  </div>
  <div v-if="showError">
    <h2 class="error">Error confirming email</h2> 
    <p>Please contact support for assistance</p>
  </div>
  <br>
  <router-link to="/">Return to homepage</router-link>
</div>
</template>

<style scoped>
.page {
  text-align: center;
  padding: 30px;
  height: 800px;
}

.success {
  color:#00dc9c;
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmEmail",
  data() {
    return {
      showError: false,
      showSuccess: false,
    }
  },
  async mounted() {
    await this.confirmEmail();
  },
  methods: {
    async confirmEmail() {
      var token = this.$route.query.token?.toString();
      var userId = this.$route.query.userId?.toString();

      if(token === undefined || userId === undefined) {
          this.showError = true;
          return;
      }

      var response = await this.$plainAxios.post('/user/confirm-email', {
        userId,
        token
      });

      if (response.status == 200) {
        this.showSuccess = true;
      } else {
        this.showError = true;
      }
    }
  }
});
</script>