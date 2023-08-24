<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm" />

    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="Machine List"
      dense
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="id"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-actions="{ row }">
        <div class="actionsbtn">
          <q-btn
            icon="edit"
            flat
            round
            color="secondary"
            @click="editItem(row)"
          >
          </q-btn>
          <q-btn
            icon="delete"
            flat
            round
            color="deep-orange"
            @click="deleteItem(row.id)"
          >
          </q-btn>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="dialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Machine Details</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.name"
                  label="Machine Name"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.maintenanceDate"
                  label="Maintenance Date"
                  dense
                  class="q-pa-sm"
                  type="date"
                  mask="YYYY-MM-DD"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.equipmentType"
                  label="Equipment Type"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.remarks"
                  label="Remarks"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Save" color="secondary" v-close-popup @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      sample: "hello world",
      filter: "",
      dialogVisible: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        maintenanceDate: "",
        equipmentType: "",
        remarks: "",
      },
      defaultItem: {
        name: "",
        maintenanceDate: "",
        equipmentType: "",
        remarks: "",
      },

      columns: [
        {
          name: "name",
          required: true,
          label: "Machine Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "maintenanceDate",
          align: "center",
          label: "Maintenance Date",
          field: "maintenanceDate",
          sortable: true,
        },
        {
          name: "equipmentType",
          label: "Equipment Tyoe",
          field: "equipmentType",
          sortable: true,
        },
        { name: "remarks", label: "Remarks", field: "remarks" },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
        },
      ],
      rows: [
        {
          id: 1,
          name: "Machine 1",
          maintenanceDate: "2023-02-12",
          equipmentType: "Machine Type 1",
          remarks: "Not Applicable",
        },
      ],
    };
  },
  methods: {
    Rowclick() {
      this.editedItem = {
        id: null,
        name: "",
        maintenanceDate: "",
        equipmentType: "",
        remarks: "",
      };
      this.dialogVisible = true;
    },
    editItem(item) {
      this.editedItem = { ...item };
      this.dialogVisible = true;
    },

    deleteItem(id) {
      const index = this.rows.findIndex((item) => item.id === id);
      if (index > -1) {
        this.rows.splice(index, 1);
      }
    },

    save() {
      if (this.editedItem.id !== null) {
        const index = this.rows.findIndex(
          (item) => item.id === this.editedItem.id
        );
        if (index > -1) {
          this.rows[index] = { ...this.editedItem };
        }
      } else {
        this.rows.push({ ...this.editedItem, id: this.getNextId() });
      }
      this.closeDialog();
    },
    closeDialog() {
      this.editedItem = {
        id: null,
        name: "",
        maintenanceDate: "",
        equipmentType: "",
        remarks: "",
      };
      this.dialogVisible = false;
    },
    getNextId() {
      const ids = this.rows.map((item) => item.id);
      return Math.max(...ids) + 1;
    },
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  margin: 10px;
}
/* .actionsbtn {
  margin-left: 90px;
} */
</style>
