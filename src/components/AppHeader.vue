<template>
  <div>
    <v-app-bar color="blue">
      <v-row class="d-flex justify-space-between">
        <v-col>
          <search-input v-on:toggle="searchName($event)" />
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>
<script>
import SearchInput from "./SearchInput.vue";
export default {
  components: { SearchInput },
  methods: {
    searchName(event) {
      this.$emit("toggleSearch", event);
    },
  },
};
</script>
