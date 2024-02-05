<template>
  <div class="container">
    <h1>Vue.js layout</h1>
    <code>
      <Card></Card>
    </code>
  </div>
</template>
<style lang="scss" scoped>
.container {
  max-width: 1024px;
  margin: 0 auto;
}

pre,
code {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: pre-wrap;
  line-break: anywhere;
}
</style>
<script>
// @ is an alias to /src

// import Card component
import Card from "@/components/Card.vue";

export default {
  name: "Layout",
  components: {
    Card,
  },
  created() {
    this.$store.dispatch("file/fetchFiles").then((res) => {
      console.log("Files fetched: ", res);
    });
  },
};
</script>
