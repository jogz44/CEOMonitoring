<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm" />

    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="IT Equipment List"
      dense
      :rows="store.itequipments"
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

      <template v-slot:body-cell-MaintenanceType="{ row }">
        <q-td>
          {{ row.MaintenanceDtls[0].MaintenanceType }}
        </q-td>
      </template>
      <template v-slot:body-cell-MaintenanceDate="{ row }">
        <q-td>
          {{ formatDate(row.MaintenanceDtls[0].MaintenanceDate) }}
        </q-td>
      </template>
      <template v-slot:body-cell-MaintenanceDesc="{ row }">
        <q-td>
          {{ row.MaintenanceDtls[0].MaintenanceDesc }}
        </q-td>
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
            @click="deleteItem(row)"
          >
          </q-btn>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="dialogVisible" persistent>
      <q-card style="width: 30%; height: 60%">
        <q-card-section>
          <div class="text-h6">IT Equipment Details</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.MachineName"
                  label="Equipment Name"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col-12">
                <div class="q-gutter-md">
                  <q-select
                    filled
                    v-model="editedItem.EquipmentType"
                    dense
                    use-input
                    class="q-pa-sm"
                    :options="options"
                    label="Equipment Type"
                  />
                </div>
                <!-- <q-input
                  filled
                  v-model="editedItem.EquipmentType"
                  label="Equipment Type"
                  dense
                  class="q-pa-sm"
                /> -->
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
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.SerialNo"
                  label="Serial Number"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.Remarks"
                  label="Remarks"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup size="md" />
          <q-btn
            label="Save"
            color="secondary"
            size="md"
            v-close-popup
            @click="save"
          />
        </q-card-actions>
      </q-card>

      <q-card style="width: 50%; height: 60%">
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="text-h6">
            Equipment Maintenance History
            <q-btn label="Add Maintenance" @click="secondDialog = true"></q-btn>
          </div>
        </q-card-section>
        <q-table
          class="my-sticky-header-table"
          flat
          bordered
          title=""
          dense
          :rows="store.itequipment.MaintenanceDtls"
          :columns="history"
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

          <template v-slot:body-cell-MaintenanceType="{ row }">
            <q-td>
              {{ row.MaintenanceType }}
            </q-td>
          </template>
          <template v-slot:body-cell-MaintenanceDate="{ row }">
            <q-td>
              {{ formatDate(row.MaintenanceDate) }}
            </q-td>
          </template>
          <template v-slot:body-cell-MaintenanceDesc="{ row }">
            <q-td>
              {{ row.MaintenanceDesc }}
            </q-td>
          </template>

          <template v-slot:body-cell-actions="{ row }">
            <div class="actionsbtn">
              <q-btn
                icon="delete"
                flat
                round
                color="deep-orange"
                @click="deleteMaintenance(editedItem._id, row._id)"
              >
              </q-btn>
            </div>
          </template>
        </q-table>
        <q-separator />
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="width: 500px">
        <q-card-section>
          <div class="text-h6">Add Maintenance</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input
                filled
                v-model="editedItem.MaintenanceDtls.MaintenanceType"
                label="Maintenance Type"
                dense
                class="q-pa-sm"
              />
            </div>
            <div class="col">
              <q-input
                filled
                v-model="editedItem.MaintenanceDtls.MaintenanceDate"
                label="Maintenance Date"
                dense
                class="q-pa-sm"
                type="date"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                filled
                v-model="editedItem.MaintenanceDtls.MaintenanceDesc"
                label="Maintenance Description"
                dense
                class="q-pa-sm"
                type="textarea"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup size="md" />
          <q-btn
            label="Save"
            color="secondary"
            size="md"
            v-close-popup
            @click="savehistory(editedItem)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- For the Delete of the Maintenance -->

    <!-- <q-dialog
      v-model="MaintenanceDelete"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Delete Maintenance</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Do you want to delete this Machine Maintenance History?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" color="red" v-close-popup />
          <q-btn label="OK" color="secondary" v-close-popup @click="deleteMaintenance(editedItem._id,editedItem.MaintenanceDtls._id )" />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </div>
</template>

<script>
import { ref } from "vue";
import { useITEquipmentInfo } from "../stores/ItStore";

