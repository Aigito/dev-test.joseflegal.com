import Vue from "vue";
import api from "@/api";

const rule = {
  namespaced: true,
  state: {
    answers: false,
    results: {},
    rules: false,
    rule_groups: false,
  },
  getters: {
    answers: (state) => state.answers,
    results: (state) => state.results,
    rules: (state) => state.rules,
    rule_groups: (state) => state.rule_groups,
  },
  actions: {
    fetchAnswers({ commit }) {
      api.answers.get().then((res) => {
        commit("fetchAnswers", res);
      });
    },
    fetchRules({ commit }) {
      api.rules.get().then((res) => {
        commit("fetchRules", res);
      });
    },
    fetchRuleGroups({ commit }) {
      api.rule_groups.get().then((res) => {
        commit("fetchRuleGroups", res);
      });
    },
    saveResults({ commit }, { question_id, result }) {
      commit("saveResults", { question_id, result });
    },
  },
  mutations: {
    fetchAnswers(state, payload) {
      Vue.set(state, "answers", payload);
    },
    fetchRules(state, payload) {
      Vue.set(state, "rules", payload);
    },
    fetchRuleGroups(state, payload) {
      Vue.set(state, "rule_groups", payload);
    },
    saveResults(state, { question_id, result }) {
      state.results[question_id] = result;
    },
  },
};

export default rule;
