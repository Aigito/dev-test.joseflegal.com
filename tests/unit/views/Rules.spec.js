import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Rules from "@/views/Rules.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Rules", () => {
  let ruleGroup, store, storeState, wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        rule: {
          namespaced: true,
          state: {
            answers: false,
            results: {},
            rules: false,
            rule_groups: false,
          },
          actions: {
            // TODO: See if can replace the methods below with using 'api'
            fetchAnswers: jest.fn(() => {
              store._modulesNamespaceMap["rule/"].state.answers = {
                C: "abcdefghijklmnopqrstuvwxyz",
                A: "x",
                B: "Y",
                D: "foo bar",
              };
            }),
            fetchRules: jest.fn(() => {
              store._modulesNamespaceMap["rule/"].state.rules = {
                1: {
                  expected_answer: "z",
                  operation: "contains",
                  question_id: "C",
                },
                2: {
                  expected_answer: "x",
                  operation: "is",
                  question_id: "A",
                },
                3: {
                  expected_answer: "y",
                  operation: "is not",
                  question_id: "B",
                },
              };
            }),
            fetchRuleGroups: jest.fn(() => {
              store._modulesNamespaceMap["rule/"].state.rule_groups = {
                1: {
                  logic: "all",
                  rule_ids: [1],
                  rule_group_ids: [2],
                },
                2: {
                  logic: "any",
                  rule_ids: [2, 3],
                  rule_group_ids: [],
                },
              };
            }),
            saveResults: jest.fn(({ commit }, { question_id, result }) => {
              commit("saveResults", { question_id, result });
            }),
          },
          mutations: {
            setAnswer: (state, { id, value }) => {
              state.answers[id] = value;
            },
            saveResults: (state, { question_id, result }) => {
              state.results[question_id] = result;
            },
          },
          getters: {
            answers: (state) => {
              return state.answers;
            },
            results: (state) => {
              return state.results;
            },
            rules: (state) => {
              return state.rules;
            },
            rule_groups: (state) => {
              return state.rule_groups;
            },
          },
        },
      },
    });

    wrapper = shallowMount(Rules, {
      localVue,
      store,
    });

    storeState = store._modulesNamespaceMap["rule/"].state;
    ruleGroup = storeState.rule_groups[1];
  });

  describe("#checkGroup", () => {
    describe("returns true when", () => {
      it("A is true && C is true; Question B is also skipped", () => {
        let result = wrapper.vm.checkGroup(ruleGroup);
        expect(storeState.results).not.toHaveProperty("B");
        expect(result).toBe(true);
      });

      it("(A is false || B is true) && C is true", () => {
        store.commit("rule/setAnswer", { id: "A", value: "not x" });
        let result = wrapper.vm.checkGroup(ruleGroup);
        expect(result).toBe(true);
      });
    });

    describe("returns false when", () => {
      it("A is true && C is false; Question B is also skipped", () => {
        store.commit("rule/setAnswer", {
          id: "C",
          value: "abcdefghijklmnopqrstuvwxy",
        });
        let result = wrapper.vm.checkGroup(ruleGroup);
        expect(storeState.results).not.toHaveProperty("B");
        expect(result).toBe(false);
      });

      it("(A is false || B is true) && C is false", () => {
        store.commit("rule/setAnswer", { id: "A", value: "not x" });
        store.commit("rule/setAnswer", {
          id: "C",
          value: "abcdefghijklmnopqrstuvwxy",
        });
        let result = wrapper.vm.checkGroup(ruleGroup);
        expect(result).toBe(false);
      });

      it("(A is false || B is false) && C is true", () => {
        store.commit("rule/setAnswer", { id: "A", value: "not x" });
        store.commit("rule/setAnswer", { id: "B", value: "y" });
        let result = wrapper.vm.checkGroup(ruleGroup);
        expect(result).toBe(false);
      });

      it("A, B and C are all false", () => {
        store.commit("rule/setAnswer", { id: "A", value: "not x" });
        store.commit("rule/setAnswer", { id: "B", value: "y" });
        store.commit("rule/setAnswer", {
          id: "C",
          value: "abcdefghijklmnopqrstuvwxy",
        });
        let result = wrapper.vm.checkGroup(ruleGroup);
        expect(result).toBe(false);
      });
    });
  });
});
