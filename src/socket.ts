import * as SignalR from '@microsoft/signalr';
import store from './store';

class Socket {
    private socket: any;
    private baseUrl: string;
    private token: string;
    private toast: any;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.token = '';
    }

    setToast(toast: any) {
      this.toast = toast;
    }

    scrollChat() {
      setTimeout(() => {
        var el = document.getElementById('chat-messages');
        if(el !== null)
            el.scrollTop = el.scrollHeight;    
      }, 300);
    }
    
    async start(token: string) {
        if(token === this.token && token !== '') {
            return;
        }

        try {
            this.socket.stop();
        } catch (error) {
        }

        this.token = token;
        this.socket = new SignalR.HubConnectionBuilder()
        .withUrl(this.baseUrl + '/socket', {
            accessTokenFactory: () => this.token
          })
        .withAutomaticReconnect()
        .build();

        this.socket.on("walletUpdate", function (balance: any, currency: any, exchangeRate: any) {
            store.commit('walletUpdate', {balance, currency, exchangeRate});
        });

        this.socket.on("freeSpinsFailed",  (message: string) => {
          this.toast.error(message);
        });

        this.socket.on("freeSpinsClaimed",  (games: string, currency: string) => {
          this.toast.success('Free spins claimed');
        });

        this.socket.on("notification",  (msg: string) => {
          this.toast.success(msg);
        });

        this.socket.on("deposit", function (amount: any, currency: any, balance: any) {
          store.commit('walletUpdate', {balance, currency});
          store.commit('showDeposit', {amount, currency});
        });

        this.socket.on("bonus", function (amount: any, currency: any, balance: any) {
          store.commit('walletUpdate', {balance, currency});
          store.commit('showBonus', {amount, currency});
        });

        this.socket.on("bet", function (bet: any) {
          store.commit('addBet', bet);
        });

        this.socket.on("loadChat", (messages: any) => {
          store.commit('loadChat', messages);
          this.scrollChat();
        });

        this.socket.on("newMessage", (userName: string, content: string, date: string) => {
          store.commit('addChatMessage', {userName, content, date});
          this.scrollChat();
        });

        await this.socket.start();
    }    

    sendChatMessage(message: string) {
      if(message.length === 0) return; // TODO add error message

      this.socket.invoke("SendMessage", message).then((res: any)=> {
        if(res !== '') {
          // TODO show error message
        }
    });
    }
}

// @ts-expect-error
export const socket = new Socket(config.VUE_APP_API_URL || process.env.VUE_APP_API_URL); 