<template>
<div id="home-page" class="page">
  <div class="modal-content">
    <div v-if="showSuccess">
    <h2 class="success">Password Reset</h2>
    <p>Your password was reset. <router-link to="/">Return to homepage</router-link> to login.</p>
  </div>
  <div v-if="showError">
    <h2 class="error">Error resetting password</h2> 
    <p>Please contact support for assistance</p>
    <router-link to="/">Return to homepage</router-link>
  </div>

    <h2 v-if="!showSuccess && !showError">Reset Password</h2>
  <form v-if="!showSuccess && !showError" class="form auth-form" @submit.prevent="submitForm">
    <label>Email <span class="error" v-if="emailError">*</span></label>
    <input id="email" class="input" v-model="email" autocomplete="off" placeholder="Email Address">

    <label>New Password <span class="error" v-if="passwordError">*</span></label>
    <input id="password" class="input" type="password" v-model="password" autocomplete="off" placeholder="Password">

    <button type="submit" class="button is-primary login-button">Submit</button>
  </form>
  </div>
</div>
</template>

<style scoped>
.page {
  padding: 30px;
  height: 800px;
}

.success {
  color:#00dc9c;
}

.modal-content {
  padding: 20px;
  max-width: 750px;
}
</style>

<script>
import { defineComponent } from "vue";
import { mapGetters } from 'vuex'

export default defineComponent({
  name: "ResetPassword",
  data() {
    return {
      showError: false,
      showSuccess: false,
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      errorMessage: ''
    }
  },
  async mounted() {
  },
  methods: {
    validate() {
      this.emailError = false;
      this.passwordError = false;
      this.errorMessage = '';

      if(this.password.length < 8) {
        this.passwordError = true;
        this.errorMessage = 'Password must be > 8 characters';
      }

      if(this.email === '') {
        this.emailError = true;
        this.errorMessage = 'Email address required';
      }

      if(this.email !== '' && this.email.indexOf('@') === -1 ){
        this.emailError = true;
        this.errorMessage = 'Invalid email address';
      }

      if(this.passwordError || this.emailError || this.errorMessage !== '')
      {
        return false;
      }
      return true;
    },
    async submitForm() {
      if(!this.validate()) return;

      var token = this.$route.query.token?.toString();

      if(token === undefined) {
          this.showError = true;
          return;
      }

      try {
        var response = await this.$plainAxios.post('/user/reset-password', {
          email: this.email,
          password: this.password,
          token
        });

        if (response.status == 200) {
          this.showSuccess = true;
        } else {
          this.showError = true;
        }
      } catch (error) {
          this.showError = true;
      }
    }
  }
});
</script>