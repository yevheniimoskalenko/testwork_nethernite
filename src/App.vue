<template>
  <v-app>
    <app-header v-on:toggleSearch="search($event)" />
    <v-main>
      <v-container> <app-list :searchText="searchText" /> </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import AppList from "@/components/AppList";
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    AppList,
  },
  data() {
    return {
      searchText: null,
    };
  },
  methods: {
    search(event) {
      this.searchText = event;
    },
  },
};
</script>
