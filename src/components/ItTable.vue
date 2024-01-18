<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm"  v-if="create('IT Equipment')" />
    <q-btn
      label="Convert to Excel"
      flat
      class="q-mb-sm"
      style="color: green"
      @click="exportToExcel"
    ></q-btn>
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="IT EQUIPMENT LIST"
      dense
      :rows="filteredIT"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[20]"
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
          {{
            row.MaintenanceDtls[0]
              ? row.MaintenanceDtls[0].MaintenanceType
              : null
          }}
        </q-td>
      </template>
      <template v-slot:body-cell-MaintenanceDate="{ row }">
        <q-td>
          {{
            row.MaintenanceDtls[0]
              ? formatDate(row.MaintenanceDtls[0].MaintenanceDate)
              : null
          }}
        </q-td>
      </template>
      <template v-slot:body-cell-MaintenanceDesc="{ row }">
        <q-td>
          {{
            row.MaintenanceDtls[0]
              ? row.MaintenanceDtls[0].MaintenanceDesc
              : null
          }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="{ row }">
        <div class="actionsbtn">
          <q-btn
          v-if="update('IT Equipment')"
            icon="add"
            size="sm"
            round
            color="green"
            @click="viewItem(row)"
          >
          </q-btn>
          <q-btn
          v-if="update('IT Equipment')"
            icon="edit"
            flat
            round
            color="secondary"
            @click="editItem(row)"
          >
          </q-btn>
          <q-btn
          v-if="remove('IT Equipment')"
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

    <!-- DIALOG FOR DETAILS -->
    <q-dialog v-model="dialogVisible" persistent>
      <q-card style="width: 40%; height: auto">
        <q-card-section>
          <div class="text-h6">IT EQUIPMENT DETAILS</div>
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
        <q-card-actions align="right" class="q-mr-md">
          <q-btn flat label="Cancel" color="orange" v-close-popup size="md" />
          <q-btn
            label="Save"
            color="green-5"
            size="md"
            v-close-popup
            @click="save"
          />
        </q-card-actions>
        <q-card class="q-px-lg q-pt-sm q-mb-md">
          <q-btn
            style="width: 100%"
            class="btn-fixed-width"
            color="green-10"
            label="VIEW MAINTENANCE HISTORY"
            icon="lightbulb_outline"
            @click="ITMaintenanceDialog = true"
            v-show="maintenancehistory"
          />
        </q-card>
      </q-card>
    </q-dialog>

    <!-- DIALOG FOR MAINTENANCE -->
    <q-dialog v-model="ITMaintenanceDialog" persistent>
      <q-card style="width: 50%; height: 45%">
        <q-card-section class="scroll">
          <div class="row text-h6">
            <div class="col-11">IT MAINTENANCE HISTORY</div>
            <div class="col-1">
              <q-btn
                flat
                round
                color="orange"
                icon="close"
                @click="this.ITMaintenanceDialog = false"
              />
            </div>
          </div>
        </q-card-section>
        <q-table
          class="my-sticky-header-table"
          flat
          bordered
          title=""
          dense
          :rows="maintenancedetailsOptions"
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
                icon="visibility"
                flat
                round
                color="green"
                @click="viewUpdate(row)"
              >
              </q-btn>
              <q-btn
                icon="delete"
                flat
                round
                color="deep-orange"
                @click="deleteMaintenance(row._id)"
              >
              </q-btn>
            </div>
          </template>
        </q-table>

        <q-separator />
        <div style="position: absolute; bottom: 10px; right: 10px">
          <q-btn
            label=""
            size="15px"
            @click="secondDialog = true"
            icon="add"
            color="green-10"
            round
            style="position: absolute; bottom: 0; right: 0"
            ><q-tooltip class="white"
              >Create new Maintenance History</q-tooltip
            ></q-btn
          >
        </div>
      </q-card>
    </q-dialog>

    <!-- Dialog for vIEWING EACH IT EQUIPMENT MAINTENANCE HISTORY -->
    <q-dialog
      v-model="viewUpdateId"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="min-width: 50%">
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row text-h6">
            <div class="col-11">IT EQUIPMENT MAINTENANCE HISTORY VIEW</div>
            <div class="col-1">
              <q-btn
                flat
                round
                color="orange"
                icon="close"
                @click="this.viewUpdateId = false"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col-12">
              <p><b>DATE:</b> {{ formatDate(selectedUpdate.MaintenanceDate) }}</p>
              <p class="q-mb-sm"><b>TYPE: </b></p>
              <p class="q-ml-md">{{ selectedUpdate.MaintenanceType }}</p>
              <p class="q-mb-sm"><b>DESCRIPTION: </b></p>
              <p class="q-ml-md">{{ selectedUpdate.MaintenanceDesc }}</p>
              <p class="q-mb-sm"><b>PROOF:</b></p>
              <q-img style="height: auto; max-width: auto" :src="selectedUpdate.MaintenanceImage" />
            </div>
          </div>
        </q-card-section>
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
          <div class="text-h6">ADD MAINTENANCE</div>
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
          <!-- image for update/edit -->
          <div class="row">
            <div class="col">
              <q-file
                filled
                v-model="editedItem.MaintenanceDtls.MaintenanceImage"
                hint="Maintenance Proof"
                use-chips
                dense
                class="q-pa-sm q-mb-sm"
                accept=".jpg, image/*"
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
          <q-btn flat label="Cancel" color="orange" v-close-popup size="md" />
          <q-btn
            label="Save"
            color="green-5"
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
import { useLoginStore } from "src/stores/LoginStore";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      viewUpdateId: false,
      selectedUpdate: null,
      maintenancehistory: true,
      myEquipments: [],
      filter: "",
      ITMaintenanceDialog: false,
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
            MaintenanceImage: "",
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
          MaintenanceImage: "",
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
      columns: [
        {
          name: "MachineName",
          required: true,
          label: "MACHINE NAME",
          align: "left",
          field: (row) => row.MachineName,
          format: (val) => `${val}`,
          sortable: true,
        },

        {
          name: "EquipmentType",
          label: "EQUIPMENT TYPE",
          field: "EquipmentType",
          align: "left",
          sortable: true,
        },
        {
          name: "PropertyCustodian",
          label: "PROPERTY CUSTODIAN",
          field: "PropertyCustodian",
          align: "left",
        },
        {
          name: "SerialNo",
          align: "left",
          label: "SERIAL NUMBER",
          field: "SerialNo",
        },
        {
          name: "MaintenanceDate",
          align: "left",
          label: "MAINTENANCE DATE",
          field: "row.MaintenanceDtls.MaintenanceDate",
          sortable: true,
        },
        {
          name: "MaintenanceType",
          align: "left",
          label: "MAINTENANCE TYPE",
          field: "row.MaintenanceDtls.MaintenanceType",
          sortable: true,
        },
        {
          name: "actions",
          label: "ACTIONS",
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
  computed: {
    maintenancedetailsOptions() {
      if (this.editedItem.MaintenanceDtls) {
        // console.log("maintenancedetails=",Object.values(this.editItem.MaintenanceDtls))
        return Object.values(this.editedItem.MaintenanceDtls);
      } else {
        return {};
      }
    },
    filteredIT() {
      const searchTerm = this.filter.toLowerCase();
      return this.store.itequipments.filter((machine) => {
        const EquipmentType = machine.EquipmentType
          ? machine.EquipmentType.toLowerCase()
          : "";
        const MachineName = machine.MachineName
          ? machine.MachineName.toLowerCase()
          : "";
        const PropertyCustodian = machine.PropertyCustodian
          ? machine.PropertyCustodian.toLowerCase()
          : "";
        const SerialNo = machine.SerialNo ? machine.SerialNo.toLowerCase() : "";
        const MaintenanceDtls = machine.MaintenanceDtls[0] || {}; // Assuming there's at least one employment detail

        const MaintenanceType = MaintenanceDtls.MaintenanceType
          ? MaintenanceDtls.MaintenanceType.toLowerCase()
          : "";
        const MaintenanceDate = MaintenanceDtls.MaintenanceDate
          ? MaintenanceDtls.MaintenanceDate.toLowerCase()
          : "";
        const MaintenanceDesc = MaintenanceDtls.MaintenanceDesc
          ? MaintenanceDtls.MaintenanceDesc.toLowerCase()
          : "";

        return (
          EquipmentType.includes(searchTerm) ||
          MachineName.includes(searchTerm) ||
          PropertyCustodian.includes(searchTerm) ||
          SerialNo.includes(searchTerm) ||
          MaintenanceType.includes(searchTerm) ||
          MaintenanceDate.includes(searchTerm) ||
          MaintenanceDesc.includes(searchTerm)
        );
      });
    },
  },
  methods: {
    // MaintenanceDelete1(id){
    //   this.MaintenanceDelete=true;
    //   console.log("Delete =>", id._id)
    // },

    Rowclick() {
      this.maintenancehistory = false;
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
      this.maintenancehistory = true;
      const store = useITEquipmentInfo();

      store.GetITEquipment(item._id).then((res) => {
        this.editedItem = store.itequipment;
        // store.fetchITEquipment();
        console.log("sdasda=", this.editedItem);
      });
      console.log("thisthis=", this.editedItem.MaintenanceDtls);
      this.dialogVisible = true;
    },
    viewItem(item) {
      this.ITMaintenanceDialog = true;
      const store = useITEquipmentInfo();

      store.GetITEquipment(item._id).then((res) => {
        this.editedItem = store.itequipment;
        // store.fetchEquipment();
        console.log("sdasda=", this.editedItem);
      });
      this.dialogVisible = false;
    },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      const store = useITEquipmentInfo();
      store.DeleteITEquipment(id._id).then((res) => {
        store.fetchITEquipment();
      });
    },

    deleteMaintenance(maintenanceid) {
      console.log("editeditem=", this.editedItem);
      const id = this.editedItem._id;
      console.log("Maintenance ID =>", id + "----" + maintenanceid);

      // const store = useEquipmentInfo();
      // store.DeleteMaintenance(id._id, maintenanceid).then((res) => {
      //   store.GetEquipment(id._id);
      // });

      const store = useITEquipmentInfo();
      // const editedItemCopy = { ...this.editedItem.MaintenanceDtls };
      store.DeleteITMaintenance(id, maintenanceid).then((req) => {
        store.fetchITEquipment();
        store.GetITEquipment(id).then((res) => {
          this.editedItem = store.itequipment;
        });
      });
    },
    viewUpdate(row) {
      this.selectedUpdate = row;
      this.viewUpdateId = true;
      // this.viewUpdateId = true;
      // const id = this.editedItem._id;

      // const store = useStoreProjectInfo();
      // store.GetProject(id);
    },

    save() {
      const store = useITEquipmentInfo();
      const editedItemCopy = { ...this.editedItem };
      console.log("edited item =>", editedItemCopy);

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

      const formData = new FormData();
      formData.append(
        "MaintenanceType",
        this.editedItem.MaintenanceDtls.MaintenanceType
      );
      formData.append(
        "MaintenanceDate",
        this.editedItem.MaintenanceDtls.MaintenanceDate
      );
      formData.append("file", this.editedItem.MaintenanceDtls.MaintenanceImage);
      formData.append("MaintenanceImageProof", "");
      formData.append(
        "MaintenanceDesc",
        this.editedItem.MaintenanceDtls.MaintenanceDesc
      );
      store.UploadImage(id._id, formData).then((res) => {
        store.GetITEquipment(id._id).then((res) => {
          this.editedItem = store.itequipment;
        });
      });
    },
    // savehistory(id) {
    //   console.log("ID NAKO >> ", id._id);
    //   const store = useITEquipmentInfo();
    //   const editedItemCopy = { ...this.editedItem.MaintenanceDtls };
    //   store.AddITMaintenance(id._id, editedItemCopy);
    //   store.fetchITEquipment().then((res) => {
    //     store.GetITEquipment(id._id).then((res1) => {
    //       this.editedItem = store.itequipment;
    //       store.fetchITEquipment();
    //     });
    //   });
    // },
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
    exportToExcel() {
      const data = [
        [
          "EquipmentType",
          "MachineName",
          "PropertyCustodian",
          "MaintenanceType",
          "MaintenanceDate",
          "MaintenanceDesc",
        ],
        ...this.filteredIT.map((row) => [
          row.EquipmentType || "",
          row.MachineName || "",
          row.PropertyCustodian || "",
          row.MaintenanceDtls[0]?.MaintenanceType || "",
          this.formatDate(row.MaintenanceDtls[0]?.MaintenanceDate) || "",
          row.MaintenanceDtls[0]?.MaintenanceDesc || "",
        ]),
      ];

      // Create a workbook with a worksheet
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "IT Equipment Data");

      // Save the workbook as a .xlsx file
      XLSX.writeFile(wb, "ItEquipment_Data.xlsx");
    },
  },

  setup() {
    const store = useITEquipmentInfo();
    store.fetchITEquipment();
    const loginstore = useLoginStore();

    //REMOVE FUNCTION
    function remove(module) {
      const userCredentials = loginstore.user.Credentials;
      const moduleCredentials = userCredentials.find(
        (cred) => cred.Module === module
      );
      // console.log("credentials=", moduleCredentials);
      if (moduleCredentials.Remove) {
        return true;
      } else {
        return false;
      }
    }
    //EDIT FUNCTION
    function update(module) {
      const userCredentials = loginstore.user.Credentials;
      const moduleCredentials = userCredentials.find(
        (cred) => cred.Module === module
      );
      // console.log("credentials=", moduleCredentials);
      if (moduleCredentials.Update) {
        return true;
      } else {
        return false;
      }
    }
    //CREATE FUNCTION
    function create(module) {
      const userCredentials = loginstore.user.Credentials;
      const moduleCredentials = userCredentials.find(
        (cred) => cred.Module === module
      );
      // console.log("credentials=", moduleCredentials);
      if (moduleCredentials.Create) {
        return true;
      } else {
        return false;
      }
    }

    return {
      remove,
      update,
      create,
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
