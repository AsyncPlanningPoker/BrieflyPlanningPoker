// import { defineStore } from 'pinia';
// import { api } from '../services/api';
// import router from '../router/index';

// interface State {
//   confirmPassword: string,
//   errorMessage: string,
//   newPassword: string,
// };

// const passRecoveryTwoStore = defineStore('passRecoveryTwoStore',{
//   state: (): State => ({
//     confirmPassword: '',
//     errorMessage: '',
//     newPassword: '',
//   }),

//   actions: {
//     update(token: string) {
//       api
//         .patch('user/pass-recovery', { password: this.newPassword, token })
//         .then(() => {
//           router.push('/signin');
//         })
//         .catch((err) => {
//           this.errorMessage = err.response.data.message;
//         });
//     },
//   },
// });

// export { passRecoveryTwoStore };
