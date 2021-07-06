<template>
  <div>
    <app-list-item
      v-for="item in searchItems"
      :key="item.name"
      :dataItem="item"
    />

    <v-pagination
      v-if="searchItems.length > 0"
      v-model="page"
      class="my-4"
      total-visible="7"
      :length="totalItems"
    ></v-pagination>
  </div>
</template>
<script>
import AppListItem from "./AppListItem.vue";
export default {
  data() {
    return {
      page: 1,
      isLoading: false,
    };
  },
  props: {
    searchText: {
      type: Object,
    },
  },
  components: {
    AppListItem,
  },
  computed: {
    searchItems() {
      return this.$store.getters.tableItems;
    },
    totalItems() {
      const total = this.$store.getters.total;
      return Math.floor(total / 10);
    },
  },
  watch: {
    page(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$store.dispatch("search", {
          page: this.page,
          text: this.searchText.text,
        });
      }
    },
  },
};
</script>
