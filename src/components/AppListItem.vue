<template>
  <div>
    <v-card class="mb-4">
      <v-card-title>{{ dataItem.name }} </v-card-title>
      <v-card-text>
        <div class="description">
          <span>{{ dataItem.description }}</span>
          <v-btn class="mt-3" @click.native="OpenDialog">details</v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog v-model="isOpen" scrollable max-width="1024px">
      <v-card v-if="viewDetail">
        <v-card-title class="teal white--text d-flex justify-space-between">
          {{ viewDetail.packageData.name }}
          <v-icon class="white--text close-icon" @click="isOpen = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-subtitle class="mt-4">
          <v-row>
            <v-col cols="9">
              <v-btn
                class="text-lowercase text-wrap mb-3"
                small
                depressed
                color="info"
                @click.prevent="openInNewLinkTab(viewDetail.links.npm)"
              >
                <v-icon class="mr-2"> mdi-open-in-new </v-icon>
                | {{ viewDetail.links.npm }}
              </v-btn>
            </v-col>

            <v-col class="text-right" cols="3">
              <v-icon class="mr-2">mdi-package</v-icon>
              {{ viewDetail.packageData.version }}
            </v-col>
          </v-row>
          <v-divider />
          <v-card-subtitle>
            <div class="descripton">
              {{ viewDetail.description }}
            </div>
            <div class="badge mt-3">
              <img :src="viewDetail.packageData.badge" alt="" />
            </div>
            <div class="author">
              {{ viewDetail.author.name }}
            </div>
          </v-card-subtitle>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return { isOpen: false };
  },
  props: {
    dataItem: {
      type: Object,
    },
  },
  methods: {
    OpenDialog(e) {
      e.preventDefault();
      this.$store.dispatch("fetchPackage", {
        name: this.dataItem.name,
        version: this.dataItem.version,
        description: this.dataItem.description,
        links: this.dataItem.links,
        author: this.dataItem.author,
      });
      this.isOpen = true;
    },
    openInNewLinkTab(link) {
      if (link) {
        window.open(link, "_blank");
      }
    },
  },
  computed: {
    viewDetail() {
      return this.$store.getters.viewDetail;
    },
  },
};
</script>
<style lang="scss" scoped>
.description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
