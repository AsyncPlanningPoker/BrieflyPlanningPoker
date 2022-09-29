import { api } from '../services/api';
import router from '../router/index';

const passRecoveryOneStore = {
  state: {
    email: '',
    errorMessage: '',
  },

  getters: {},

  mutations: {
    updateEmail(state, email) {
      state.email = email;
    },
    updateErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
  },

  actions: {
    recovery({ commit }) {
      api
        .post('user/pass-recovery', { email: this.state.passRecoveryOne.email, url: 'http://localhost:8080/confirm_reset?token=' })
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

export { passRecoveryOneStore };
