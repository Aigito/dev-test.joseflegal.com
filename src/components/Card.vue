<template>
  <div>
    <div class="container">
      <button class="button" v-on:click="toggleFilter">KITTENS RULEZ!</button>
      <div class="card" v-for="file in filteredFiles" :key="file.id">
        <div class="card-image">
          <img :src="file.src" alt="hi" />
        </div>
        <div class="card-body">
          <span class="tag tag-aqua">
            {{ file.tags.split("|").join(" | ") }}
          </span>
          <h4>{{ file.filename }}</h4>
          <p>File Description: {{ file.description }}</p>
          <p>Created At: {{ formattedDate(file.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterOn: false,
    };
  },
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleFilter() {
      this.filterOn = !this.filterOn;
    },
    formattedDate(date) {
      return new Date(date).toString().slice(4, 15);
    },
    filterAndSortKittenFiles() {
      const filteredFiles = this.files.filter((file) =>
        file.tags.includes("kitten")
      );
      const sortedByDate = filteredFiles.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      return sortedByDate;
    },
  },
  computed: {
    filteredFiles() {
      if (this.filterOn) {
        return this.filterAndSortKittenFiles();
      } else {
        return this.files;
      }
    },
  },
};
</script>

<style lang="scss">
.container {
  display: block;
}

.card {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-image {
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 250px;
}

.tag {
  background-color: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
}

.tag-aqua {
  background-color: $josef-aqua;
}

.tag-purple {
  background-color: $josef-purple;
}

.tag-light-red {
  background-color: $josef-light-red;
}
</style>
