import { createRouter, createWebHistory } from 'vue-router'
// import * as views from '../views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/home.vue'),
      props: true,
      beforeEnter: (to, from, next) => 
        !localStorage.getItem('userToken') ? next('/signin') : next()
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('../views/sign-in.vue'),
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/sign-up.vue'),
    },
    {
      path: '/user-account',
      name: 'user-profile',
      component: () => import('../views/user-profile.vue'),
      beforeEnter: (to, from, next) => {
        !localStorage.getItem('userToken') ? next('/signin') : next();
      },
    },
    // {
    //   path: '/password_reset',
    //   name: 'pass-recovery-one',
    //   component: () => import('../views/pass-recovery-one.vue'),
    // },
    // {
    //   path: '/confirm_reset',
    //   name: 'pass-recovery-two',
    //   component: () => import('../views/pass-recovery-two.vue'),
    //   beforeEnter: (route) => !!route.query.token,
    //   props: (route) => ({ token: route.query.token }),
    // },
  ]
})

export default router;
