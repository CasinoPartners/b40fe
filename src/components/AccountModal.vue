<template>
<div class="modal wallet-modal" @click.self="$emit('close')">
  <div class="modal-content">
      <div class="columns">
          <div class="close-modal is-hidden-tablet" @click.self="$emit('close')">X</div>
        
        <div class="column is-one-quarter modal-side-menu">
          <h2 class="is-hidden-mobile" style="margin-bottom:30px;">Account</h2>
          <button class="button button" v-bind:class="{ highlight: currentTab=='profile' }" @click.prevent="currentTab='profile'">Profile</button>
          <button class="button button" v-bind:class="{ highlight: currentTab=='security' }" @click.prevent="currentTab='security'">Security</button>
          <!-- <button class="button button" v-bind:class="{ highlight: currentTab=='sessions' }" @click.prevent="currentTab='sessions'">Sessions</button> -->
          <button class="button button" v-bind:class="{ highlight: currentTab=='transactions' }" @click.prevent="currentTab='transactions'">Transactions</button>

          <!-- <button class="button button" v-bind:class="{ highlight: currentTab=='responsible' }" @click.prevent="currentTab='responsible'">Responsible Gambling</button> -->
        </div>
        <div class="column modal-right-column" style="min-height: 400px;">
          <div class="close-modal is-hidden-mobile" @click.self="$emit('close')">X</div>

          <div v-if="currentTab=='profile'" class="profile-tab">
            <div class="left-align" style="display:flex;flex-direction:column;font-size:20px;line-height:46px;">
              <label>Username:</label>
              <input id="username" class="input" disabled=disabled v-model="username">
              <label>Email:</label>
              <input id="email" class="input" v-model="email" autocomplete="off" :disabled="!showEmailSaveButton" placeholder="Email Address">
              <button v-if="showEmailSaveButton" class="button is-primary" style="width:150px;font-size:16px;padding: 5px;height: 30px;" @click.prevent="saveEmail">Save Email</button>
              <a v-if="showConfirmLink" style="font-size:16px;margin-top: -15px;margin-left: 7px;" @click.self="confirmEmail">Send confirmation link</a>

              <label>Joined:</label>
              <input id="joined" class="input" disabled=disabled v-model="dateJoined">

              <div v-if="showUploading == false">
              <label>Upload Document:</label>
              <input id="fileInput"  type="file" accept="image/*" @change="fileChange(e)" />
              <br />
              <button class="button is-primary" @click="startUpload()" type="button">Upload File</button>
              </div>
              <p v-if="showUploading">Uploading File...</p>
              <p v-if="showFileUploadError">Error uploading file. Please contact live support.</p>
              <p v-if="showFileUploadSuccess">File uploaded.</p>
            </div>
          </div>

          <div v-if="currentTab=='security'" class="security-tab">
            <div class="left-align">
              <h2>Change Password</h2>
              <form class="form auth-form" @submit.prevent="submitForm">
                  <label>Old Password <span class="error" v-if="oldPasswordError">*</span></label>
                  <input id="password" class="input" type="password" v-model="oldPassword" autocomplete="off">

                  <label>New Password <span class="error" v-if="newPasswordError">*</span></label>
                  <input id="newpassword" class="input" type="password" v-model="newPassword" autocomplete="off">

                   <button type="submit" class="button is-primary security-btn-tab" @click.prevent="savePassword">Save</button>
              </form>
              <br>
              <div v-if="user.mfaEnabled">
                <h2>Disable Multi-Factor Authentication</h2>
                <p class="error" v-if="mfaErrorMessage !== ''">{{ mfaErrorMessage }}</p>
                <form class="form auth-form" @submit.prevent="toggleMFA">
                  <label>Enter MFA Code <span class="error" v-if="mfaCodeError">*</span></label>
                  <input id="mfaCode" type="text" v-model="mfaCode" autocomplete="off" />
                  <button type="submit" class="button is-primary security-btn-tab">Disable</button>
                </form>
              </div>
              <div v-else>
                <h2>Enable Multi-Factor Authentication</h2>
                <p>Scan the QR code or enter the key in your authenticator app</p>
                <div class="copy-button-input">
                  <input id="mfakey" v-model="mfaKey" disabled placeholder="Loading key..."><CopyButton :value="mfaKey" />
                </div>
                <p class="error" v-if="mfaErrorMessage !== ''">{{ mfaErrorMessage }}</p>
                <form class="form auth-form" @submit.prevent="toggleMFA">
                  <div class="center qrcode">
                    <qrcode-vue :value="mfaUri" :size="150" level="H" />
                  </div>
                  <label>Enter MFA Code <span class="error" v-if="mfaCodeError">*</span></label>
                  <input id="mfaCode" type="text" v-model="mfaCode" autocomplete="off"/>
                  <button type="submit" class="button is-primary security-btn-tab">Enable</button>
                </form>
              </div>
            </div>
          </div>

          <div v-if="currentTab=='transactions'" class="transactions-tab">
            <br/>         

            <div class="txtype-selector" ref="txtype">
            <span @click.prevent="txtypeMenuVisible = !txtypeMenuVisible" @blur="txtypeMenuVisible = false">
            <div>
              {{txtype}}
            </div>
            <i class="down-arrow"></i>
            </span>
            <div v-if="txtypeMenuVisible" class="dropdown-menu">   
              <div v-for="t in txTypes" :key="t" @click.prevent="txtype = t; loadTransactions();txtypeMenuVisible=false;">
                <span>{{t}}</span>
              </div>
            </div>
          </div>
            
            <p style="margin-top:25px;" v-if="transactions.length===0">You do not have any transactions of this type</p>
            <table v-if="transactions.length>0" class="bets-table">
              <thead>
                <tr>
                  <th style="text-align:left!important;">Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th style="text-align:right!important;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tx in transactions" :key="tx.id">
                  <td style="text-align:left!important;">{{tx.date.split('T')[0]}}</td>
                  <td>{{tx.type}}</td>
                  <td><div class="currency">{{tx.amount.toFixed(8)}}<img :src="'/img/' + tx.currency.toLowerCase() + '.png'"></div></td>
                  <td style="text-align:right!important;">{{tx.status}}</td> 
                </tr>
              </tbody>
            </table>
            <div v-if="transactions.length>0" style="display:flex;justify-content:center">
              <a style="margin-right:20px" v-if="prevEnabled" href="#" @click.prevent="transactionsPage--; loadTransactions()">Prev</a>
              <a style="margin-right:20px; color:#63728f!important" v-if="!prevEnabled" href="#" @click.prevent="">Prev</a>
              <a v-if="nextEnabled" href="#" @click.prevent="transactionsPage++; loadTransactions()">Next</a>
              <a v-if="!nextEnabled" style="color:#63728f!important" href="#" @click.prevent="">Next</a>
            </div>

          </div>

          <!-- <div v-if="currentTab=='sessions'" class="sessions-tab">
            <div class="left-align">
            </div>
          </div>

          
          <div v-if="currentTab=='responsible'" class="responsible-tab">
            <div class="left-align">
            </div>
          </div> -->
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

