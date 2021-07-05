<template>
  <div>
    <v-card class="mb-4">
      <v-card-title>{{ dataItem.name }} </v-card-title>
      <v-card-text>
        <div class="description">
          <span>{{ dataItem.description }}</span>
          <v-btn class="mt-3">details</v-btn>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog> </v-dialog>
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
  methods: {},
};
</script>
<style lang="scss" scoped>
.description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
