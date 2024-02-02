<template>
  <div>
    <div v-for="file in files" :key="file.id">
      <img :src="file.src" alt="hi" />
      <p>File Name: {{ file.filename }}</p>
      <p>File Tag: {{ file.tags }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
