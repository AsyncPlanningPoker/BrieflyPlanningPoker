import { api } from '../services/api';

export default {
  state: {
    enabledTasks: [],

    disabledTasks: [],
  },

  getters: {
    getEnabledTasks(state) {
      return state.enabledTasks;
    },

    getDisabledTasks(state) {
      return state.disabledTasks;
    },
  },

  mutations: {
    ADD_ENABLED_TASKS(state, payload) {
      state.enabledTasks = payload;
    },

    ADD_DISABLED_TASKS(state, payload) {
      state.disabledTasks = payload;
    },
  },

  actions: {
    async gatherTasks({commit}, payload) {
      const enabledTasks = []; const disabledTasks = [];
      const req = await api.get(`/squad/${payload}/task`);
      req.data.forEach(el => el.active ? enabledTasks.push(el) : disabledTasks.push(el));
      commit('ADD_ENABLED_TASKS', enabledTasks);
      commit('ADD_DISABLED_TASKS', disabledTasks);
    },

    async addTask({getters, dispatch}, payload) {
      const id = getters.getActiveId;
      console.log(payload);
      await api.post(`/squad/${id}/task`, payload).catch((error) => {error = error.data.message});
      await dispatch('gatherTasks', id);
    },

    async disableTask({dispatch, getters}, payload) {
      const id = getters.getActiveId;
      await api.put(`/squad/${id}/task/${payload}/deactive`).catch((error) => {error = error.data.message});
      await dispatch('gatherTasks', id);
    },

    async deleteTask({dispatch, getters}, payload) {
      const id = getters.getActiveId;
      await api.delete(`/squad/${id}/task/${payload}`).catch((error) => {error = error.data.message});
      await dispatch('gatherTasks', id);
    }
  },
}