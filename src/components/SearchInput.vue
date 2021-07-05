<template>
  <div>
    <v-text-field
      flat
      solo-inverted
      hide-details
      label="Search packages"
      v-model="search"
      clearable
    ></v-text-field>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  watch: {
    search(newSearch, oldSearch) {
      if (newSearch !== oldSearch) {
        const data = { text: this.search };
        this.$store.dispatch("search", data);
        this.$emit("toggle", data);
      }
    },
  },
};
</script>
