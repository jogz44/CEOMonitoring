<template>
  <q-card>
    <q-card-section>
      <div>
        <q-table :columns="cols" :rows="row" row-key="id" :filter="findData">
         <template #body="props">
           <q-tr :v-bind="props">
             <q-td key="_id">
                {{ props.row._id }}
             </q-td>
              <q-td key="Description">
                  {{ props.row.Description }}
              </q-td>
           </q-tr>
         </template>
        </q-table>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="q-pa-md">

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
    DataHolder:{
      type:Array,
      required:true,
    }
  },
  setup() {
    // Your setup code here
  return {
    cols: [
      {
        name: "_id",
        align: "left",
        label: "#",
      },
      {
        name: "Description",
        align: "left",
        label: "Description",
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
    this.row = []
    this.row = this.DataHolder;
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
