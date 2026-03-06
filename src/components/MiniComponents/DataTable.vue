<template>
  <q-card>
    <q-card-section>
      <div>
        <q-table :columns="cols" :rows="row" row-key="id" :filter="findData">
        </q-table>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="q-pa-md">
        <component :is="module + 'Table'"></component>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    module:{
      type:String,
      required:true,
    },
  },
  setup() {
    // Your setup code here
  return {
    cols: [
      {
        name: "name",
        align: "left",
        label: "NAME",
        field: "name",
      }
    ],
    row: [],
  }


  },
  data() {
    return {
      // Your data here
    };
  },
  computed: {
    // Your computed properties here
  },
  methods: {
    // Your methods here
  },
  mounted() {
    // Lifecycle hook
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
