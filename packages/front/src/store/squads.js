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
    ADD_SQUAD(state, payload) {
      state.squadList = [...state.squadList, payload];
    },

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

    async gatherUsers({commit}, id) {
      const req = await api.get(`squad/${id}/users`);
      const reqdata = req.data;
      commit('ADD_USERS', reqdata);
    },

    async addOwner({dispatch, getters}, id) {
      const email = getters.getUserEmail;
      await api.post(`squad/${id}/users`, {"email":email, "owner":true}).catch((error) => {error = error.data.message});
      await dispatch('gatherSquadList');
    },

    async addUser({commit, dispatch, getters}, payload) {
      const id = getters.getActiveId;
      await api.post(`squad/${id}/users`, {"email":payload, "owner":false}).catch((error) => {error = error.data.message});
      await dispatch('gatherSquadList');
      commit('UPDATE_SQUAD_ACTIVE', id);
    },

    async leaveSquad({dispatch, getters}, payload) {
      const id = getters.getSquadActive.id;
      await api.delete(`squad/${id}/users/${payload.email}`).catch((error) => {error = error.data.message});
      await dispatch('gatherSquadList');
      dispatch('addSquadActive', {});
    },

    async addSquad({dispatch}, payload) {
      const req = await api.post('squad', payload).catch((error) => {error = error.data.message});
      const id = req.data.id;
      await dispatch('addOwner', id);
      dispatch('gatherSquadList');
    },

    async updateSquad({commit, dispatch, getters}, payload) {
      const id = getters.getSquadActive.id;
      await api.put(`squad/${id}`, payload).catch((error) => {error = error.data.message});
      await dispatch('gatherSquadList');
      commit('UPDATE_SQUAD_ACTIVE', id);
    },

    async addSquadActive({commit, dispatch}, payload) {
      commit('ADD_SQUAD_ACTIVE', payload);
      await dispatch('gatherUsers', payload.id);
    },
  },
}