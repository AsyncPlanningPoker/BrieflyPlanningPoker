import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/home.vue'),
    props: true,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => {
      return import('../pages/sign-in.vue');
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => {
      return import('../pages/sign-up.vue');
    },
  },
  {
    path: '/password_reset',
    name: 'pass-recovery-one',
    component: () => {
      return import('../pages/pass-recovery-one.vue');
    },
  },
  {
    path: '/confirm_reset',
    name: 'pass-recovery-two',
    component: () => {
      return import('../pages/pass-recovery-two.vue');
    },
    beforeEnter: (route) => {
      if(!route.query.token) return false
    },
    props: (route) => {
      return { token: route.query.token };
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
