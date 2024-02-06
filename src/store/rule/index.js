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
    fetchRules({ commit }) {
      api.rules.get().then((res) => {
        commit("fetchRules", res);
      })
    },
  },
  mutations: {
    fetchAnswers(state, payload) {
      Vue.set(state, "answers", payload);
    },
    fetchRules(state, payload) {
      Vue.set(state, "rules", payload);
    },
  },
};

export default rule;
