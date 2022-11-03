// @ts-nocheck
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
const Game = () => import('../views/Game.vue')
const Games = () => import('../views/Games.vue')
const Sports = () => import( '../views/Sports.vue')
const Connect = () => import('../views/Connect.vue')
const ConfirmEmail = () => import('../views/ConfirmEmail.vue')
const AML = () => import('../views/AML.vue')
const Fair = () => import('../views/Fair.vue')
const Privacy = () => import('../views/Privacy.vue')
const ResponsibleGambling = () => import('../views/ResponsibleGambling.vue')
const Terms = () => import('../views/Terms.vue')
const Payouts = () => import('../views/Payouts.vue')
const BonusTerms = () => import('../views/BonusTerms.vue')
const Promotions = () => import('../views/Promotions.vue')
const Buyin = () => import('../views/Buyin.vue')
const FreeSpins = () => import('../views/FreeSpins.vue')
const Reload = () => import('../views/Reload.vue')
const VipTransfer = () => import('../views/VipTransfer.vue')
const VIP = () => import('../views/Vip.vue')
const Disputes = () => import('../views/Disputes.vue')
const SelfExclusion = () => import('../views/SelfExclusion.vue')
const WelcomeOffer = () => import('../views/WelcomeOffer.vue')
const PragmaticDrops = () => import('../views/PragmaticDrops.vue')
const ResetPassword = () => import('../views/ResetPassword.vue')
const FirstDepositBonus = () => import('../views/FirstDepositBonus.vue')
const SecondDepositBonus = () => import('../views/SecondDepositBonus.vue')
const ThirdDepositBonus = () => import('../views/ThirdDepositBonus.vue')
const FourthDepositBonus = () => import('../views/FourthDepositBonus.vue')
const CashbackBonus = () => import('../views/CashbackBonus.vue')

let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    }
  },
  {
    path: '/games/:category/:provider?',
    name: 'Games',
    component: Games,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    }
  },
  {
    path: '/game/:provider/:game/:demo?',
    name: 'Game',
    component: Game,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    }
  },
  {
    path: '/confirm-email',
    name: 'ConfirmEmail',
    component: ConfirmEmail,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/bonus-terms',
    name: 'BonusTerms',
    component: BonusTerms,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/sports',
    name: 'Sports',
    component: Sports,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/aml',
    name: 'AML',
    component: AML,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/vip',
    name: 'VIP',
    component: VIP,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/buyin',
    name: 'Buyin',
    component: Buyin,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/reload',
    name: 'Reload',
    component: Reload,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/viptransfer',
    name: 'VipTransfer',
    component: VipTransfer,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/freespins',
    name: 'FreeSpins',
    component: FreeSpins,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/promotions',
    name: 'Promotions',
    component: Promotions,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/welcome-bonus',
    name: 'WelcomeOffer',
    component: WelcomeOffer,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/pragmatic-drops-and-wins',
    name: 'PragmaticDrops',
    component: PragmaticDrops,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/first-deposit-bonus',
    name: 'FirstDepositBonus',
    component: FirstDepositBonus,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/second-deposit-bonus',
    name: 'SecondDepositBonus',
    component: SecondDepositBonus,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/third-deposit-bonus',
    name: 'ThirdDepositBonus',
    component: ThirdDepositBonus,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/fourth-deposit-bonus',
    name: 'FourthDepositBonus',
    component: FourthDepositBonus,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/cashback-bonus',
    name: 'CashbackBonus',
    component: CashbackBonus,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/fair',
    name: 'Fair',
    component: Fair,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/payouts',
    name: 'Payouts',
    component: Payouts,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/disputes',
    name: 'Disputes',
    component: Disputes,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/responsible-gambling',
    name: 'ResponsibleGambling',
    component: ResponsibleGambling,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/self-exclusion',
    name: 'SelfExclusion',
    component: SelfExclusion,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      title: config.DomainName,
      metaTags: [
        {
          name: 'description',
          content: config.DomainName
        }
      ]
    },
  },
];

if(config.ExternalLoginsEnabled) {
  var elRoutes: Array<RouteRecordRaw> = [{
      path: '/connect',
      name: 'Connect',
      component: Connect,
      meta: {
        title: config.DomainName,
        metaTags: [
          {
            name: 'description',
            content: config.DomainName
          }
        ]
      },
    },
  ];
  routes = routes.concat(elRoutes)
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from) => {
  document.title = to.meta.title;
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300)
 });

export default router;