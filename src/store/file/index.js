import Vue from "vue";
import api from "@/api";

const file = {
  namespaced: true,
  state: {
    files: [],
  },
  getters: {
    getFiles: (state) => {
      return state.files;
    },
  },
  actions: {
    fetchFiles({ commit }) {
      return api.files.get().then((res) => {
        commit("fetchFiles", res);
        return res;
      });
    },
  },
  mutations: {
    fetchFiles(state, payload) {
      Vue.set(state, "files", payload);
    },
  },
};

export default file;
