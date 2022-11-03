import { createStore } from 'vuex';
import jwt_decode from 'jwt-decode';
import { securedInstance, plainInstance } from '@/axiosPlugin'
// @ts-ignore
import DOMPurify from 'dompurify';

// @ts-ignore
function formatMessage(state, message) {
  message = DOMPurify.sanitize(message);
  if (message.indexOf(state.user.name) > -1) {
    message = message.replace("@" + state.user.name, "<span class='highlight'>@" + state.user.name + "</span>");
  }
  return message;
}

export default createStore({
	state: {
		auth: {
			jwt: '',
			jwtExpires: '',
			refreshToken: '',
		  loggedIn: false,
		},
		user: {
			id: '',
			name: '',
      email: '',
      emailConfirmed: false,
      dateJoined: '',
      mfaEnabled: false,
		},
    wallets: [],
    selectedCurrency: '',
    allBets: [],
    hrBets: [],
    ownBets: [],
    displayFiat: true,
    hideBalance: false,
    chatMessages: [],
	},
	getters: {
		loggedIn: ({ auth }) => auth.loggedIn,
		username: ({ user }) => user.name,
		mfaEnabled: ({ user }) => user.mfaEnabled,
		email: ({ user }) => user.email,
		supportChatId: ({ user }) => user.id,
		jwt: ({ auth }) => auth.jwt,
    wallets: ({wallets}) => wallets,
    selectedCurrency: ({selectedCurrency}) => selectedCurrency,
    allBets: ({allBets}) => allBets,
    hrBets: ({hrBets}) => hrBets,
    ownBets: ({ownBets}) => ownBets,
    displayFiat: ({displayFiat}) => displayFiat,
    hideBalance: ({hideBalance}) => hideBalance,
    user: ({user}) => user,
    chatMessages: ({chatMessages}) => chatMessages,
	},
	mutations: {
    setEmail(state, email) {
      state.user.email = email;
    },
    addBet(state, bet) {
      // @ts-expect-error
      state.allBets.splice(0, 0, bet);
			
			if (state.allBets.length > 20) {
				state.allBets.splice(20);
			}

      if (bet.userName === state.user.name) {
        // @ts-expect-error
        state.ownBets.splice(0, 0, bet);
			
        if (state.ownBets.length > 20) {
          state.ownBets.splice(20);
        }
      }

      if(bet.wager >= 100 || bet.payout >= 100) {
				// @ts-expect-error:
				state.hrBets.splice(0, 0, bet);
				if (state.hrBets.length > 20) {
					state.hrBets.splice(20);
				}
			}
    },
    toggleMFA(state) {
      state.user.mfaEnabled = !state.user.mfaEnabled;
			localStorage.setItem('user', JSON.stringify(state.user));
    },
    loadChat(state, data) {
      for(var i =0; i < data.length; i++) {
        data[i].content = formatMessage(state, data[i].content)
      }

      state.chatMessages = data;
    },
    addChatMessage(state, data) {
				// @ts-expect-error:
			state.chatMessages.push({userName: data.userName, content: formatMessage(state, data.content), date: data.date});

			if (state.chatMessages.length > 30) {
				state.chatMessages.shift();
			}
		},
    showDeposit(state, data) {
      // TODO Get rid of this hack! Should not need to have app on the window 
      // @ts-expect-error
      window.$_app.$toast.default(data.amount +  ' ' + data.currency + ' Deposited');
    },
    showBonus(state, data) {
      // TODO Get rid of this hack! Should not need to have app on the window 
      // @ts-expect-error
      window.$_app.$toast.default(data.amount +  ' ' + data.currency + ' Bonus Received');
    },
    hideBalance(state) {
      state.hideBalance = true;
    },
    showBalance(state) {
      state.hideBalance = false;
    },
    setDisplayFiat(state, value) {
      state.displayFiat = value;
    },
    setBets(state, data) {
      state.allBets = data.bets;
      state.hrBets = data.highRollerBets;
      if(data.myBets != null) {
        state.ownBets = data.myBets;
      }
    },
    setAuthToken(state, jwt) {
      state.auth.jwt = jwt;
			localStorage.setItem('authToken', jwt);
      securedInstance.defaults.headers.common['Authorization'] = `bearer ${jwt}`;
    },
    walletUpdate(state, data) {
      for(var i = 0; i < state.wallets.length; i++) {
        // @ts-expect-error
        if(state.wallets[i].symbol === data.currency) {
          // @ts-expect-error
          state.wallets[i].balance = data.balance;

          if (data.exchangeRate != undefined && data.exchangeRate != null) {
          // @ts-expect-error
            state.wallets[i].exchangeRate = data.exchangeRate;
          }
        }
      }
    },
    walletDebit(state, data) {
      for(var i = 0; i < state.wallets.length; i++) {
        // @ts-expect-error
        if(state.wallets[i].symbol === data.currency) {
          // @ts-expect-error
          state.wallets[i].balance -= data.amount;
        }
      }
    },
    setSelectedCurrency(state, currency) {
      state.selectedCurrency = currency;
			localStorage.setItem('selectedCurrency', currency);
    },
    async logout(state) {
      localStorage.removeItem('authToken');
			localStorage.removeItem('refreshToken');	
			localStorage.removeItem('user');	
			localStorage.removeItem('selectedCurrency');	
      // @ts-expect-error
      Intercom('shutdown');

      await securedInstance.post('/user/end-session', {
        token: state.auth.refreshToken
      });

      securedInstance.defaults.headers.common['Authorization'] = ``;

      state.wallets = [];

      state.auth.jwt = '';
			state.auth.refreshToken = '';
			state.auth.jwtExpires = '';
      state.auth.loggedIn = false;
			
      state.user.id = '';
      state.user.name = '';
      state.user.email = '';
      state.user.emailConfirmed = false;
      state.user.dateJoined = '';
      state.user.mfaEnabled = false;

      // this.$router.push({ name: "Home" }); TODO
    },
    async login(state, data) {
			localStorage.setItem('authToken', data.jwt);
			localStorage.setItem('refreshToken', data.refreshToken);	

			const decodedJwt = jwt_decode(data.jwt);

      state.auth.jwt = data.jwt;
			state.auth.refreshToken = data.refreshToken;
			state.auth.jwtExpires = (decodedJwt as any).exp;
      state.auth.loggedIn = true;
			
      state.user.id = data.user.id;
      state.user.name = data.user.name;
      state.user.email = data.user.email;
      state.user.emailConfirmed = data.user.emailConfirmed;
      state.user.dateJoined = data.user.dateJoined;
      state.user.mfaEnabled = data.user.mfaEnabled;

			localStorage.setItem('user', JSON.stringify(state.user));
      
      securedInstance.defaults.headers.common['Authorization'] = `bearer ${data.jwt}`;

      var response = await securedInstance.get('/wallet/wallets');
      state.wallets = response.data.wallets;
      if(state.selectedCurrency == '') {
        // @ts-expect-error
        state.selectedCurrency = state.wallets[0].symbol;
      }
		},
    async loginFromStorage(state) {
      try {
        // load jwt, refresh token and user from local storage
        let jwt = localStorage.getItem("authToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user = localStorage.getItem("user");
  
        if (refreshToken != null && jwt != null && user != null && refreshToken != undefined && jwt != undefined && user != undefined) {
          const decodedJwt = jwt_decode(jwt);
          const tokenExp = (decodedJwt as any).exp;
  
          // if jwt has expired get new one with refresh token
          if (Date.now() >= tokenExp * 1000) {
            try {
              const response = await plainInstance({
                method: 'post',
                url: '/user/refresh-token',
                data: {
                  token: refreshToken,
              }});
  
              jwt = response.data.jwt;
            } catch (error) {
              return;
            }
          }
  
          var data = {
            jwt,
            refreshToken,
            user: JSON.parse(user),
          }

          // @ts-expect-error:
          await this.commit('login', data);
        } else {
          var response = await securedInstance.get('/wallet/wallets');
        state.wallets = response.data.wallets;
        }
      } catch (error) {
      }
    }
	},
});