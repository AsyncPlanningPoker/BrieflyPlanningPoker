import { api } from '../services/api';

export default {

  state: {
    squadList: [],

    squadActive: {
      users: {},
    },
  },

  getters: {
    getSquadList(state) {
      return state.squadList;
    },

    getSquadActive(state) {
      return state.squadActive;
    },

    getActiveId(state) {
      return state.squadActive.id;
    },

    getUsers(state) {
      return state.users;
    },
  },

  mutations: {
    // ADD_SQUAD(state, payload) {
    //   state.squadList = [...state.squadList, payload];
    // },

    ADD_SQUAD_LIST(state, payload) {
      state.squadList = payload;
    },

    ADD_SQUAD_ACTIVE(state, payload) {
      state.squadActive = payload;
    },

    UPDATE_SQUAD_ACTIVE(state, payload) {
      const updatedSquad = state.squadList.find((x) => x.id === payload);
      state.squadActive = updatedSquad;
    },

    ADD_USERS(state, payload) {
      state.squadActive.users = payload;
    },
  },

  actions: {
    async gatherSquadList({commit}) {
      const req = await api.get('squad');
      const reqdata = req.data;
      commit('ADD_SQUAD_LIST', reqdata);
    },

    async gatherSquad({commit}, id) {
      const req = await api.get(`squad/${id}`);
      const reqdata = req.data;
      commit('ADD_SQUAD_ACTIVE', reqdata);
    },

    // async gatherUsers({commit}, id) {
    //   const req = await api.get(`squad/${id}/users`);
    //   const reqdata = req.data;
    //   commit('ADD_USERS', reqdata);
    // },

    async addUser({dispatch, getters}, payload) {
      const id = getters.getActiveId;
      await api.post(`squad/${id}/users`, {"email":payload, "owner":false}).catch((error) => {error = error.data.message});
      // await dispatch('gatherSquadList');
      await dispatch('gatherSquad', id);
      // commit('UPDATE_SQUAD_ACTIVE', id);
    },

    async addYourself({dispatch, getters}, id) {
      const email = getters.getUserEmail;
      await api.post(`squad/${id}/users`, {"email":email, "owner":true}).catch((error) => {error = error.data.message});
      await dispatch('gatherSquad', id);
    },

    async delUser({dispatch, getters}, payload) {
      const id = getters.getActiveId;
      await api.delete(`squad/${id}/users?email=${payload}`).catch((error) => {error = error.data.message});
      await dispatch('gatherSquad', id);
      // await dispatch('gatherSquadList');
      // commit('UPDATE_SQUAD_ACTIVE', {});
    },

    async delYourself({dispatch, getters}) {
      const id = getters.getActiveId;
      const email = getters.getUserEmail;
      await api.delete(`squad/${id}/users?email=${email}`).catch((error) => {error = error.data.message});
      await dispatch('gatherSquadList');
      await dispatch('addSquadActive', {});
      // await dispatch('gatherSquadList');
      // commit('UPDATE_SQUAD_ACTIVE', {});
    },

    async addSquad({dispatch}, payload) {
      const req = await api.post('squad', payload).catch((error) => {error = error.data.message});
      const id = req.data.id;
      await dispatch('addYourself', id);
      await dispatch('gatherSquadList');
    },

    async updateSquad({commit, dispatch, getters}, payload) {
      const id = getters.getSquadActive.id;
      await api.put(`squad/${id}`, payload).catch((error) => {error = error.data.message});
      await dispatch('gatherSquad', id);
      // await dispatch('gatherSquadList');
      // commit('UPDATE_SQUAD_ACTIVE', id);
    },

    async addSquadActive({commit}, payload) {
      commit('ADD_SQUAD_ACTIVE', payload);
      // await dispatch('gatherUsers', payload.id);
    },
  },
}