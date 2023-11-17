<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm" />
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
      title="PROJECT LIST"
      dense
      :rows="store.projects"
      :columns="columns"
      :filter="filter"
      row-key="id"
      :rows-per-page-options="[0]"
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
          <q-btn
            icon="add"
            size="sm"
            round
            color="green"
            @click="viewItem(row)"
          >
          </q-btn>
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
      <q-card style="width: 50%; height: auto">
        <q-card-section>
          <div class="text-h6">PROJECT DETAILS</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.ProjectName"
                  label="Project Name"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.Location"
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
                  label="Reference Number"
                  dense
                  class="q-pa-sm"
                />
              </div>

              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.TotalProjectCost"
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
                  label="Project in Charge"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="orange" v-close-popup size="md" />
          <q-btn
            label="Save"
            color="green-5"
            size="md"
            v-close-popup
            @click="save"
            class="q-mr-md"
          />
        </q-card-actions>
        <q-card class="q-px-lg q-pt-sm q-mb-md">
          <q-btn
            style="width: 100%"
            class="btn-fixed-width"
            color="green-10"
            label="VIEW UPDATE HISTORY"
            icon="lightbulb_outline"
            @click="UpdateProjectDialog = true"
            v-show="updateproject"
          />
        </q-card>
      </q-card>
    </q-dialog>

    <q-dialog v-model="UpdateProjectDialog">
      <q-card style="width: 50%; height: 60%">
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row text-h6">
            <div class="col-11">PROJECT UPDATE HISTORY</div>
            <div class="col-1">
              <q-btn flat round color="orange" icon="arrow_back" @click="this.UpdateProjectDialog = false" />
            </div>
          </div>
        </q-card-section>
        <q-table
          class="my-sticky-header-table"
          flat
          bordered
          title=""
          dense
          :rows="updatedetailsOptions"
          :columns="history"
          :filter="filters"
          row-key="id"
        >
          <template v-slot:top-right>
            <q-input
              borderless
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

          <template v-slot:body-cell-DateUpdate="{ row }">
            <q-td>
              {{ formatDate(row.DateUpdate) }}
            </q-td>
          </template>
          <!-- <template v-slot:body-cell-MaintenanceDate="{ row }">
            <q-td>
              {{ formatDate(row.MaintenanceDate) }}
            </q-td>
          </template> -->
          <template v-slot:body-cell-ImageUpdate="{ row }">
            <q-td>
              {{ row.ImageUpdate }}
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
        <!-- <q-list>
          <q-separator />
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/mountains.jpg" />
              </q-avatar>
            </q-item-section>
            <q-item-section
              ><q-item-label>Update One</q-item-label>
              <q-item-label caption
                >Dria Description badi</q-item-label
              ></q-item-section
            >
          </q-item>
        </q-list> -->
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
              >Create new Update History</q-tooltip
            ></q-btn
          >
        </div>
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
          <div class="text-h6">Add Update</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input
                filled
                v-model="editedItem.ProjectUpdates.DateUpdate"
                label="Update Date"
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
                v-model="editedItem.ProjectUpdates.ImageUpdate"
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
                v-model="editedItem.ProjectUpdates.UpdateDescription"
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
            @click="savehistory(editedItem)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStoreProjectInfo } from "../stores/ProjectStore";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
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
        ProjectUpdates: {
          0: {
            DateUpdate: "",
            ImageUpdate: "",
            UpdateDescription: "",
          },
        },
      },
      defaultItem: {
        id: null,
        ProjectName: "",
        Location: "",
        ReferenceNo: "",
        TotalProjectCost: "",
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
      ]
    };
  },
  computed : {
    updatedetailsOptions() {
      if(this.editedItem.ProjectUpdates){
        return Object.values(this.editedItem.ProjectUpdates);
      } else {
        return {};
      }
    }
  },
  methods: {
    Rowclick() {
      this.updateproject = false;
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
      this.updateproject = true;
      const store = useStoreProjectInfo();

      store.GetProject(item._id).then((res) => {
        this.editedItem = store.project;
        store.fetchProject();

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
      this.dialogVisible = true;
    },
    viewItem(item) {
      this.UpdateProjectDialog = true;
      const store = useStoreProjectInfo();

      store.GetProject(item._id).then((res) => {
        this.editedItem = store.project;
        // store.fetchEquipment();
        console.log("sdasda=", this.editedItem);
      });
      this.dialogVisible = false;
    },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      const store = useStoreProjectInfo();
      store.DeleteProject(id._id).then((res) => {
        store.fetchProject();
      });
    },

    deleteUpdate(updateid) {
      console.log("editeditem=", this.editedItem);
      const id = this.editedItem._id;
      console.log("Update ID =>", id + "----" + updateid);

      // const store = useEquipmentInfo();
      // store.DeleteMaintenance(id._id, maintenanceid).then((res) => {
      //   store.GetEquipment(id._id);
      // });

      const store = useStoreProjectInfo();
      // const editedItemCopy = { ...this.editedItem.MaintenanceDtls };
      store.DeleteUpdate(id, updateid).then((req) => {
        store.fetchProject();
        store.GetProject(id).then((res) => {
          this.editedItem = store.project;
        });
      });
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
    savehistory(id){
      console.log("ID NAKO >> ", id._id);
      const store = useStoreProjectInfo();
      const formData = new FormData();
      formData.append("DateUpdate", this.editedItem.ProjectUpdates.DateUpdate);
      formData.append("file", this.editedItem.ProjectUpdates.ImageUpdate);
      formData.append("ImageUpdate", "");
      formData.append("UpdateDescription", this.editedItem.ProjectUpdates.UpdateDescription);
      console.log("kkkk = ", this.editedItem);
      store.UploadImage(id._id, formData).then((res)=> {
        store.GetProject(id._id).then((res)=> {
          this.editedItem = store.project;
        })
      })
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
    const store = useStoreProjectInfo();
    store.fetchProject();

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
