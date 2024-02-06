/* eslint-disable prettier/prettier */
import Vue from "vue";
import api from "@/api";

const rule = {
  namespaced: true,
  state: {
    rule_groups: false,
    answers: false,
    rules: false,
  },
  actions: {
    fetchAnswers({ commit }) {
      api.answers.get().then((res) => {
        commit("fetchAnswers", res);
      })
    },
  },
  mutations: {
    fetchAnswers(state, payload) {
      Vue.set(state, "answers", payload);
    },
  },
};

export default rule;
