const config = (() => {
  return {
    "VUE_APP_API_URL": "https://api.bet-40.com",
      "IntercomAppId": "",
      "ExternalLoginsEnabled": false,
      "SportsEnabled": false,
      "ChatEnabled": false,
      "SupportEnabled": false,
      "BetsTableEnabled": false,
      "CurrencySelectOnRegister": false,
      "ShowCryptoMessageOnRegister": false,
      "FiatProcessor": "",
      "ThemePath": '/themes/ydhe73/',
      "TwitterLoginUrl": "https://api.bet-40.com/externallogin/signin?provider=Twitter&returnUrl=",
      "DomainName": "bet-40.com",
      "SiteName": "Bet40",
      "SiteUrl": "https://bet-40.com",
      "BusinessName": "R.Bostock Enterprises B.V.",
      "TelegramLink": "https://t.me/",
      "TwitterLink": "https://twitter.com/",
      "InstagramLink": "",
      "DiscordLink": "https://discord.gg/",
      "FacebookLink": "",
      "TikTokLink": "",
      "TwitterName": "Bet40",
      "SupportEmail": "support@bet-40.com",
      "GATAG": "",
      "ShowCryptoPrices": false,
      "Theme": {
        "MainColor": "#d81d1d",
        "MainColorGradiant": "#d81d1d",
        "MainBgColor": "#0a212b",
        "SecondBgColor": "#0a2836"
      },
      "HomePageSlides": [
          {
        "img": "/themes/ydhe73/welcomebanner.png",
        "mobImg": "/themes/ydhe73/welcomebanner.png",
        "url": "welcome-bonus"
      },
      {
        "img": "/themes/ydhe73/vipbanner.png",
        "mobImg": "/themes/ydhe73/vipbanner.png",
        "url": "vip"
      },
      {
        "img": "/themes/ydhe73/buyinbanner.png",
        "mobImg": "/themes/ydhe73/buyinbanner.png",
        "url": "/games/feature-buy-in"
      },
      {
        "img": "/themes/ydhe73/reloadbanner.png",
        "mobImg": "/themes/ydhe73/reloadbanner.png",
        "url": "reload"
      },
       {
        "img": "/themes/ydhe73/live_support_banner.png",
        "mobImg": "/themes/ydhe73/live_support_banner.png",
        "url": "transfer"
      },
      {
        "img": "/themes/ydhe73/viptransferbanner.png",
        "mobImg": "/themes/ydhe73/viptransferbanner.png",
        "url": "transfer"
      },
      {
        "img": "/themes/ydhe73/discordbanner.png",
        "mobImg": "/themes/ydhe73/discordbanner.png",
        "url": "discord"
      },
      {
        "img": "/themes/ydhe73/spinsbanner.png",
        "mobImg": "/themes/ydhe73/spinsbanner.png",
        "url": "freespins"
      },
      ],
      "SideMenu": {
        "Sections": [
          {
            "Links": [
              {
                "IsHeader": false,
                "IsSubMenu": false,
                "IsRoute": true,
                "HasIcon": true,
                "IconUrl": "/themes/ydhe73/lobby_icon.png",
                "Text": "All Games",
                "Title": "All Games",
                "RouteTo": "Home",
                "RouteParams": {},
                "Url": ""
              },
              {
              "IsHeader": false,
              "IsSubMenu": false,
              "IsRoute": true,
              "HasIcon": true,
              "IconUrl": "/themes/ydhe73/new_games_icon.png",
              "Text": "New Games",
              "Title": "New Games",
              "RouteTo": "Games",
              "RouteParams": {category: 'new'},
              "Url": ""
            },
              {
                "IsHeader": false,
                "IsSubMenu": false,
                "IsRoute": true,
                "HasIcon": true,
                "IconUrl": "/themes/ydhe73/slots_icon.png",
                "Text": "Slots",
                "Title": "Slots",
                "RouteTo": "Games",
                "RouteParams": {category: 'slots'},
                "Url": ""
              },
              {
                "IsHeader": false,
                "IsSubMenu": false,
                "IsRoute": true,
                "HasIcon": true,
                "IconUrl": "/themes/ydhe73/live_icon.png",
                "Text": "Live Casino",
                "Title": "Live Casino",
                "RouteTo": "Games",
                "RouteParams": {category: 'live'},
                "Url": ""
              },
              {
                "IsHeader": false,
                "IsSubMenu": false,
                "IsRoute": true,
                "HasIcon": true,
                "IconUrl": "/themes/ydhe73/table_icon.png",
                "Text": "Table",
                "Title": "Table",
                "RouteTo": "Games",
                "RouteParams": {category: 'table'},
                "Url": ""
              },
              {
                "IsHeader": false,
                "IsSubMenu": false,
                "IsRoute": true,
                "HasIcon": true,
                "IconUrl": "/themes/ydhe73/feature_buy_icon.png",
                "Text": "Feature Buy-in",
                "Title": "Feature Buy-in",
                "RouteTo": "Games",
                "RouteParams": {category: 'feature-buy-in'},
                "Url": ""
              },
              {
                "IsHeader": false,
                "IsSubMenu": false,
                "IsRoute": true,
                "HasIcon": true,
                "IconUrl": "/themes/ydhe73/game_shows_icon.png",
                "Text": "Game Shows",
                "Title": "Game Shows",
                "RouteTo": "Games",
                "RouteParams": {category: 'live'},
                "Url": ""
              },
              {
              "IsHeader": false,
              "IsSubMenu": false,
              "IsRoute": true,
              "HasIcon": true,
              "IconUrl": "/themes/ydhe73/blackjack_icon.png",
              "Text": "Blackjack",
              "Title": "Blackjack",
              "RouteTo": "Games",
              "RouteParams": {category: 'blackjack'},
              "Url": ""
            },
            {
              "IsHeader": false,
              "IsSubMenu": false,
              "IsRoute": true,
              "HasIcon": true,
              "IconUrl": "/themes/ydhe73/baccarat_icon.png",
              "Text": "Baccarat",
              "Title": "Baccarat",
              "RouteTo": "Games",
              "RouteParams": {category: 'baccarat'},
              "Url": ""
            },
            {
              "IsHeader": false,
              "IsSubMenu": false,
              "IsRoute": true,
              "HasIcon": true,
              "IconUrl": "/themes/ydhe73/table_icon.png",
              "Text": "Roulette",
              "Title": "Roulette",
              "RouteTo": "Games",
              "RouteParams": {category: 'roulette'},
              "Url": ""
            },
          //   {
          //   "IsHeader": false,
          //   "IsSubMenu": false,
          //   "IsRoute": true,
          //   "HasIcon": true,
          //   "IconUrl": "/themes/ydhe73/VIP_icon.png",
          //   "Text": "VIP Club",
          //   "Title": "VIP Club",
          //   "RouteTo": "VIP",
          //   "Url": ""
          // },
            ]
          },
          {
            "Links": [
              {
                "IsHeader": true,
                "IsSubMenu": false,
                "IsRoute": false,
                "HasIcon": true,
                "IconUrl": "/themes/ydhe73/promotions_icon.png",
                "Text": "Promotions",
                "Title": "",
                "RouteTo": "",
                "RouteParams": {},
                "Url": ""
              },
              // {
              //   "IsHeader": false,
              //   "IsSubMenu": true,
              //   "IsRoute": true,
              //   "HasIcon": false,
              //   "IconUrl": "",
              //   "Text": "Welcome Bonus",
              //   "Title": "Welcome Bonus",
              //   "RouteTo": "WelcomeOffer",
              //   "RouteParams": {},
              //   "Url": ""
              // },
              // {
              //   "IsHeader": false,
              //   "IsSubMenu": true,
              //   "IsRoute": true,
              //   "HasIcon": false,
              //   "IconUrl": "",
              //   "Text": "Monday Reloads",
              //   "Title": "Monday Reloads",
              //   "RouteTo": "Reload",
              //   "RouteParams": {},
              //   "Url": ""
              // },
              // {
              //   "IsHeader": false,
              //   "IsSubMenu": true,
              //   "IsRoute": true,
              //   "HasIcon": false,
              //   "IconUrl": "",
              //   "Text": "Wednesday Free Spins",
              //   "Title": "Wednesday Free Spins",
              //   "RouteTo": "FreeSpins",
              //   "RouteParams": {},
              //   "Url": ""
              // },
              {
                "IsHeader": false,
                "IsSubMenu": true,
                "IsRoute": true,
                "HasIcon": false,
                "IconUrl": "",
                "Text": "$1,000,000 Pragmatic...",
                "Title": "",
                "RouteTo": "PragmaticDrops",
                "RouteParams": {},
                "Url": ""
              },
            ]
          },
        ]
      }
    };
  })();
