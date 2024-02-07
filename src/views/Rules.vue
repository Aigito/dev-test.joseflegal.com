<template>
  <div class="container">
    <h1>Rules engine</h1>
    <h2>Problem</h2>
    <p>
      At Josef, we use conversational bots to gather information from end-users
      to solve legal problems. We gather this information by asking the end-user
      a series of questions. To make the experience more efficient, we only ask
      questions that are relevant to that particular end-user’s problem.
    </p>
    <p>
      To achieve this, logic engine evaluates a user’s answers and decides what
      questions have to be asked next based on their previous answers.
    </p>
    <p>
      For example, if a user replies <strong>x</strong> to question
      <strong>A</strong>, there is no need to ask them question
      <strong>B</strong> and question <strong>C</strong> is asked straight away.
    </p>
    <h2>Implementation</h2>
    <img src="https://www.dropbox.com/s/efw0tf9ymnrk7ii/graph.png?dl=1" />
    <p>
      To implement this logic, we use a
      <a href="https://en.wikipedia.org/wiki/Directed_graph">directed graph</a>
      where questions represent nodes, and connections between nodes indicate
      which question will be asked next. Certain nodes/questions are connected
      to more than one node.
    </p>
    <p>
      To identify which connections to follow, each connection has a set of
      rules that evaluates previous answers. If there are no rules for the
      connection, it means that this connection must always be followed. If
      there is more than one rule, rules are grouped and logical operations are
      applied between them. Groups can contain subgroups for more complicated
      cases.
    </p>
    <p>
      <strong>0 rules example:</strong> question <strong>B</strong> is always
      followed by question <strong>C</strong>
    </p>
    <p>
      <strong>multiple rules example:</strong> question <strong>C</strong> is
      followed by question <strong>E</strong> if (user answer to question
      <strong>A</strong> is <strong>x</strong> <u>or</u> user answer to
      <strong>B</strong> is not <strong>y</strong>)
    </p>
    <p>
      <strong>multiple groups example:</strong> question <strong>C</strong> is
      followed by question <strong>D</strong> if ((user answer to question
      <strong>A</strong> is <strong>x</strong> <u>or</u> user answer to
      <strong>B</strong> is not <strong>y</strong>) <u>and</u> user answer to
      <strong>C</strong> contains <strong>z</strong>)
    </p>
    <p>
      Here is an example of the data structure that describes the
      <strong>multiple groups example</strong> above. Please, note how property
      <em>logic</em> determines logical operation between rules and groups.
    </p>
    <pre><code>rule_groups:{{ this.ruleGroups }}
rules:{{ this.rules }}</code></pre>
    <h2>Task</h2>
    <p>
      Please, finish the <em>checkGroup</em> function in the
      <u>src/views/Rules.vue</u> file, so it returns <em>true</em> if all rules
      and groups apply, otherwise <em>false</em>. Feel free to use already
      implemented function <em>checkRule</em> to check individual rules.
    </p>
    <h2>Result</h2>
    <p>With given user answers:</p>
    <pre>
<code>answers:{{ this.answers }}</code>
    </pre>
    <p><strong>multiple groups example</strong> is:</p>
    <pre>
<code v-if="ruleGroups">{{checkGroup(ruleGroups[1])}}</code>
      </pre>
  </div>
</template>
<style lang="scss" scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
}

code {
  width: 100%;
}

img {
  max-width: 50%;
  float: right;
}
</style>
<script>
// @ is an alias to /src

export default {
  name: "Rules",
  methods: {
    checkGroup(rule_group) {
      // cheking that rules and groups apply
      // returns true if all/any rules apply, depending on logic property

      //////////////////////////////////////////////////////
      // TODO: check that all rules and groups apply
      // ~10 - 15 lines of code

      // @return {Array} of unique rule ids sorted in asc order of question_id letter code
      let ruleIds = this.collectRuleIds(rule_group);

      for (const id of ruleIds) {
        let rule = this.rules[id];
        let question_id = rule.question_id;

        if (question_id === "B" && this.results["A"]) {
          continue;
        }

        let result = this.checkRule(rule);
        this.$store.dispatch("rule/saveResults", {
          question_id: question_id,
          result: result,
        });
      }

      // @return {Boolean} result for multiple group example
      return (this.results["A"] || this.results["B"]) && this.results["C"];
      // ////////////////////////////////////////////////////
    },
    checkRule(rule) {
      // cheking  that a rule applies
      // returns if combination of expected answer, operation and user answer is true

      try {
        if (rule.operation === "is") {
          return rule.expected_answer === this.answers[rule.question_id];
        } else if (rule.operation === "is not") {
          return rule.expected_answer !== this.answers[rule.question_id];
        } else if (rule.operation === "contains") {
          return this.answers[rule.question_id].includes(rule.expected_answer);
        }
      } catch (e) {
        console.error(e.message);
        return false;
      }
      return false;
    },
    collectRuleIds(rule_group) {
      // collects rule ids from both local and associated rule groups
      // returns a unique set of ids sorted by asc order

      let ids = [];
      const rulesArray = Object.keys(this.rules).map((key) => {
        return {
          id: key,
          question_id: this.rules[key].question_id,
        };
      });

      Array.prototype.push.apply(ids, rule_group.rule_ids);

      if (rule_group.rule_group_ids) {
        for (const group_id of rule_group.rule_group_ids) {
          Array.prototype.push.apply(ids, this.ruleGroups[group_id].rule_ids);
        }
      }

      let unsortedUniqueIds = Array.from(new Set(ids));

      return this.sortRuleIds(unsortedUniqueIds, rulesArray);
    },
    sortRuleIds(idsArray, rulesArray) {
      // sorts rule ids based on question_ids' letter code in asc order

      idsArray.sort((a, b) => {
        const questionA = rulesArray.find(
          (question) => question.id === a.toString()
        );
        const questionB = rulesArray.find(
          (question) => question.id === b.toString()
        );

        return questionA.question_id.localeCompare(questionB.question_id);
      });

      return idsArray;
    },
  },
  computed: {
    answers() {
      return this.$store.getters["rule/answers"];
    },
    results() {
      return this.$store.getters["rule/results"];
    },
    rules() {
      return this.$store.getters["rule/rules"];
    },
    ruleGroups() {
      return this.$store.getters["rule/rule_groups"];
    },
  },
  created() {
    // loading data from the API

    this.$store.dispatch("rule/fetchAnswers");
    this.$store.dispatch("rule/fetchRules");
    this.$store.dispatch("rule/fetchRuleGroups");
  },
};
</script>
