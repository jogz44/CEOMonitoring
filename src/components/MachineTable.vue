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
      :filter="Machinefilters"
    >
      <template v-slot:top-right>
        <q-input
          color="green"
          style="margin-bottom: 20px"
          dense
          debounce="300"
          v-model="Machinefilters"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template #body="props">
        <q-tr :v-bind="props">
          <q-td key="index" style="font-size: 11px" align="left">
            {{ props.rowIndex + 1 }}
          </q-td>
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
                @click="
                  (ShowItem(props.row._id),
                  ShowMaintenanceHistory(props.row._id))
                "
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
            @click="deleteMachineHistory()"
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
                  v-model="MachineDetails.EquipmentCategory"
                  filled
                  :disable="maintenancehistory === !isEditMode"
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
                  prefix="₱"
                  @blur="formatCost"
                  @focus="unformatCost"
                  inputmode="decimal"
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
                  v-if="MachineDetails.EquipmentImage"
                  :src="displayImage()"
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
            @click="toggleEditMode"
            v-show="maintenancehistory"
          />
          <q-btn
            label="Update"
            color="orange"
            size="md"
            class="q-mr-md"
            :disable="isEditMode === false"
            @click="
              () => {
                this.UpdateMachineDetails(this.MachineDetails);
              }
            "
          />
          <q-btn
            v-if="hideSaveBtn"
            label="Save"
            color="green-5"
            size="md"
            @click="SaveMachineDetails"
            class="q-mr-md"
          />
        </q-card-actions>
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

        <q-card-section>
          <q-table
            class="my-sticky-header-table"
            flat
            bordered
            title=""
            wrap-cells=""
            dense
            :rows="MachineMaintenanceList"
            :columns="history"
            :filter="MachineMaintenancefilters"
            row-key="_id"
          >
            <template v-slot:top-right>
              <q-input
                color="green"
                dense
                debounce="300"
                v-model="MachineMaintenancefilters"
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
                @click="
                  () => {

                    secondDialog = true;
                    MachineMaintenanceDetails = {};
                  }
                "
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
                  @click="showMaintenanceDetails(row)"
                >
                </q-btn>
                <q-btn
                  icon="delete"
                  flat
                  round
                  color="deep-orange"
                  @click="removeMaintenance(row)"
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
      <q-card style="min-width: 50%">
        <!-- HEADER -->
        <q-card-section class="q-pb-none">
          <div class="row items-center justify-between">
            <div class="text-h6 text-green">MAINTENANCE HISTORY VIEW</div>

            <q-btn
              flat
              round
              dense
              color="orange"
              icon="close"
              @click="viewUpdateId = false"
            />
          </div>
        </q-card-section>

        <q-separator />

        <!-- BODY -->
        <q-card-section style="max-height: 50vh" class="scroll">
          <div>
            <p>
              <b>DATE:</b>
              {{ formatDate(MachineMaintenanceDetails.MaintenanceDate) }}
            </p>

            <p class="q-mb-sm"><b>TYPE:</b></p>
            <p class="q-ml-md">
              {{ MachineMaintenanceDetails.MaintenanceType }}
            </p>

            <p class="q-mb-sm"><b>DESCRIPTION:</b></p>
            <p class="q-ml-md">
              {{ MachineMaintenanceDetails.MaintenanceDesc }}
            </p>

            <p class="q-mb-sm"><b>PROOF:</b></p>

            <q-img
              style="height: 400px; max-width: 100%"
              :src="MachineMaintenanceDetails.MaintenanceImageProof"
              fit="contain"
            />
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
        <q-toolbar>
          <q-toolbar-title
            ><span class="text-weight-bold text-green"
              >New Maintenance Information</span
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
                v-model="MachineMaintenanceDetails.MaintenanceType"
                label="Maintenance Title"
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
                v-model="MachineMaintenanceDetails.MaintenanceDate"
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
                v-model="MachineMaintenanceDetails.MaintenanceImageProof"
                use-chips
                dense
                class="q-pa-sm q-mb-sm"
                accept=".jpg, image/*"
                label="Attach Maintenance Proof"
              >
                <template v-slot:prepend>
                  <q-icon class="text-orange" name="attach_file" />
                </template>
              </q-file>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                ref="maintenanceDesc"
                :rules="[this.required]"
                lazy-rules
                filled
                v-model="MachineMaintenanceDetails.MaintenanceDesc"
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
            @click="
              NewMaintenanceHistory(
                this.MachineDetails._id,
                MachineMaintenanceDetails,
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Notify } from "quasar";
import { useEquipmentInfo } from "../stores/EquipmentsStore";
import { useLoginStore } from "src/stores/LoginStore";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      requiredProof: true,
      secondDialog: false,
      MachineDetails: {},
      MachineMaintenanceDetails: {},
      MachineList: [],
      MachineMaintenanceList: [],
      file_input: null,
      preview_img: null,
      dialogVisible: false,
      isEditMode: false,
      hideSaveBtn: true,
      exitBtn: true,
      secondDialog: false,
      MaintenanceDialog: false,
      maintenancehistory: false,
      MaintenanceDelete: false,
      MachineDeleteHistory: false,
      viewUpdateId: false,
      selectedUpdate: {},
      Machinefilters: "",
      MachineMaintenancefilters: "",
      required: true,
      options: ["Heavy", "Light"],
      itemtype: ["Machinery", "Vehicle"],
    };
  },
  computed: {},

  methods: {
    unformatCost() {
      if (!this.MachineDetails.Cost) return;

      this.MachineDetails.Cost = this.MachineDetails.Cost.toString()
        .replace(/,/g, "")
        .replace(/^₱/, ""); // in case prefix gets into v-model
    },

    formatCost() {
      let raw = this.MachineDetails.Cost;

      if (!raw) {
        this.MachineDetails.Cost = "";
        return;
      }

      // Remove any commas or peso signs
      raw = raw.toString().replace(/,/g, "").replace(/^₱/, "");

      let num = parseFloat(raw);
      if (isNaN(num)) num = 0;

      // Format with commas and 2 decimals
      this.MachineDetails.Cost = num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    async NewMaintenanceHistory(Equipment_id, payload) {
      // console.log("Equipment_id:", Equipment_id);
      // console.log("NewMaintenanceHistory payload:", payload);

      const formData = new FormData();
      const img = payload.MaintenanceImageProof;
      formData.append("MaintenanceImageProof", img);
      formData.append("MaintenanceType", payload.MaintenanceType);
      formData.append("MaintenanceDate", payload.MaintenanceDate);
      formData.append("MaintenanceDesc", payload.MaintenanceDesc);

      await this.Equipmentstore.AddMaintenance(Equipment_id, formData);
      await this.Equipmentstore.GetEquipmentmaintenanceDetails(Equipment_id);
      this.MachineMaintenanceList = this.Equipmentstore.equipmenthistory;
      this.secondDialog = false;
    },
    async ShowSelectedMaintenance(Equipment_id, maintenance_id) {
      console.log("Equipment_id:", Equipment_id);
      console.log("maintenance_id:", maintenance_id);
    },

    async ShowMaintenanceHistory(Equipment_id) {
      try {
        await this.Equipmentstore.GetEquipmentmaintenanceDetails(Equipment_id);
        this.MachineMaintenanceList = this.Equipmentstore.equipmenthistory;
      } catch (error) {
        Notify.create({
          type: "negative",
          message: "Failed to fetch maintenance history." + error.message,
        });
      }
    },

    showMaintenanceDetails(row) {
      this.viewUpdateId = true;
      console.log("showMaintenanceDetails row:", row);
      this.MachineMaintenanceDetails = row;
    },

    removeMaintenance(props) {
      this.MaintenanceDelete = true;
      this.maintenanceIdToDelete = props._id;
      // console.log("Maintenance ID to delete:", props._id);
    },

    async deleteMachineHistory() {
      await this.Equipmentstore.DeleteMaintenance(
        this.MachineDetails._id,
        this.maintenanceIdToDelete,
      );

      await this.Equipmentstore.GetEquipmentmaintenanceDetails(
        this.MachineDetails._id,
      );
      this.MachineMaintenanceList = this.Equipmentstore.equipmenthistory;
    },

    displayImage() {
      if (this.MachineDetails.EquipmentImage instanceof File) {
        return (this.preview_img = URL.createObjectURL(
          this.MachineDetails.EquipmentImage,
        ));
      }
      if (this.MachineDetails.EquipmentImage.startsWith("http")) {
        return (this.preview_img = this.MachineDetails.EquipmentImage);
      }
    },

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

    toggleEditMode() {
      this.isEditMode = true;
    },

    async ShowItem(payload) {
      this.dialogVisible = true;
      this.maintenancehistory = true;
      this.hideSaveBtn = false;

      // console.log("ShowItem payload:", payload);
      try {
        this.MachineDetails = {}; // Clear previous details
        this.MachineMaintenanceList = []; // Clear previous maintenance list

        await this.Equipmentstore.GetEquipment(payload);
        this.MachineDetails = this.Equipmentstore.equipment;
        await this.Equipmentstore.GetEquipmentmaintenanceDetails(payload);
        this.MachineMaintenanceList = this.Equipmentstore.equipmenthistory;

        // console.log("MachineDetails:", this.MachineDetails);
        // console.log(
        //   "MachineMaintenanceList:",
        //   this.MachineMaintenanceList,
        // );
      } catch (error) {
        console.error("Error showing item:", error);
        this.$q.notify({
          type: "negative",
          message: "Failed to show item." + error.message,
        });
      }
    },

    ShowNewMachineDialog() {
      // console.log("ShowNewMachineDialog called");
      this.dialogVisible = true;
    },

    async getMachineList() {
      try {
        await this.Equipmentstore.fetchEquipment();
        this.MachineList = this.Equipmentstore.equipments;
      } catch (error) {
        // console.error("Error fetching machine list:", error);
        this.$q.notify({
          position: "center",
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

    async SaveMachineDetails() {
      // Implement the logic to save machine details
      // This could involve calling an API or updating a store
    },

    async SaveMachineMaintenanceDetails() {
      // Implement the logic to save machine maintenance details
      // This could involve calling an API or updating a store
    },

    async UpdateMachineDetails(payload) {
      const formData = new FormData();

      for (const key in payload) {
        if (key !== "EquipmentImage") {
          formData.append(key, payload[key]);
        }
      }

      const img = payload.EquipmentImage;
      if (img instanceof File) {
        formData.append("EquipmentImage", img); // ✅ real file upload
      } else if (typeof img === "string" && img.startsWith("http://")) {
        formData.append("EquipmentImage", img); // ✅ keep old path
      } else {
        formData.append("EquipmentImage", ""); // ✅ no image
      }

      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      await this.Equipmentstore.UpdateEquipment(payload.id, formData);
      await this.getMachineList();
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
          name: "index",
          label: "No.",
          align: "left",
        },
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