export default {
  data() {
    return {
      myEquipments: [],
      filter: "",
      dialogVisible: false,
      secondDialog: false,
      MaintenanceDelete: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        MachineName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        SerialNo: "",
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
        MachineName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        SerialNo: "",
        MaintenanceDtls: {
          MaintenanceType: "",
          MaintenanceDate: "",
          MaintenanceDesc: "",
        },
        Remarks: "",
      },
      options: [
        "Computer",
        "Multi-function Printer",
        "Laptop",
        "Projector",
        "Mouse",
        "Telephone",
        "Network Items",
      ],
      // filterFn(val, update) {
      //   if (val === "") {
      //     update(() => {
      //       this.options.value = options;
      //     })
      //     return
      //   }
      //   update(() => {
      //     const needle = val.toLowerCase()
      //     options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      //   })
      // },
      columns: [
        {
          name: "MachineName",
          required: true,
          label: "Machine Name",
          align: "left",
          field: (row) => row.MachineName,
          format: (val) => `${val}`,
          sortable: true,
        },

        {
          name: "EquipmentType",
          label: "Equipment Type",
          field: "EquipmentType",
          align: "left",
          sortable: true,
        },
        {
          name: "PropertyCustodian",
          label: "Property Custodian",
          field: "PropertyCustodian",
          align: "left",
        },
        {
          name: "SerialNo",
          align: "left",
          label: "Serial Number",
          field: "SerialNo",
        },
        {
          name: "MaintenanceDate",
          align: "left",
          label: "Maintenance Date",
          field: "row.MaintenanceDtls.MaintenanceDate",
          sortable: true,
        },
        {
          name: "MaintenanceType",
          align: "left",
          label: "Maintenance Type",
          field: "row.MaintenanceDtls.MaintenanceType",
          sortable: true,
        },
        // {
        //   name: "MaintenanceDesc",
        //   align: "left",
        //   label: "Maintenance Description",
        //   field: "row.MaintenanceDtls.MaintenanceDesc",
        //   sortable: true,
        // },

        // { name: "Remarks", align: "left", label: "Remarks", field: "Remarks" },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
        },
      ],
      history: [
        {
          name: "MaintenanceDate",
          align: "left",
          label: "Maintenance Date",
          field: "MaintenanceDate",
          sortable: true,
        },
        {
          name: "MaintenanceType",
          align: "left",
          label: "Maintenance Type",
          field: "MaintenanceType",
          sortable: true,
        },
        {
          name: "MaintenanceDesc",
          align: "left",
          label: "Maintenance Description",
          field: "MaintenanceDesc",
          sortable: true,
        },
        {
          name: "actions",
          align: "left",
          label: "Action",
          field: "actions",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    // MaintenanceDelete1(id){
    //   this.MaintenanceDelete=true;
    //   console.log("Delete =>", id._id)
    // },

    Rowclick() {
      this.editedItem = {
        id: null,
        MachineName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        SerialNo: "",
        MaintenanceDtls: {
          MaintenanceType: "",
          MaintenanceDate: "",
          MaintenanceDesc: "",
        },
        Remarks: "",
      };
      this.dialogVisible = true;
    },
    formatDate(value) {
      if (!value) return "";

      const date = new Date(value);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    editItem(item) {
      const store = useITEquipmentInfo();

      store.GetITEquipment(item._id).then((res) => {
        this.editedItem = store.itequipment;
        store.fetchITEquipment();
        console.log("sdasda=", this.editedItem);
      });
      this.dialogVisible = true;
    },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      const store = useITEquipmentInfo();
      store.DeleteITEquipment(id._id).then((res) => {
        store.fetchITEquipment();
      });
    },

    deleteMaintenance(id, maintenanceid) {
      console.log("Maintenance ID =>", id + "----" + maintenanceid);

      // const store = useEquipmentInfo();
      // store.DeleteMaintenance(id._id, maintenanceid).then((res) => {
      //   store.GetEquipment(id._id);
      // });

      const store = useITEquipmentInfo();
      // const editedItemCopy = { ...this.editedItem.MaintenanceDtls };
      store.DeleteITMaintenance(id, maintenanceid).then((req) => {
        store.fetchITEquipment();
        store.GetITEquipment(id);
      });
    },

    save() {
      const store = useITEquipmentInfo();
      const editedItemCopy = { ...this.editedItem };
      console.log("edited item =>", editedItemCopy._id);

      if (editedItemCopy._id) {
        store
          .UpdateITEquipment(editedItemCopy._id, editedItemCopy)
          .then((res) => {
            this.editedItem = {
              MachineName: "",
              EquipmentType: "",
              PropertyCustodian: "",
              SerialNo: "",
              Remarks: "",
            };
            store.fetchITEquipment().then((res) => {
              this.closeDialog();
            });
          });
        console.log("Item Updated: ", editedItemCopy);
      } else {
        store.AddITEquipment(editedItemCopy).then((res) => {
          this.editedItem = {
            id: null,
            MachineName: "",
            EquipmentType: "",
            PropertyCustodian: "",
            SerialNo: "",
            // MaintenanceDtls: {
            //   MaintenanceType: "",
            //   MaintenanceDate: "",
            //   MaintenanceDesc: "",
            // },
            Remarks: "",
          };
          store.fetchITEquipment().then((res) => {
            this.closeDialog();
          });
        });
        console.log("save=", editedItemCopy);
      }
    },
    savehistory(id) {
      console.log("ID NAKO >> ", id._id);
      const store = useITEquipmentInfo();
      const editedItemCopy = { ...this.editedItem.MaintenanceDtls };
      store.AddITMaintenance(id._id, editedItemCopy);
      store.fetchITEquipment().then((res) => {
        store.GetITEquipment(id._id).then((res1) => {
          this.editedItem = store.itequipment;
          store.fetchITEquipment();
        });
      });
    },
    closeDialog() {
      this.editedItem = {
        id: null,
        MachineName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        SerialNo: "",
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
    const store = useITEquipmentInfo();
    store.fetchITEquipment();

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
