import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Rules from "@/views/Rules.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Rules", () => {
  let store, wrapper;

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
        },
      },
    });

    wrapper = shallowMount(Rules, {
      localVue,
      store,
    });
  });

  it("test", () => {
    expect(store._modulesNamespaceMap["rule/"].state.answers).toBeTruthy();
  });

  it("test2", () => {
    expect(store._modulesNamespaceMap["rule/"].state.answers["A"]).toBe("x");
  });

  it("test3", () => {
    wrapper.vm.increase();

    expect(wrapper.vm.count).toBe(1);
  });
});
