
import router from '../router/index';
import {api, setToken} from '../services/api';


const signInStore = {
  state: {
    email: '',
    errorMessage: '',
    password: '',
  },

  getters: {},

  mutations: {
    updateEmail(state, email) {
      state.email = email;
    },
    updateErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    updateIsAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
    updatePassword(state, password) {
      state.password = password;
    },
  },

  actions: {
    login({ commit }) {
      api.post('user/login', { email: this.state.signIn.email, password: this.state.signIn.password })
        .then((res) => {
          const token = res.data.token;
          commit('updateUserToken', token);
          commit('updateIsAuth', true);
          setToken(token)
          router.push('/home');
        })
        .catch((err) => {
          commit('updateErrorMessage', err.response.data.message);
        });
    },
  },

  modules: {},
};

export { signInStore };
