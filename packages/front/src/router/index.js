import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../pages/sign-in.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../pages/sign-up.vue')
  },
  {
    path: '/password_reset',
    name: 'pass-recovery-one',
    component: () => import('../pages/pass-recovery-one.vue')
  },
  {
    path: '/confirm_reset',
    name: 'pass-recovery-two',
    component: () => import('../pages/pass-recovery-two.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;