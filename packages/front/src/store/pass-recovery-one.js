import { api } from '../services/api';
import router from '../router/index';

const envVars = import.meta.env;

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
        .post('user/pass-recovery', { email: this.state.passRecoveryOne.email, url: `${envVars.DEV ? envVars.VITE_DEV_WEB_URL : envVars.VITE_PROD_WEB_URL}confirm_reset?token=` })
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
