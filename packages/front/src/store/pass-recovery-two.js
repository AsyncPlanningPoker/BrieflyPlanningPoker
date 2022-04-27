import axios from 'axios';
import router from '../router/index';

const passRecoveryTwoStore = {
  state: {
    confirmPassword: '',
    errorMessage: '',
    newPassword: '',
  },

  getters: {},

  mutations: {
    updateConfirmPassword(state, confirmPassword) {
      state.confirmPassword = confirmPassword;
    },
    updateErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    updateNewPassword(state, newPassword) {
      state.newPassword = newPassword;
    },
    updateToken(state, token) {
      state.token = token;
    },
  },

  actions: {
    update({ commit }, token) {
      axios
        .patch('http://localhost:8000/user/pass-recovery', { password: this.state.passRecoveryTwo.newPassword, token })
        .then(() => {
          router.push('/signin');
        })
        .catch((err) => {
          commit('updateErrorMessage', err.response.data.message);
        });
    },
  },

  modules: {},
};

export { passRecoveryTwoStore };
