<template>
  <div class="q-pa-md">
    <q-btn
      icon="add"
      color="green-10"
      label="Add Project"
      @click="Rowclick"
      class="q-mb-sm"
      v-if="create('Project')"
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
      title="PROJECT LIST"
      dense
      :rows="store.projects"
      :columns="columns"
      :filter="filter"
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
      <template v-slot:body-cell-DateStarted="{ row }">
        <q-td>
          {{ formatDate(row.DateStarted) }}
        </q-td>
      </template>
      <template v-slot:body-cell-TargetAccomplished="{ row }">
        <q-td>
          {{ formatDate(row.TargetAccomplished) }}
        </q-td>
      </template>
      <template v-slot:body-cell-DateAccomplished="{ row }">
        <q-td>
          {{ formatDate(row.DateAccomplished) }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="{ row }">
        <div class="actionsbtn">
          <!-- <q-btn
            v-if="update('Project')"
            icon="add"
            size="sm"
            round
            color="green"
            @click="viewItem(row)"
          >
          </q-btn> -->
          <q-btn
            v-if="update('Project')"
            icon="visibility"
            flat
            round
            color="green-8"
            @click="editItem(row)"
          >
          </q-btn>
          <q-btn
            v-if="remove('Project')"
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

    <!-- the main dialog -->
    <q-dialog v-model="dialogVisible" persistent>
      <q-card style="width: 30%; max-width: 80vw; height: 50%">
        <q-card-section>
          <div class="row">
            <div class="col-11 text-h6">PROJECT DETAILS</div>
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
                  v-model="editedItem.ProjectName"
                  :disable="updateproject === !isEditMode"
                  label="Project Name"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.Location"
                  :disable="updateproject === !isEditMode"
                  label="Location"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.ReferenceNo"
                  :disable="updateproject === !isEditMode"
                  label="Reference Number"
                  dense
                  class="q-pa-sm"
                />
              </div>

              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.TotalProjectCost"
                  :disable="updateproject === !isEditMode"
                  label="Total Project Cost"
                  dense
                  class="q-pa-sm"
                  type="number"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.DateStarted"
                  :disable="updateproject === !isEditMode"
                  label="Date Started"
                  dense
                  class="q-pa-sm"
                  type="date"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.TargetAccomplished"
                  :disable="updateproject === !isEditMode"
                  label="Target Accomplished"
                  dense
                  class="q-pa-sm"
                  type="date"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  v-if="editedItem._id"
                  filled
                  v-model="editedItem.DateAccomplished"
                  :disable="updateproject === !isEditMode"
                  label="Actual Finished Date"
                  dense
                  class="q-pa-sm"
                  type="date"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.ProjectInCharge"
                  :disable="updateproject === !isEditMode"
                  label="Project in Charge"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            icon="edit"
            color="orange"
            size="md"
            @click="toggleEditMode()"
            v-show="updateproject"
          />
          <q-btn
            label="Save"
            color="green-5"
            size="md"
            v-close-popup
            @click="save"
            class="q-mr-md"
            :disable="updateproject === !isEditMode"
          />
        </q-card-actions>
        <!-- <q-card class="q-px-lg q-pt-sm q-mb-md">
          <q-btn
            style="width: 100%"
            class="btn-fixed-width"
            color="green-10"
            label="VIEW UPDATE HISTORY"
            icon="lightbulb_outline"
            @click="UpdateProjectDialog = true"
            v-show="updateproject"
          />
        </q-card> -->
      </q-card>

      <!-- DIALOG FOR UPDATE -->
      <q-card
        style="width: 40%; max-width: 80vw; height: 50%"
        v-show="updateproject"
      >
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row text-h6">
            <div class="col-11">PROJECT UPDATE HISTORY</div>
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
          :rows="store.projecthistory"
          :columns="history"
          :filter="filters"
          row-key="id"
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
              label="Add Update"
              size="x-small"
              icon="add"
              @click="secondDialog = true"
              color="green-10"
            ></q-btn>
          </template>

          <template v-slot:body-cell-DateUpdate="{ row }">
            <q-td>
              {{ formatDate(row.DateUpdate) }}
            </q-td>
          </template>
          <template v-slot:body-cell-ImageUpdate="{ row }">
            <q-td>
              <q-img
                :src="row.ImageUpdate"
                style="height: 50px; max-width: 100px"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-UpdateDescription="{ row }">
            <q-td>
              {{ row.UpdateDescription }}
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
                @click="deleteUpdate(row._id)"
              >
              </q-btn>
            </div>
          </template>
        </q-table>
        <q-separator />
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
              >Create new Update History</q-tooltip
            ></q-btn
          >
        </div> -->
      </q-card>
    </q-dialog>

    <q-dialog v-model="UpdateProjectDialog"> </q-dialog>

    <!-- Dialog for vIEWING EACH Project Update -->
    <q-dialog
      v-model="viewUpdateId"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="min-width: 50%">
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row text-h6">
            <div class="col-11">UPDATE VIEW</div>
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
              <p><b>DATE:</b> {{ formatDate(selectedUpdate.DateUpdate) }}</p>
              <p class="q-mb-sm"><b>PROOF:</b></p>
              <q-img
                style="height: 400px; max-width: 100%"
                :src="selectedUpdate.ImageUpdate"
              />
              <p class="q-mt-lg"><b>DESCRIPTION: </b></p>
              <p class="q-ml-md">{{ selectedUpdate.UpdateDescription }}</p>
              <!-- Add more details as needed -->
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog for Adding Project Update -->
    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="width: 500px">
        <q-card-section>
          <div class="row text-h6">
            <div class="col-11">ADD UPDATE</div>
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
                v-model="ProjDtl.DateUpdate"
                label="Update Date"
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
                v-model="ProjDtl.UpdatePercent"
                label="Update Percentage"
                dense
                class="q-pa-sm"
                type="number"
              />
            </div>
            <div class="col">
              <q-input
                filled
                v-model="ProjDtl.UpdateSpent"
                label="Update Expenditure"
                dense
                class="q-pa-sm"
                type="number"
              />
            </div>
          </div>
          <!-- image for update/edit -->
          <div class="row">
            <div class="col">
              <q-file
                filled
                v-model="ProjDtl.ImageUpdate"
                hint="Update Proof"
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
                v-model="ProjDtl.UpdateDescription"
                label="Update Description"
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

    <!-- For the Delete of the Maintenance History -->
    <q-dialog
      v-model="ProjectDelete"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-red text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Delete Project</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Do you want to delete this Project?
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
            @click="deleteItemConfirm(row)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog for Project Update History Delete -->
    <q-dialog
      v-model="ProjectDeleteHistory"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-red text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Delete Project Update History</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Do you want to delete this Project Update History?
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
            @click="deleteProjectHistory()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStoreProjectInfo } from "../stores/ProjectStore";
import { useLoginStore } from "src/stores/LoginStore";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      selectedID: ref(""),
      DeletedItem: "",
      DeleteId: "",
      ProjectDelete: false,

      DeleteHistoryId: "",
      ProjectDeleteHistory: false,

      isEditMode: false,
      exitBtn: false,
      viewUpdateId: false,
      selectedUpdate: null,
      updateproject: true,
      UpdateProjectDialog: false,
      filter: "",
      filters: "",
      dialogVisible: false,
      secondDialog: false,
      MaintenanceDelete: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        ProjectName: "",
        Location: "",
        ReferenceNo: "",
        TotalProjectCost: "",
        DateStarted: "",
        TargetAccomplished: "",
        DateAccomplished: "",
        ProjectInCharge: "",
        IsDeleted: false,
        ProjectUpdates: {
          0: {
            DateUpdate: "",
            ImageUpdate: "",
            UpdateDescription: "",
            IsDeleted: false,
          },
        },
      },
      ProjDtl: [
        {
          DateUpdate: "",
          ImageUpdate: "",
          UpdateDescription: "",
          IsDeleted: false,
        },
      ],
      defaultItem: {
        id: null,
        ProjectName: "",
        Location: "",
        ReferenceNo: "",
        TotalProjectCost: "",
        IsDeleted: false,
        DateStarted: "",
        TargetAccomplished: "",
        DateAccomplished: null,
        ProjectInCharge: "",
        ProjectUpdates: {
          DateUpdate: "",
          ImageUpdate: "",
          UpdateDescription: "",
        },
      },
      columns: [
        {
          name: "ProjectName",
          required: true,
          label: "PROJECT NAME",
          align: "left",
          field: (row) => row.ProjectName,
          format: (val) => `${val}`,
          sortable: true,
        },

        {
          name: "Location",
          label: "LOCATION",
          field: "Location",
          align: "left",
          sortable: true,
        },
        {
          name: "ReferenceNo",
          label: "REFERENCE NUMBER",
          field: "ReferenceNo",
          align: "left",
        },
        {
          name: "TotalProjectCost",
          align: "left",
          label: "TOTAL PROJECT COST",
          field: "TotalProjectCost",
        },
        {
          name: "DateStarted",
          label: "DATE STARTED",
          field: "DateStarted",
          align: "left",
          sortable: true,
        },
        {
          name: "TargetAccomplished",
          label: "TARGET ACCOMPLISHED",
          field: "TargetAccomplished",
          align: "left",
        },
        {
          name: "DateAccomplished",
          label: "ACTUAL DATE FINISHED",
          field: "DateAccomplished",
          align: "left",
        },
        // {
        //   name: "ProjectInCharge",
        //   align: "left",
        //   label: "PROJECT IN CHARGE",
        //   field: "ProjectInCharge",
        // },

        {
          name: "actions",
          label: "ACTIONS",
          field: "actions",
          align: "left",
        },
      ],
      history: [
        {
          name: "DateUpdate",
          align: "left",
          label: "Date Update",
          field: "DateUpdate",
        },
        {
          name: "ImageUpdate",
          align: "left",
          label: "Update Image",
          field: "ImageUpdate",
        },
        {
          name: "",
          align: "left",
          label: "Update Description",
          field: "UpdateDescription",
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
    updatedetailsOptions() {
      console.log("mao ni long= ", this.editedItem.ProjectUpdates);
      if (this.editedItem.ProjectUpdates) {
        return Object.values(this.editedItem.ProjectUpdates);
      } else {
        return {};
      }
    },
  },
  methods: {
    toggleEditMode() {
      console.log("toggleEditMode called");
      this.isEditMode = !this.isEditMode;
    },
    Rowclick() {
      this.updateproject = false;
      this.exitBtn = true;

      this.editedItem = {
        id: null,
        ProjectName: "",
        Location: "",
        ReferenceNo: "",
        TotalProjectCost: "",
        DateStarted: "",
        TargetAccomplished: "",
        // DateAccomplished: "",
        ProjectInCharge: "",
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
      this.updateproject = true;
      this.exitBtn = false;


      const store = useStoreProjectInfo();

      store.GetProject(item._id).then((res) => {
        this.editedItem = store.project;
        // store.fetchProject();

        // VIEWING OF DATES WITH TRAPPING IF EMPTY
        const DateStarted = new Date(item.DateStarted);
        const TargetAccomplished = new Date(item.TargetAccomplished);
        const DateAccomplished = new Date(item.DateAccomplished);

        if (this.editedItem.DateStarted == null) {
          this.editedItem.DateStarted = "";
          console.log("sdasda=", this.editedItem);
        } else {
          this.editedItem.DateStarted = this.formatDate(DateStarted);
        }

        if (this.editedItem.TargetAccomplished == null) {
          this.editedItem.TargetAccomplished = "";
        } else {
          this.editedItem.TargetAccomplished =
            this.formatDate(TargetAccomplished);
        }

        if (this.editedItem.DateAccomplished == null) {
          this.editedItem.DateAccomplished = "";
        } else {
          this.editedItem.DateAccomplished = this.formatDate(DateAccomplished);
        }
      });

      store.GetProjectUpdateDetails(item._id);
      this.dialogVisible = true;
    },
    viewItem(item) {
      this.UpdateProjectDialog = true;
      const store = useStoreProjectInfo();

      store
        .GetProject(item._id, item.ProjectUpdates.ImageUpdate)
        .then((res) => {
          this.editedItem = store.project;
          // store.fetchEquipment();
          console.log("sdasda=", this.editedItem);
          console.log("filename = ", item.ProjectUpdates[0].ImageUpdate);
        });
      this.dialogVisible = false;
    },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      // const store = useStoreProjectInfo();
      // store.DeleteProject(id._id).then((res) => {
      //   store.fetchProject();
      // });
      this.DeletedItem = id;
      this.DeleteId = id._id;
      this.ProjectDelete = true;
    },

    deleteItemConfirm() {
      const editedItemCopy = { ...this.editedItem };
      console.log("Delete Item ID => ", this.DeleteId);
      const store = useStoreProjectInfo();
      editedItemCopy.IsDeleted = true;

      store.DeleteProject(this.DeleteId, this.DeletedItem).then((res) => {
        store.fetchProject();
      });
    },

    deleteUpdate(updateid) {
      //console.log(`fetched Update ID`+ updateid)
      this.DeleteHistoryId = updateid;
      this.ProjectDeleteHistory = true;
      // console.log("editeditem=", this.editedItem);
      // const id = this.editedItem._id;
      // console.log("Update ID =>", id + "----" + updateid);

      // // const store = useEquipmentInfo();
      // // store.DeleteMaintenance(id._id, maintenanceid).then((res) => {
      // //   store.GetEquipment(id._id);
      // // });

      // const store = useStoreProjectInfo();
      // // const editedItemCopy = { ...this.editedItem.MaintenanceDtls };
      // store.DeleteUpdate(id, updateid).then((req) => {
      //   store.fetchProject();
      //   store.GetProject(id).then((res) => {
      //     this.editedItem = store.project;
      //   });
      // });
    },

    deleteProjectHistory() {
      console.log("Contract ID =>", this.DeleteHistoryId);
      const store = useStoreProjectInfo();
      store.DeleteUpdate(this.selectedID, this.DeleteHistoryId).then((req) => {
        store.fetchProject();
        store.GetProjectUpdateDetails(this.selectedID).then((res) => {
          // this.editedItem = store.project;
          // store.fetchProject();
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
      const store = useStoreProjectInfo();
      const editedItemCopy = { ...this.editedItem };

      console.log("edited item =>", editedItemCopy._id);
      const isDateAccomplishedSet =
        editedItemCopy.DateAccomplished !== null &&
        editedItemCopy.DateAccomplished !== undefined;
      const isNewItem = !editedItemCopy._id;

      if (isNewItem) {
        // For new items, don't set DateAccomplished
        editedItemCopy.DateAccomplished = null;
      } else if (!isDateAccomplishedSet) {
        // For edit, if DateAccomplished is not set, keep the existing value
        editedItemCopy.DateAccomplished = this.editedItem.DateAccomplished;
      }

      if (editedItemCopy._id) {
        store.UpdateProject(editedItemCopy._id, editedItemCopy).then((res) => {
          this.editedItem = { ...this.defaultItem };
          store.fetchProject().then((res) => {
            this.closeDialog();
            this.isEditMode = false;
          });
        });
        console.log("Item Updated: ", editedItemCopy);
      } else {
        store.AddProject(editedItemCopy).then((res) => {
          this.editedItem = { ...this.defaultItem };
          store.fetchProject().then((res) => {
            this.closeDialog();
          });
        });
        console.log("save=", editedItemCopy);
      }
    },
    savehistory() {
      console.log("ID NAKO >> ", this.selectedID);
      const store = useStoreProjectInfo();
      const formData = new FormData();
      formData.append("DateUpdate", this.ProjDtl.DateUpdate);
      formData.append("file", this.ProjDtl.ImageUpdate);
      formData.append("ImageUpdate", "");
      formData.append("UpdateDescription", this.ProjDtl.UpdateDescription);
      console.log("kkkk = ", this.editedItem);
      store.UploadImage(this.selectedID, formData).then((res) => {
        store.GetProjectUpdateDetails(this.selectedID).then((res) => {
          // this.editedItem = store.project;
          store.fetchProject();
          this.ProjDtl = [
            {
              DateUpdate: "",
              ImageUpdate: "",
              UpdateDescription: "",
              IsDeleted: false,
            },
          ];
        });
      });
    },

    closeDialog() {
      this.editedItem = {
        id: null,
        ProjectName: "",
        Location: "",
        ReferenceNo: "",
        TotalProjectCost: "",
        DateStarted: "",
        TargetAccomplished: "",
        DateAccomplished: "",
        ProjectInCharge: "",
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
          "ProjectName",
          "Location",
          "ReferenceNo",
          "TotalProjectCost",
          "DateStarted",
          "TargetAccomplished",
          "ProjectInCharge",
          "DateAccomplished",
        ],
        ...this.store.projects.map((row) => [
          row.ProjectName || "",
          row.Location || "",
          row.ReferenceNo || "",
          row.TotalProjectCost || "",
          this.formatDate(row.DateStarted) || "",
          this.formatDate(row.TargetAccomplished) || "",
          row.ProjectInCharge || "",
          this.formatDate(row.DateAccomplished) || "",
        ]),
      ];

      // Create a workbook with a worksheet
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Project Data");

      // Save the workbook as a .xlsx file
      XLSX.writeFile(wb, "Project_Data.xlsx");
    },
  },

  setup() {
    const selected = ref([]);
    const store = useStoreProjectInfo();
    store.fetchProject();
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
      selected,
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
