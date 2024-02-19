<template>
  <div class="q-pa-md">
    <q-btn
      icon="add"
      color="green-10"
      label="Add Machine"
      @click="Rowclick"
      class="q-mb-sm"
      v-if="create('Machine Equipment')"
    />
    <q-btn
      label="Download CSV"
      flat
      class="q-mb-sm"
      style="color: green"
      @click="exportToExcel"
    ></q-btn>

    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="MACHINE LIST"
      dense
      :rows="filteredMachine"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[20]"
    >
      <template v-slot:top-right>
        <q-input
          color="green"
          style="margin-bottom: 20px"
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
            v-if="update('Machine Equipment')"
            icon="visibility"
            flat
            round
            color="green-8"
            style="margin-right: -10px"
            @click="editItem(row)"
          >
          </q-btn>
          <!-- <q-btn
            v-if="update('Machine Equipment')"
            icon="add"
            size="sm"
            round
            color="green"
            @click="viewItem(row)"
          >
            <q-tooltip class="">Create Maintenance</q-tooltip>
          </q-btn> -->

          <q-btn
            v-if="remove('Machine Equipment')"
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

    <!-- For the Delete of the Maintenance History -->
    <q-dialog
      v-model="MaintenanceDelete"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-red text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Delete Machine</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Do you want to delete this Machine?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            flat
            label="Cancel"
            size="small"
            color="orange"
            autofocus
            v-close-popup
          />
          <q-btn
            label="OK"
            flat
            color="green-5"
            v-close-popup
            @click="deleteItemConfirm()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- the main dialog -->
    <q-dialog v-model="dialogVisible" persistent>
      <q-card style="width: 30%; max-width: 80vw; height: 50%">
        <q-card-section>
          <div class="row">
            <div class="col-11 text-h6">MACHINE DETAILS</div>
            <div class="col-1">
              <q-btn
                flat
                round
                color="orange"
                icon="close"
                v-close-popup
                @click="this.isEditMode = false"
                v-show="exitBtn"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.MachineName"
                  :disable="maintenancehistory === !isEditMode"
                  label="Machine Name"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col-12">
                <div class="q-gutter-md">
                  <q-select
                    filled
                    v-model="editedItem.EquipmentType"
                    :disable="maintenancehistory === !isEditMode"
                    dense
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
                  :disable="maintenancehistory === !isEditMode"
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
                  v-model="editedItem.PlateNo"
                  :disable="maintenancehistory === !isEditMode"
                  label="Plate Number"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.Remarks"
                  :disable="maintenancehistory === !isEditMode"
                  label="Remarks"
                  dense
                  autogrow=""
                  class="q-pa-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" lass="q-mr-md">
          <q-btn
            flat
            icon="edit"
            color="orange"
            size="md"
            @click="toggleEditMode()"
            v-show="maintenancehistory"
          />
          <q-btn
            label="Save"
            color="green-5"
            size="md"
            v-close-popup
            @click="save"
            class="q-mr-md"
            :disable="maintenancehistory === !isEditMode"
          />
        </q-card-actions>
        <!-- <q-card class="q-px-lg q-pt-sm q-mb-md">
          <q-btn
            style="width: 100%"
            class="btn-fixed-width"
            color="green-10"
            label="VIEW MAINTENANCE HISTORY"
            icon="lightbulb_outline"
            @click="MaintenanceDialog = true"
            v-show="maintenancehistory"
          />
        </q-card> -->
      </q-card>

      <!-- DIALOG FOR MAINTENANCE -->
      <q-card
        style="width: 40%; max-width: 80vw; height: 50%"
        v-show="maintenancehistory"
      >
        <q-card-section style="max-height: " class="scroll">
          <div class="row">
            <div class="col-11 text-h6">MACHINE MAINTENANCE HISTORY</div>
            <div class="col-1">
              <q-btn
                flat
                round
                color="orange"
                icon="close"
                v-close-popup
                style="margin-bottom: -5px; margin-top: -5px"
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
          :rows="store.equipmenthistory"
          :columns="history"
          :filter="filters"
          row-key="_id"
        >
          <template v-slot:top-right>
            <q-input
              color="green"
              dense
              debounce="300"
              v-model="filters"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-left>
            <q-btn
              label="Add Maintenance"
              size="x-small"
              icon="add"
              @click="secondDialog = true"
              color="green-10"
            ></q-btn>
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
        <!-- <div style="position: absolute; bottom: 10px; right: 10px">
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
        </div> -->
      </q-card>
    </q-dialog>

    <!-- DIALOG FOR MAINTENANCE -->
    <q-dialog v-model="MaintenanceDialog" persistent=""> </q-dialog>

    <!-- Dialog for VIEWING EACH MACHINE MAINTENANCE HISTORY -->
    <q-dialog
      v-model="viewUpdateId"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="min-width: 50%">
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row text-h6">
            <div class="col-11">MAINTENANCE HISTORY VIEW</div>
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
              <!-- Display details from the selected row in the dialog -->
              <p>
                <b>DATE:</b> {{ formatDate(selectedUpdate.MaintenanceDate) }}
              </p>
              <p class="q-mb-sm"><b>TYPE: </b></p>
              <p class="q-ml-md">{{ selectedUpdate.MaintenanceType }}</p>
              <p class="q-mb-sm"><b>DESCRIPTION: </b></p>
              <p class="q-ml-md">{{ selectedUpdate.MaintenanceDesc }}</p>
              <p class="q-mb-sm"><b>PROOF:</b></p>
              <q-img
                style="height: 400px; max-width: 100%"
                :src="selectedUpdate.MaintenanceImageProof"
              />

              <!-- Add more details as needed -->
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="MachineDeleteHistory"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-red text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Delete Machine Maintenance History</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Do you want to delete this Machine Maintenance History?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            flat
            label="Cancel"
            size="small"
            color="orange"
            v-close-popup
            autofocus
          />
          <q-btn
            label="OK"
            flat
            color="green-5"
            size="small"
            v-close-popup
            @click="deleteMachineHistory()"
          />
        </q-card-actions>
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
          <div class="row text-h6">
            <div class="col-11">ADD MAINTENANCE</div>
            <div class="col-1">
              <q-btn flat round color="orange" icon="close" v-close-popup />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input
                filled
                v-model="MaintDtl.MaintenanceType"
                label="Maintenance Type"
                dense
                class="q-pa-sm"
              />
            </div>
            <div class="col">
              <q-input
                filled
                v-model="MaintDtl.MaintenanceDate"
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
                v-model="MaintDtl.MaintenanceImageProof"
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
                v-model="MaintDtl.MaintenanceDesc"
                label="Maintenance Description"
                dense
                class="q-pa-sm"
                type="textarea"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="warning" v-close-popup size="md" />
          <q-btn
            label="Save"
            color="green-10"
            size="md"
            v-close-popup
            @click="savehistory()"
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
import { useEquipmentInfo } from "../stores/EquipmentsStore";
import { useLoginStore } from "src/stores/LoginStore";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      selectedID: ref(""),
      MachineDeleteHistory: false,
      DeleteHistoryId: "",
      exitBtn: false,
      DeletedItem: [],
      DeleteId: "",
      viewUpdateId: false,
      selectedUpdate: null,
      maintenancehistory: true,
      myEquipments: [],
      filter: "",
      filters: "",
      isEditMode: false,
      MaintenanceDialog: false,
      dialogVisible: false,
      secondDialog: false,
      MaintenanceDelete: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        MachineName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        PlateNo: "",
        IsDeleted: false,
        MaintenanceDtls: {
          0: {
            MaintenanceType: "",
            MaintenanceDate: "",
            MaintenanceImageProof: "",
            MaintenanceDesc: "",
            IsDeleted: false,
          },
        },
        Remarks: "",
      },
      MaintDtl: [
        {
          MaintenanceType: "",
          MaintenanceDate: "",
          MaintenanceImageProof: "",
          MaintenanceDesc: "",
          IsDeleted: false,
        },
      ],
      defaultItem: {
        id: null,
        MachineName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        PlateNo: "",
        MaintenanceDtls: {
          MaintenanceType: "",
          MaintenanceDate: "",
          MaintenanceImageProof: "",
          MaintenanceDesc: "",
        },
        Remarks: "",
      },
      options: ["Heavy", "Light"],
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
          name: "PlateNo",
          align: "left",
          label: "PLATE / SERIAL NUMBER",
          field: "PlateNo",
        },
        {
          name: "MaintenanceDate",
          align: "left",
          label: "MAINTENANCE DATE",
          field: (row) => row.MaintenanceDate,
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
          field: (row) => row.MaintenanceDate,
          sortable: true,
        },
        {
          name: "MaintenanceType",
          align: "left",
          label: "Maintenance Type",
          field: (row) => row.MaintenanceType,
          sortable: true,
        },
        {
          name: "MaintenanceDesc",
          align: "left",
          label: "Maintenance Description",
          field: (row) => row.MaintenanceDesc,
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
        console.log(
          "maintenancedetails=",
          Object.values(this.editItem.MaintenanceDtls)
        );
        return Object.values(this.editedItem.MaintenanceDtls);
      } else {
        return {};
      }
    },
    filteredMachine() {
      const searchTerm = this.filter.toLowerCase();
      return this.store.equipments.filter((machine) => {
        const EquipmentType = machine.EquipmentType
          ? machine.EquipmentType.toLowerCase()
          : "";
        const MachineName = machine.MachineName
          ? machine.MachineName.toLowerCase()
          : "";
        const PropertyCustodian = machine.PropertyCustodian
          ? machine.PropertyCustodian.toLowerCase()
          : "";
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
          MaintenanceType.includes(searchTerm) ||
          MaintenanceDate.includes(searchTerm) ||
          MaintenanceDesc.includes(searchTerm)
        );
      });
    },
  },
  methods: {
    toggleEditMode() {
      console.log("toggleEditMode called");
      this.isEditMode = !this.isEditMode;
    },
    Rowclick() {
      this.maintenancehistory = false;
      this.exitBtn = true;

      this.editedItem = {
        id: null,
        MachineName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        IsDeleted: false,
        PlateNo: "",
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
      this.selectedID = item._id;
      this.maintenancehistory = true;
      this.exitBtn = false;
      const store = useEquipmentInfo();

      store.GetEquipment(item._id).then((res) => {
        this.editedItem = store.equipment;
        // store.fetchEquipment();
        console.log("sdasda=", this.editedItem);
      });

      store.GetEquipmentmaintenanceDetails(item._id);

      this.dialogVisible = true;
    },

    viewItem(item) {
      this.MaintenanceDialog = true;
      const store = useEquipmentInfo();

      store.GetEquipment(item._id).then((res) => {
        this.editedItem = store.equipment;

        // store.fetchEquipment();
        console.log("sdasda11=", this.editedItem);
      });

      this.dialogVisible = false;
    },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      // const store = useEquipmentInfo();
      // store.DeleteEquipment(id._id).then((res) => {
      //   store.fetchEquipment();
      // });
      this.DeletedItem = id;
      this.DeleteId = id._id;
      this.MaintenanceDelete = true;
    },

    deleteItemConfirm() {
      const editedItemCopy = { ...this.editedItem };
      // console.log("Delete Item ID => ", this.DeleteId);
      const store = useEquipmentInfo();
      editedItemCopy.IsDeleted = true;

      store.DeleteEquipment(this.DeleteId, this.DeletedItem).then((res) => {
        store.fetchEquipment();
      });
    },

    deleteMaintenance(maintenanceid) {
      this.DeleteHistoryId = maintenanceid;
      this.MachineDeleteHistory = true;
      console.log(
        "EQUIPMENT ID AND Maintenance ID =>",
        this.selectedID + "----" + this.DeleteHistoryId
      );
    },

    deleteMachineHistory() {
      console.log("Machine Maintenance ID =>", this.DeleteHistoryId);
      const store = useEquipmentInfo();
      store
        .DeleteMaintenance(this.selectedID, this.DeleteHistoryId)
        .then((req) => {
          store.fetchEquipment();
          store.GetEquipmentmaintenanceDetails(this.selectedID).then((res) => {
            this.editedItem = store.equipment
            // store.GetEquipmentmaintenanceDetails()
            store.fetchEquipment()
          });
        });
    },

    // VIEWING OF EACH MAINTENANCE HISTORY
    viewUpdate(row) {
      this.selectedUpdate = row;
      this.viewUpdateId = true;
    },

    viewAllMaintenance(id) {
      console.log(`nisulod sa viewAllMaintenance with ID` + id);

      const store = useEquipmentInfo();
      store.GetEquipmentmaintenanceDetails(id).then((res) => {
        this.MaintDtl = res.data;
      });
    },

    save() {
      const store = useEquipmentInfo();
      const editedItemCopy = { ...this.editedItem };
      console.log("edited item =>", editedItemCopy._id);

      if (editedItemCopy._id) {
        store
          .UpdateEquipment(editedItemCopy._id, editedItemCopy)
          .then((res) => {
            this.editedItem = {
              MachineName: "",
              EquipmentType: "",
              PropertyCustodian: "",
              IsDeleted: false,
              PlateNo: "",
              Remarks: "",
            };
            store.fetchEquipment().then((res) => {
              this.closeDialog();
              this.isEditMode = false;
            });
          });
        console.log("Item Updated: ", editedItemCopy);
      } else {
        store.AddEquipment(editedItemCopy).then((res) => {
          this.editedItem = {
            id: null,
            MachineName: "",
            EquipmentType: "",
            PropertyCustodian: "",
            IsDeleted: false,
            PlateNo: "",
            // MaintenanceDtls: {
            //   MaintenanceType: "",
            //   MaintenanceDate: "",
            //   MaintenanceDesc: "",
            // },
            Remarks: "",
          };
          store.fetchEquipment().then((res) => {
            this.closeDialog();
          });
        });
        console.log("save=", editedItemCopy);
      }
    },
    // handleImageChange(event) {
    //   // Handle image selection
    //   console.log("event=", event);
    //   this.editedItem.MaintenanceDtls.MaintenanceImageProof =
    //     event.target.files[0];
    // },
    //   handleImageChange(event) {
    //   // Ensure that event and event.target are defined
    //   if (event && event.target) {
    //     // Access files property if available
    //     const selectedFile = event.target.files ? event.target.files[0] : null;

    //     // Update MaintenanceImageProof if a file is selected
    //     if (selectedFile) {
    //       this.editedItem.MaintenanceDtls.MaintenanceImageProof = selectedFile;
    //     } else {
    //       // Handle the case when no file is selected
    //       console.error('No file selected.');
    //     }
    //   } else {
    //     // Handle the case when event or event.target is undefined
    //     console.error('Invalid event object.');
    //   }
    // },
    savehistory() {
      console.log("ID NAKO >> ", this.selectedID);
      const store = useEquipmentInfo();

      const formData = new FormData();
      formData.append("MaintenanceType", this.MaintDtl.MaintenanceType);
      formData.append("MaintenanceDate", this.MaintDtl.MaintenanceDate);
      formData.append("file", this.MaintDtl.MaintenanceImageProof);
      formData.append("MaintenanceImageProof", "");
      formData.append("MaintenanceDesc", this.MaintDtl.MaintenanceDesc);

      store.UploadImage(this.selectedID, formData).then((res) => {
        //   //store.GetEquipment(id._id);
        store.GetEquipmentmaintenanceDetails(this.selectedID);

          store.fetchEquipment();
      });

      // let res=axios.post(`http://10.0.1.23:5000/api/Equipments/" + ${{id}}+ "/maintenance`, {

      //   body: formData,
      // })
      //   .then((response) => response.json())
      //   .then((imageData) => {
      //     console.log ("mao ni=>", imageData)
      //     // Now, `imageData` should contain information about the uploaded image, including its filename
      //     const editedItemCopy = {
      //       ...this.editedItem.MaintenanceDtls,
      //       MaintenanceImageProof: `Q:\\Engineering\\server\\public\\uploads\\equipments\\${imageData.fileName}`,
      //     };

      //     // Save maintenance history with the received image URL
      //     store.AddMaintenance(id._id, editedItemCopy);
      //     store.fetchEquipment().then(() => {
      //       store.GetEquipment(id._id).then(() => {
      //         this.editedItem = store.equipment;
      //         store.fetchEquipment();

      //       });
      //     });
      //   })
      //   .catch((error) => {
      //     console.error("Error uploading image:", error);
      //   });

      // const editedItemCopy = { ...this.editedItem.MaintenanceDtls };
      // store.AddMaintenance(id._id, editedItemCopy);
      // store.fetchEquipment().then((res) => {
      //   store.GetEquipment(id._id).then((res1) => {
      //     this.editedItem = store.equipment;
      //     store.fetchEquipment();
      //   });
      // });
    },
    // savehistory(id) {
    //   console.log("ID NAKO >> ", id._id);
    //   const store = useEquipmentInfo();
    //   const editedItemCopy = { ...this.editedItem.MaintenanceDtls };
    //   store.AddMaintenance(id._id, editedItemCopy);
    //   store.fetchEquipment().then((res) => {
    //     store.GetEquipment(id._id).then((res1) => {
    //       this.editedItem = store.equipment;
    //       store.fetchEquipment();
    //     });
    //   });
    // },
    closeDialog() {
      this.editedItem = {
        id: null,
        MachineName: "",
        EquipmentType: "",
        PropertyCustodian: "",
        PlateNo: "",
        MaintenanceDtls: {
          MaintenanceType: "",
          MaintenanceDate: "",
          MaintenanceImageProof: "",
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
        ...this.filteredMachine.map((row) => [
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
      XLSX.utils.book_append_sheet(wb, ws, "Machine Data");

      // Save the workbook as a .xlsx file
      XLSX.writeFile(wb, "Machine_Data.xlsx");
    },
  },

  setup() {
    const store = useEquipmentInfo();
    store.fetchEquipment();
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
