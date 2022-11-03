<template>
<div class="modal" @click.self="$emit('close')">
  <div :class="`modal-content ${ currentTab === 'register' ? 'register-modal' : 'login-modal'}`">
      <div class="columns">
        <div class="column left-column" v-if="!showForgetPasswordForm">
          <div class="close-modal" @click.self="$emit('close')">X</div>
          <div :class="`switch-container ${ currentTab === 'register' ? 'switch-register' : ''}`">
            <button :class="`button ${ currentTab === 'login' ? 'highlight' : ''}`" @click.prevent="currentTab = 'login'">Login</button>
            <button :class="`button ${ currentTab === 'register' ? 'highlight' : ''}`" @click.prevent="currentTab = 'register'">Register</button>
          </div>

          <p class="error" v-if="errorMessage !== ''">{{errorMessage}}</p>
          <form class="form auth-form" @submit.prevent="submitForm">
            <div class="align-left">
              <label>Username <span class="error" v-if="usernameError">*</span></label>
              <input id="username" class="input" v-model="username" autocomplete="off" placeholder="Username">

              <label v-if="currentTab==='register'">Email Address</label>
              <input v-if="currentTab==='register'" id="email" class="input" v-model="email" autocomplete="off" placeholder="Email Address">
              
              <label>Password <span class="error" v-if="passwordError">*</span></label>
              <input id="password" class="input" type="password" v-model="password" autocomplete="off" placeholder="Password">

              <label v-if="mfaRequired && currentTab==='login'">MFA Code Required <span class="error" v-if="mfaError">*</span></label>
              <input v-if="mfaRequired && currentTab==='login'" id="mfaCode" type="text" v-model="mfaCode" autocomplete="off">
              
              <label v-if="currentTab==='register'">Date of Birth</label>
              <div class="dob-container">
              <input v-if="currentTab==='register'" id="dob-day" class="input" v-model="dobDay" autocomplete="off" type="number" placeholder="DD">
              <input v-if="currentTab==='register'" id="dob-month" class="input" v-model="dobMonth" autocomplete="off" type="number" placeholder="MM">
              <input v-if="currentTab==='register'" id="dob-year" class="input" v-model="dobYear" autocomplete="off" type="number" placeholder="YYYY">
              </div>

              <div v-if="currencySelectOnRegister">
                <label v-if="currentTab==='register'">Betting Currency <span v-if="showCryptoMessageOnRegister" style="font-size:12px;"> - Crypto deposits also available</span></label>
                <div v-if="currentTab==='register'" class="currency-selector" @click.prevent="betCurrencyMenuVisble = !betCurrencyMenuVisble" @blur="betCurrencyMenuVisble = false" ref="dropdownMenu">
                  <span>
                  <div>
                    {{bettingCurrency}}
                  </div>
                  <i class="down-arrow"></i>
                  </span>
                  <div v-if="betCurrencyMenuVisble" class="dropdown-menu">
                    <div @click.prevent="bettingCurrency='USD'">
                      USD
                    </div>
                    <div @click.prevent="bettingCurrency='EUR'">
                      EUR
                    </div>
                    <div @click.prevent="bettingCurrency='GBP'">
                      GBP
                    </div>
                  </div>
                </div>
              </div>

              <input v-if="currentTab==='register'" id="promo-code" class="input" v-model="promoCode" autocomplete="off" placeholder="Promo Code (optional)">

              <div v-if="currentTab==='register'" class="checkbox" style="margin-bottom:20px;display:flex;">              
                <label class="checkbox"><input id="termsAgree" type="checkbox" v-model="termsAgreee"> By ticking this box in order to register for this website, the user declares to have read, understood and accepted the <router-link to="/terms"><span  @click.self="$emit('close')">General Terms and Conditions</span></router-link>.</label>
              </div>
              <div v-if="currentTab==='login'" class="checkbox">
                <label>By accessing the site I confirm that I am 18 years or older and that I agree to the <router-link to="/terms"><span  @click.self="$emit('close')">Terms of Service</span></router-link></label>
              </div>

            </div>
            <button v-if="currentTab==='login'" type="submit" class="button is-primary login-button">Login</button>
            <button v-if="currentTab==='register'" type="submit" class="button is-primary">Sign Up</button>
          </form>

          <div v-if="externalLoginEnabled" style="margin:5px;">
            <p style="font-size:14px;">Or login with</p>
            <button style="font-size:30px;color:#e0f2ff;background:none;border:none;cursor:pointer;" @click.prevent="twitterLogin()"><i class="fa fa-twitter"/></button>
          </div>
          
          <br v-if="currentTab==='login'">
          <a v-if="currentTab==='login'" @click.self="showForgetPasswordForm=true" style="font-family:FiraSans-SemiBold;">Forgot Password?</a>
          <br v-if="currentTab==='login'">
          <br>

            <p v-if="currentTab==='login'" style="font-family: FiraSans-Medium">Don't have an account? <a href="#" @click.self="currentTab = 'register'">Sign up</a></p>
            <p v-if="currentTab==='register'" style="font-family: FiraSans-Medium">Already have an account? <a href="#" @click.self="currentTab = 'login'">Log in</a></p>
          <br>
        </div>
        <div class="column left-column" v-if="showForgetPasswordForm">
          <div class="close-modal" @click.self="$emit('close')">X</div>
          <br>
          <div class="forget-password-form">
           <p v-if="!forgetPasswordForm.showSuccess">Enter your email address to receive a link to reset your password</p>
          <p class="error" v-if="forgetPasswordForm.errorMessage !== ''">{{forgetPasswordForm.errorMessage}}</p>

          <p class="success" v-if="forgetPasswordForm.showSuccess">Please check your email to reset your password.</p>

          <form v-if="!forgetPasswordForm.showSuccess" class="form auth-form" @submit.prevent="submitForgetPasswordForm">
            <div class="align-left">
              <input id="forgetpasswordformemail" class="input" v-model="forgetPasswordForm.email" autocomplete="off" placeholder="Email Address">
            </div>
            <button type="submit" class="button is-primary login-button">Submit</button>
          </form>
          <a @click.self="showForgetPasswordForm=false; forgetPasswordForm.showSuccess=false" style="font-family:FiraSans-SemiBold;">Back to Login</a>
          <br>
          </div>

        </div>
        <!-- <div class="column is-hidden-mobile" style="display:flex;">
          <img :src="themePath + 'modalbg.jpg'" style="border-radius:0 10px 10px 0px;" />
        </div> -->
      </div>
  </div>
