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
    <v-dialog v-model="opens" scrollable max-width="1024px">
      <v-card>
        <v-card-title class="teal white--text">
          test<v-icon class="white--text close-icon" @click="close">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-subtitle class="mt-4">
          <v-row>
            <v-col cols="9">
              <v-btn
                class="text-lowercase text-wrap"
                small
                depressed
                color="info"
                @click.prevent="openInNewLinkTab('http://localhost:8080')"
              >
                <v-icon class="mr-2"> mdi-open-in-new </v-icon>
                | http://localhost:8080
              </v-btn>
            </v-col>
            <v-col class="text-right" cols="3">
              <v-icon class="mr-2">mdi-package</v-icon> 3.3.2
            </v-col>
          </v-row>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
    <v-btn @click="dialogs">1 </v-btn>
  </div>
</template>
<script>
import AppListItem from "./AppListItem.vue";
export default {
  data() {
    return {
      page: 1,
      isLoading: false,
      opens: true,
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
  methods: {
    close() {
      this.isOpen = false;
    },
    openInNewLinkTab(link) {
      if (link) {
        window.open(link, "_blank");
      }
    },
    dialogs() {
      this.$store.dispatch("fetchPackage", { text: "JQ", version: "0.0.1" });
    },
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
