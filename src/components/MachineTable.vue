<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm" />

    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="Machine List"
      dense
      :rows="store.equipments"
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
                  v-model="editedItem.EquipmentName"
                  label="Machine Name"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.EquipmentType"
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
                  v-model="editedItem.PropertyCustodian"
                  label="Property Custodian"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.PlateNo"
                  label="Plate Number"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.Remarks"
                  label="Remarks"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.MaintenanceType"
                  label="Maintenance Type"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.MaintenanceDate"
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
                  v-model="editedItem.MaintenanceDesc"
                  label="Maintenance Description"
                  dense
                  class="q-pa-sm"
                  type="textarea"
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
import { useEquipmentInfo } from "../stores/Equipments";

export default {
  data() {
    return {
      filter: "",
      dialogVisible: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        EquipmentName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        PlateNumber: "",
        MaintenanceDtls: {
          0: {
            MaintenanceType: "",
            MaintenanceDate: "",
            MaintenanceDesc: "",
          },
        },
        Remarks: "",
      },
      defaultItem: {
        id: null,
        EquipmentName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        PlateNumber: "",
        MaintenanceDtls: {
          MaintenanceType: "",
          MaintenanceDate: "",
          MaintenanceDesc: "",
        },
        Remarks: "",
      },
      columns: [
        {
          name: "EquipmentName",
          required: true,
          label: "Equipment Name",
          align: "left",
          field: (row) => row.EquipmentName,
          format: (val) => `${val}`,
          sortable: true,
        },

        {
          name: "EquipmentType",
          label: "Equipment Type",
          field: "EquipmentType",
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
          name: "PropertyCustodian",
          label: "Property Custodian",
          field: "PropertyCustodian",
        },
        { name: "PlateNumber", label: "Plate Number", field: "PlateNumber" },
        { name: "remarks", label: "Remarks", field: "remarks" },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
        },
      ],
    };
  },
  methods: {
    Rowclick() {
      this.editedItem = {
        id: null,
        EquipmentName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        PlateNumber: "",
        MaintenanceDtls: {
          MaintenanceType: "",
          MaintenanceDate: "",
          MaintenanceDesc: "",
        },
        Remarks: "",
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
      const store = useEquipmentInfo();
      const editedItemCopy = { ...this.editedItem };
      console.log("edited item =>", editedItemCopy);

      if (editedItemCopy.id) {
        store.UpdateEquipment(editedItemCopy);
        console.log("Item Updated: ", editedItemCopy);
      } else {
        store.AddEquipment(editedItemCopy);
        console.log("save=", editedItemCopy);
      }



      // if (this.editedItem.id !== null) {
      //   const index = this.rows.findIndex(
      //     (item) => item.id === this.editedItem.id
      //   );
      //   if (index > -1) {
      //     this.rows[index] = { ...this.editedItem };
      //   }
      // } else {
      //   this.rows.push({ ...this.editedItem, id: this.getNextId() });
      // }
      this.closeDialog();
    },
    closeDialog() {
      this.editedItem = {
        id: null,
        EquipmentName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        PlateNumber: "",
        MaintenanceDtls: {
          MaintenanceType: "",
          MaintenanceDate: "",
          MaintenanceDesc: "",
        },
        Remarks: "",
      };
      this.dialogVisible = false;
    },
    getNextId() {
      const ids = this.rows.map((item) => item.id);
      return Math.max(...ids) + 1;
    },
  },

  setup() {
    const store = useEquipmentInfo();
    store.fetchEquipment();
    return {
      store,
      model: ref(null),
    };
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
