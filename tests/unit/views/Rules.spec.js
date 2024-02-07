import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Rules from "@/views/Rules.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Rules", () => {
  let ruleGroup, store, wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        rule: {
          namespaced: true,
          state: {
            answers: false,
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
          },
          mutations: {
            setAnswer: (state, { id, value }) => {
              state.answers[id] = value;
            },
          },
          getters: {
            answers: (state) => {
              return state.answers;
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

    ruleGroup = store._modulesNamespaceMap["rule/"].state.rule_groups[1];
  });

  describe("returns correct boolean result when", () => {
    it("A is true && C is true (B is skipped)", () => {
      let result = wrapper.vm.checkGroup(ruleGroup);
      expect(result).toBe(true);
      // TODO: Expect, result to not have B in it
    });

    it("A is true && C is false (B is skipped)", () => {
      store.commit("rule/setAnswer", {
        id: "C",
        value: "abcdefghijklmnopqrstuvwxy",
      });
      let result = wrapper.vm.checkGroup(ruleGroup);
      expect(result).toBe(false);
      // TODO: Expect, result to not have B in it
    });

    it("(A is false || B is true) && C is true", () => {
      store.commit("rule/setAnswer", { id: "A", value: "not x" });
      let result = wrapper.vm.checkGroup(ruleGroup);
      expect(result).toBe(true);
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

    // TODO: If A and B are both false, C should not have been evaluated and the test stops
  });
});
