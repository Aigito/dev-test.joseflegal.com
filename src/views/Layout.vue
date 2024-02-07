<template>
  <div class="container">
    <h1>Vue.js layout</h1>
    <button class="button" v-on:click="toggleFilter">
      KITTENS RULEZ! Filter: {{ this.filterOn ? "On" : "Off" }}
    </button>
    <div class="card" v-for="file in files" :key="file.id">
      <Card>
        <template v-slot:card-image>
          <div class="card-image">
            <img :src="file.src" alt="picture of something cool" />
          </div>
        </template>
        <template v-slot:card-body>
          <div class="card-body">
            <span class="tag tag-aqua">
              {{ file.tags.split("|").join(" | ") }}
            </span>
            <h4>{{ file.filename }}</h4>
            <p>File Description: {{ file.description }}</p>
            <p>Created At: {{ formatDate(file.date) }}</p>
          </div>
        </template>
      </Card>
    </div>
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
  data() {
    return {
      filterOn: false,
    };
  },
  methods: {
    toggleFilter() {
      this.filterOn = !this.filterOn;
    },
    formatDate(date) {
      return new Date(date).toString().slice(4, 15);
    },
    filterAndSortFilesWithKittens() {
      const filesWithKittenTag = this.$store.state["file"].files.filter(
        (file) => file.tags.includes("kitten")
      );
      const sortedByDate = filesWithKittenTag.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      return sortedByDate;
    },
  },
  computed: {
    files() {
      if (this.filterOn) {
        return this.filterAndSortFilesWithKittens();
      } else {
        return this.$store.state["file"].files;
      }
    },
  },
  created() {
    this.$store.dispatch("file/fetchFiles").then((res) => {
      console.log("Files fetched: ", res);
    });
  },
};
</script>