</div>  
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthModal',
  props: ['tab'],
  data() {
    return {
      showForgetPasswordForm: false,
      forgetPasswordForm: {
        email: null,
        emailError: false,
        errorMessage: '',
        showSuccess: false
      },
      currentTab: this.tab,
      username: '',
      email: '',
      promoCode: '',
      termsAgreee: false,
      emailError: false,
      password: '',
      usernameError: false,
      passwordError: false,
      errorMessage: '',
      externalLoginEnabled: config.ExternalLoginsEnabled,
      themePath: config.ThemePath,
      dobDay: '',
      dobMonth: '',
      dobYear: '',
      bettingCurrency: 'USD',
      betCurrencyMenuVisble: false,
      currencySelectOnRegister: config.CurrencySelectOnRegister,
      showCryptoMessageOnRegister: config.ShowCryptoMessageOnRegister,
      mfaRequired: false,
      mfaCode: ''
    }
  },
  methods: {
    validate() {
      this.emailError = false;
      this.usernameError = false;
      this.passwordError = false;
      this.errorMessage = '';

      if(this.username === '') {
        this.usernameError = true;
      }

      if(this.password.length < 8) {
        this.passwordError = true;
        this.errorMessage = 'Password must be > 8 characters';
      }

      if(this.currentTab === 'register') {
        if(this.email === '') {
          this.emailError = true;
          this.errorMessage = 'Email address required';
        }

        if(this.email !== '' && this.email.indexOf('@') === -1 ){
          this.emailError = true;
          this.errorMessage = 'Invalid email address';
        }

        var dob = new Date(this.dobYear + "-" + this.dobMonth + "-" + this.dobDay);
        var currentDate = new Date().toJSON().slice(0,10) + ' 01:00:00';
        var age = (Date.now(currentDate) - dob) / 31557600000;
        if(age < 18) {
          this.errorMessage = "You must be 18 or over to join";
        } 

        if(this.termsAgreee === false)
        {
          this.errorMessage = 'You must agree to the terms of service to create an account';
        }
      }

      if(this.usernameError || this.passwordError || this.emailError || this.errorMessage !== '')
      {
        return false;
      }
      return true;
    },
    twitterLogin(){
      if(!this.externalLoginEnabled) return;

      if(this.termsAgreee === false && this.currentTab==='register'){
        this.errorMessage = 'You must agree to the terms of service to create an account';
        return;
      }

      var form = document.createElement("form");
      form.name = "TwitterForm";
      form.method = "POST";
      document.body.appendChild(form);
      form.action = config.TwitterLoginUrl + window.location.pathname;
      form.submit();
    },
     validateForgetPasswordForm() {
      this.forgetPasswordForm.emailError = false;
      this.forgetPasswordForm.errorMessage = '';
      if(this.forgetPasswordForm.email === '') {
        this.forgetPasswordForm.emailError = true;
        this.forgetPasswordForm.errorMessage = 'Email address required';
        return false;
      }
      if(this.forgetPasswordForm.email !== '' && this.forgetPasswordForm.email.indexOf('@') === -1 ){
        this.forgetPasswordForm.emailError = true;
        this.forgetPasswordForm.errorMessage = 'Invalid email address';
        return false;
      }
      return true;
    },
    async submitForgetPasswordForm() {
        if(!this.validateForgetPasswordForm()) return;
        var response;
        try {
          response = await this.$plainAxios.post('/user/forgot-password', {
              email: this.forgetPasswordForm.email, 
          });
        } catch (error) {
          this.forgetPasswordForm.errorMessage = "An error occurred";
          return;
        }
        if(response.status !== 200) {
          this.forgetPasswordForm.errorMessage = "An error occurred";
          return;
        }
        this.forgetPasswordForm.showSuccess = true;
        this.forgetPasswordForm.email = null;
    },
    async submitForm() {
      if(!this.validate()) return;

      var response;

      try {
        if(this.currentTab === 'register') {
          response = await this.$plainAxios.post('/user/create', {
            username: this.username, 
            password: this.password, 
            email: this.email, 
            promoCode: this.promoCode,
            dob: this.dobYear + "-" + this.dobMonth + "-" + this.dobDay,
            bettingCurrency: this.bettingCurrency
          });
        } else if (this.currentTab === 'login') {
          response = await this.$plainAxios.post('/user/signin', {
            username: this.username, 
            password: this.password, 
            mfacode: this.mfaCode
          });
        }
      } catch (error) {
        this.errorMessage = "An error occurred";
        return;
      }

      if(response.status !== 200) {
        this.errorMessage = "An error occurred";
        return;
      }

      if(response.data.success === false && response.data.error === 'mfa required') {
        this.mfaRequired = true;
        return;
      }

      if(response.data.success === false) {
        this.errorMessage = response.data.errorMessage;
        return;
      }
      
      if(response.data.success) {
        this.$store.commit('login', response.data);
        this.$emit('close');
      }
    },
  }
});
</script>