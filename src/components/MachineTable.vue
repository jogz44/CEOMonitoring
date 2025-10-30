<template>
  <div class="q-pa-md">
    <q-btn
      icon="add"
      color="green-10"
      label="Add Machine"
      @click="ShowNewMachineDialog"
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
      title="EQUIPMENT LIST"
      dense
      wrap-cells=""
      :rows="MachineList"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[20]"
      :filter="filters"
    >
      <template v-slot:top-right>
        <q-input
          color="green"
          style="margin-bottom: 20px"
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

      <template #body="props">
        <q-tr :v-bind="props">
          <q-td key="EquipmentCategory" style="font-size: 11px" align="left">
            {{ props.row.EquipmentCategory }}
          </q-td>
          <q-td key="EquipmentType" style="font-size: 11px" align="left">
            {{ props.row.EquipmentType }}
          </q-td>
          <q-td key="BodyNo" style="font-size: 11px" align="left">
            {{ props.row.BodyNo }}
          </q-td>
          <q-td key="PlateNo" style="font-size: 11px" align="left">
            {{ props.row.PlateNo }}
          </q-td>
          <q-td key="SerialNo" style="font-size: 11px" align="left">
            {{ props.row.SerialNo }}
          </q-td>
          <q-td key="Operator" style="font-size: 11px" align="left">
            {{ props.row.Operator }}
          </q-td>
          <q-td key="DateAquired" style="font-size: 11px" align="left">
            {{ formatDate(props.row.DateAquired) }}
          </q-td>
          <q-td key="Cost" style="font-size: 11px" align="left">
            {{ formatCost(props.row.Cost) }}
          </q-td>
          <q-td key="actions" style="font-size: 11px" align="left">
            <div class="actionsbtn">
              <q-btn
                v-if="update('Machine Equipment')"
                icon="visibility"
                flat
                round
                color="green-8"
                style="margin-right: -10px"
                @click="ShowItem(props.row._id)"
              >
              </q-btn>
              <q-btn
                v-if="remove('Machine Equipment')"
                icon="delete"
                flat
                round
                color="deep-orange"
                @click="deleteItem(props.row)"
              >
              </q-btn>
            </div>
          </q-td>
        </q-tr>
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
      <q-card style="width: 500px; max-width: 80vw; height: 85vh" class="">
        <q-toolbar class="q-pa-md">
          <q-toolbar-title
            ><span class="text-weight-bold"
              >MACHINE DETAILS</span
            ></q-toolbar-title
          >

          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
            color="orange"
            @click="this.isEditMode = false"
            v-show="exitBtn"
          />
        </q-toolbar>

        <!-- <q-card-section>
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
        </q-card-section> -->
        <q-separator />

        <q-card-section style="max-height: 70vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col-12">
                <q-select
                  ref="equipmentCategory"
                  dense
                  v-model="editedItem.EquipmentCategory"
                  filled
                  label="Equipment Category"
                  class="q-pa-sm q-mb-sm"
                  :options="itemtype"
                ></q-select>
                <!-- <q-input
                  ref="machinename"
                  :rules="[this.required]"
                  lazy-rules
                  filled
                  v-model="editedItem.MachineName"
                  :disable="maintenancehistory === !isEditMode"
                  label="Machine Name"
                  dense
                  class="q-pa-sm q-mb-sm"
                /> -->
              </div>
              <div class="col-12">
                <div class="q-gutter-md">
                  <q-select
                    ref="equipmentType"
                    :rules="[this.required]"
                    lazy-rules
                    filled
                    v-model="MachineDetails.EquipmentType"
                    :disable="maintenancehistory === !isEditMode"
                    dense
                    class="q-pa-sm q-mb-sm"
                    :options="options"
                    label="Equipment Type"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-input
                  v-model="MachineDetails.MachineName"
                  ref="machinename"
                  :rules="[this.required]"
                  lazy-rules
                  filled
                  :disable="maintenancehistory === !isEditMode"
                  label="Equipment Description / Name"
                  dense
                  class="q-pa-sm q-mb-sm"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  v-model="MachineDetails.BodyNo"
                  ref="bodyno"
                  :rules="[this.required]"
                  lazy-rules
                  filled
                  :disable="maintenancehistory === !isEditMode"
                  label="Body No."
                  dense
                  class="q-pa-sm q-mb-sm"
                />
              </div>
              <div class="col">
                <q-input
                  v-model="MachineDetails.SerialNo"
                  ref="serialno"
                  :rules="[this.required]"
                  lazy-rules
                  filled
                  :disable="maintenancehistory === !isEditMode"
                  label="Serial No."
                  dense
                  class="q-pa-sm q-mb-sm"
                />
              </div>
              <div class="col">
                <q-input
                  ref="plateno"
                  :rules="[this.required]"
                  lazy-rules
                  filled
                  v-model="MachineDetails.PlateNo"
                  :disable="maintenancehistory === !isEditMode"
                  label="Plate No."
                  dense
                  class="q-pa-sm q-mb-sm"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  ref="propertyCustodian"
                  :rules="[this.required]"
                  lazy-rules
                  filled
                  v-model="MachineDetails.PropertyCustodian"
                  :disable="maintenancehistory === !isEditMode"
                  label="Property Custodian"
                  dense
                  class="q-pa-sm q-mb-sm"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  ref="operator"
                  :rules="[this.required]"
                  lazy-rules
                  filled
                  v-model="MachineDetails.Operator"
                  :disable="maintenancehistory === !isEditMode"
                  label="Operator"
                  dense
                  class="q-pa-sm q-mb-sm"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  v-model="MachineDetails.DateAquired"
                  ref="acquireddate"
                  :rules="[this.required]"
                  lazy-rules
                  filled
                  :disable="maintenancehistory === !isEditMode"
                  label="Date Acquired"
                  dense
                  class="q-pa-sm q-mb-sm"
                  type="date"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  v-model="MachineDetails.Cost"
                  ref="cost"
                  filled
                  :disable="maintenancehistory === !isEditMode"
                  label="Cost"
                  dense
                  class="q-pa-sm q-mb-sm"
                  type="number"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-input
                  filled
                  v-model="MachineDetails.Remarks"
                  :disable="maintenancehistory === !isEditMode"
                  label="Remarks"
                  dense
                  autogrow
                  class="q-pa-sm"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <q-file
                  filled
                  ref="MachineImg"
                  v-model="file_input"
                  @update:model-value="onImageSelected"
                  :disable="maintenancehistory === !isEditMode"
                  label="Attach Equipment Image"
                  dense
                  class="q-pa-sm"
                >
                  <template v-slot:prepend>
                    <q-icon class="text-orange" name="attach_file" />
                  </template>
                </q-file>
              </div>
              <div class="col-12">
                <q-img
                  v-if="editedItem.EquipmentImage"
                  :src="editedItem.EquipmentImage"
                  style="max-width: 300px; max-height: 300px"
                  class="q-ma-sm q-mb-sm"
                  fit="scale-down"
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
        style="width: 500px; max-width: 80vw; height: 85vh"
        class="q-ml-xs"
        v-show="maintenancehistory"
      >
        <q-toolbar class="q-pa-md">
          <q-toolbar-title
            ><span class="text-weight-bold"
              >MAINTENANCE HISTORY</span
            ></q-toolbar-title
          >
          <q-btn flat dense icon="close" v-close-popup color="orange" />
        </q-toolbar>
        <q-separator></q-separator>

        <!-- <q-card-section style="max-height: " class="scroll">
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
        </q-card-section> -->
        <q-card-section>
          <q-table
            class="my-sticky-header-table"
            flat
            bordered
            title=""
            wrap-cells=""
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
        </q-card-section>
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
        <!-- <q-card-section>
          <div class="row text-h6">
            <div class="col-11">ADD MAINTENANCE</div>
            <div class="col-1">
              <q-btn flat round color="orange" icon="close" v-close-popup />
            </div>
          </div>
        </q-card-section> -->

        <q-toolbar>
          <q-toolbar-title
            ><span class="text-weight-bold"
              >ADD MAINTENANCE</span
            ></q-toolbar-title
          >
          <q-btn flat round dense icon="close" v-close-popup color="orange" />
        </q-toolbar>
        <q-separator />

        <q-card-section>
          <div class="row">
            <div class="col-6 col-xs-12 col-sm-6">
              <q-input
                ref="maintenanceType"
                :rules="[this.required]"
                lazy-rules
                filled
                v-model="MaintDtl.MaintenanceType"
                label="Maintenance Type"
                dense
                class="q-pa-sm q-mb-sm"
              />
            </div>
            <div class="col-6 col-xs-12 col-sm-6">
              <q-input
                ref="maintenanceDate"
                :rules="[this.required]"
                lazy-rules
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
                ref="maintenanceProof"
                :rules="[this.requiredProof]"
                lazy-rules
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
                ref="maintenanceDesc"
                :rules="[this.required]"
                lazy-rules
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
            @click="savehistory()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      MachineDetails: {},
      MachineMaintenanceDetails: {},
      MachineList: [],
      MachineMaintenanceList: [],
      file_input: null,
      preview_img: null,
      dialogVisible: false,
      isEditMode: false,
      exitBtn: true,
      secondDialog: false,
      MaintenanceDialog: false,
      maintenancehistory: false,
      MaintenanceDelete: false,
      MachineDeleteHistory: false,
      viewUpdateId: false,
      selectedUpdate: {},
      filters: "",

      options: ["Heavy", "Light"],
      itemtype: ["Machinery", "Vehicle"],
    };
  },
  computed: {
    maintenancedetailsOptions() {
      if (this.editedItem.MaintenanceDtls) {
        console.log(
          "maintenancedetails=",
          Object.values(this.editItem.MaintenanceDtls),
        );
        return Object.values(this.editedItem.MaintenanceDtls);
      } else {
        return {};
      }
    },
  },

  methods: {
    formatDate(val) {
    if (!val) return "";
    const d = new Date(val);
    if (isNaN(d)) return "";
    return d.toISOString().split("T")[0]; // → "2025-10-29"
  },
    formatCost(val) {
      if (!val) return "₱0.00";
      const num = parseFloat(val.$numberDecimal || val);
      if (isNaN(num)) return "₱0.00";
      return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
      }).format(num);
    },

    async ShowItem(payload) {
      console.log("ShowItem payload:", payload);
      try {
        await this.Equipmentstore.GetEquipment(payload);
        this.MachineDetails = this.Equipmentstore.equipment;
        console.log("MachineDetails:", this.MachineDetails);
      } catch (error) {
        console.error("Error showing item:", error);
        this.$q.notify({
          type: "negative",
          message: "Failed to show item." + error.message,
        });
      }
    },

    ShowNewMachineDialog() {
      this.dialogVisible = true;
    },

    async getMachineList() {
      try {
        await this.Equipmentstore.fetchEquipment();
        this.MachineList = this.Equipmentstore.equipments;
      } catch (error) {
        console.error("Error fetching machine list:", error);
        this.$q.notify({
          type: "negative",
          message: "Failed to fetch machine list." + error.message,
        });
      }
    },

    onImageSelected(file) {
      // when user uploads a new file
      if (file && file instanceof File) {
        this.preview_img = URL.createObjectURL(file);
        //console.log("preview_img:", this.preview_img);
        // create a preview URL
        this.MachineDetails.EquipmentImage = file;
        // console.log("file selected:",  this.editedItem.EquipmentImage);
      } else if (!file) {
        this.preview_img = "";
        // if cleared, remove image
        this.MachineDetails.EquipmentImage = "";
      }
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

  created() {
    this.getMachineList();
  },

  setup() {
    const Equipmentstore = useEquipmentInfo();
    const loginstore = useLoginStore();

    //REMOVE FUNCTION
    function remove(module) {
      const userCredentials = loginstore.user.Credentials;
      const moduleCredentials = userCredentials.find(
        (cred) => cred.Module === module,
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
        (cred) => cred.Module === module,
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
        (cred) => cred.Module === module,
      );
      // console.log("credentials=", moduleCredentials);
      if (moduleCredentials.Create) {
        return true;
      } else {
        return false;
      }
    }

    return {
      Equipmentstore,
      loginstore,
      remove,
      update,
      create,
      columns: [
        {
          name: "EquipmentCategory",
          label: "CATEGORY",
          field: "EquipmentCategory",
          align: "left",
          sortable: true,
        },
        {
          name: "EquipmentType",
          label: "TYPE",
          field: "EquipmentType",
          align: "left",
          sortable: true,
        },
        {
          name: "BodyNo",
          align: "left",
          label: "BODY #",
          field: "BodyNo",
        },
        {
          name: "PlateNo",
          align: "left",
          label: "PLATE #",
          field: "PlateNo",
        },
        {
          name: "SerialNo",
          align: "left",
          label: "SERIAL #",
          field: "SerialNo",
        },
        {
          name: "Operator",
          label: "OPERATOR",
          field: "Operator",
          align: "left",
        },
        {
          name: "DateAquired",
          label: "DATE ACQUIRED",
          field: "DateAquired",
          align: "left",
          format: (val) => {
            if (!val) return ""; // null/undefined/empty -> ""
            const d = new Date(val);
            if (Number.isNaN(d.getTime())) return ""; // invalid date -> ""
            return d.toLocaleDateString(); // valid -> formatted (change as needed)
          },
        },
        {
          name: "Cost",
          label: "COST",
          field: "Cost",
          align: "left",
          format: (val) => {
            const num = parseFloat(val); // safely convert string -> number
            if (isNaN(num)) return "₱0.00"; // handle invalid or null values
            return new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 2,
            }).format(num);
          },
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
