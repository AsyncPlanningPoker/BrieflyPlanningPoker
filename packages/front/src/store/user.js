import { api } from '../services/api';

const userStore = {
    state: {
        userToken: JSON.parse(localStorage.getItem('userToken')) || '',
        userEmail: JSON.parse(localStorage.getItem('userEmail')) || '',
        errorMessage: '',
        success: false,
    },

    getters: {
        getUserEmail(state) {
            return state.userEmail;
        },
    },

    mutations: {
        UPDATE_USER_TOKEN(state, payload) {
            state.userToken = payload;
            localStorage.removeItem('userToken');
            localStorage.setItem('userToken', JSON.stringify(state.userToken));
        },
        UPDATE_USER_EMAIL(state, payload) {
            state.userEmail = payload;
            localStorage.removeItem('userEmail');
            localStorage.setItem('userEmail', JSON.stringify(state.userEmail));
        },
        LOGOUT(state) {
            state.userToken = '';
            state.userEmail = ''
            localStorage.removeItem('userToken');
            localStorage.removeItem('userEmail');
        },
        UPDATE_ERROR_MESSAGE(state, errorMessage) {
            state.errorMessage = errorMessage;
        },
        UPDATE_SUCCESS(state, payload) {
            state.success = payload;
        },
    },

    actions: {
        updateUserToken({ commit }, payload) {
            commit('UPDATE_USER_TOKEN', payload);
        },

        updateUserEmail({ commit }, payload) {
            commit('UPDATE_USER_EMAIL', payload);
        },

        logout({ commit }) {
            commit('LOGOUT');
        },

        async updateYourself({ commit }, payload) {
            commit('UPDATE_ERROR_MESSAGE', '');
            commit('UPDATE_SUCCESS', false);
            const body = {
                oldpassword: payload.oldPassword,
                password: payload.newPassword
            };
            try {
                await api.put('user', body);
                commit('UPDATE_SUCCESS', true);
            } catch (err) {
                const errorMessage = err.response?.data?.message;
                if (typeof errorMessage === 'object') {
                    commit('UPDATE_ERROR_MESSAGE', err.response.data.message[0].msg);
                } else if (typeof errorMessage === 'string') {
                    commit('UPDATE_ERROR_MESSAGE', err.response.data.message);
                } else {
                    commit('UPDATE_ERROR_MESSAGE', 'Something went wrong.');
                }
            }
        },

        async deleteYourself({ dispatch }) {
            await api.delete('user')
            dispatch('logout');
        },
    },
};

export { userStore };
