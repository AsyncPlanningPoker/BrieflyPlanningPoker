import axios from 'axios';
import router from '../router/index';

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
      axios
        .post('http://localhost:8000/user/login', { email: this.state.signIn.email, password: this.state.signIn.password })
        .then((res) => {
          const token = res.data.token;
          commit('updateUserToken', token);
          commit('updateIsAuth', true);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          router.push('/');
        })
        .catch((err) => {
          console.log('aaaaaaaaaaaa')
          commit('updateErrorMessage', err.response.data.message);
        });
    },
  },

  modules: {},
};

export { signInStore };