export default defineComponent({
  name: 'AccountModal',
  props: ['tab'],
  computed: {
    ...mapGetters(['user']),
  },
  components: {
    QrcodeVue,
    CopyButton,
  },
  data() {
    return {
      currentTab: this.tab,
      files: new FormData(),
      email: '',
      username: '',
      dateJoined: '',
      showEmailSaveButton: false,
      showConfirmLink: false,
      oldPassword: '',
      newPassword: '',
      oldPasswordError: false,
      newPasswordError: false,
      transactions: [],
      mfaCode: '',
      mfaCodeError: false,
      mfaKey: '',
      mfaUri: '',
      mfaErrorMessage: '',
      prevEnabled: false,
      nextEnabled: true,
      transactionsPage: 0,
      txtypeMenuVisible: false,
      txtype: 'deposits',
      txTypes : ['deposits', 'withdrawals', 'bonuses', 'tips'],
      showFileUploadSuccess: false,
      showUploading: false,
      showFileUploadError: false,

    }
  },
  watch: {
  },
  async mounted() {
    this.username = this.user.name;
    this.email = this.user.email;
    if(this.email.length === 0) {
      this.showEmailSaveButton = true;
    } else {
      if(!this.user.emailConfirmed) {
        this.showConfirmLink = true;
      }
    }
    this.dateJoined = this.user.dateJoined.split('T')[0];
    this.loadTransactions();


    var response = await this.$securedAxios.get('/user/get-mfa-key');
    if(response.status == 200) {
      this.mfaKey = response.data.mfaKey;
      this.mfaUri = response.data.uri;
    } else {
    }

  },
  methods: {
    async toggleMFA() {
      this.mfaCodeError = false;
      this.mfaErrorMessage = '';
      if (this.mfaCode === '') {
        this.mfaCodeError = true;
        return;
      }

      var response = await this.$securedAxios.post('/user/toggle-mfa', {
        code: this.mfaCode,
      })

      if (response.status == 200) {
        this.$store.commit('toggleMFA');
        this.$emit("close");
      } else {
        this.mfaErrorMessage = response.data.error;
      }
    },
    async loadTransactions() {
      var response = await this.$securedAxios.get('/wallet/transactions?type=' + this.txtype + '&page=' + this.transactionsPage);
      if(response.data) {
        this.transactions = response.data.transactions;

        if(this.transactionsPage > 0) {
          this.prevEnabled = true;
        } else {
          this.prevEnabled = false;
        }

        if(this.transactions.length == 10) {
          this.nextEnabled = true;
        } else {
          this.nextEnabled = false;
        }
      }
    },
    async savePassword() {
      try {
       const response = await this.$securedAxios({
          method: 'post',
          url: '/user/change-password',
          data: {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          }
        });
      if(response.status === 200) {
        this.$toast.success('Password Changed');
        this.oldPassword = '';
        this.newPassword = '';
        this.$emit('close');
      } else {
        this.$toast.error('Error saving password');
      } 
      } catch (error) {
        this.$toast.error('Error saving password');
      }
    },
    async saveEmail() {
      try {
       const response = await this.$securedAxios({
          method: 'post',
          url: '/user/set-email',
          data: {
            email: this.email,
          }
        });
      if(response.status === 200) {
        this.showEmailSaveButton = false;
        this.showConfirmLink = true;
        this.$toast.success('Email address saved');
        this.$store.commit('setEmail', this.email);
      } else {
        this.$toast.error('Error saving email address');
      } 
      } catch (error) {
        this.$toast.error('Error saving email address');
      }
    },
    async confirmEmail() {
      try {
        const response = await this.$securedAxios({
            method: 'post',
            url: '/user/send-confirm-link',
          });
        if(response.status === 200) {
          this.$toast.success('Email confirmation link sent');
          this.showConfirmLink = false;
        } else {
          this.$toast.success('Error sending link');
        }  
      } catch (error) {
          this.$toast.success('Error sending link');
      }
    }, 
    fileChange(e) {
      var fileList = document.getElementById("fileInput").files;
      for (let i = 0; i < fileList.length; i++) {
          this.files.append("file", fileList[i], fileList[i].name);
      }

    },
    async startUpload() {
      this.showUploading = true;
      this.showFileUploadError = false;
      this.showFileUploadSuccess = false;
      const response = await this.$securedAxios.post('/user/upload-file', this.files, { headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.showUploading = false;
        this.files = new FormData();
      document.getElementById("fileInput").value = '';
      
        if(response.data.success == true) {
          this.showFileUploadSuccess = true;

        } else {
          this.showFileUploadError = true;

        }
    },
  }
});
</script>