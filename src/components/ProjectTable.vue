<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm" />

    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="Project List"
      dense
      :rows="store.projects"
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
      <q-card style="width: 50%; height: 50%">
        <q-card-section>
          <div class="text-h6">Project Details</div>
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
import { useStoreProjectInfo } from "../stores/ProjectStore";

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
        ProjectName: "",
        Location: "",
        ReferenceNo: "",
        TotalProjectCost: "",
        DateStarted: "",
        TargetAccomplished: "",
        ProjectInCharge: "",
      },
      defaultItem: {
        id: null,
        ProjectName: "",
        Location: "",
        ReferenceNo: "",
        TotalProjectCost: "",
        DateStarted: "",
        TargetAccomplished: "",
        ProjectInCharge: "",
      },
      columns: [
        {
          name: "ProjectName",
          required: true,
          label: "Project Name",
          align: "left",
          field: (row) => row.ProjectName,
          format: (val) => `${val}`,
          sortable: true,
        },

        {
          name: "Location",
          label: "Location",
          field: "Location",
          align: "left",
          sortable: true,
        },
        {
          name: "ReferenceNo",
          label: "Reference Number",
          field: "ReferenceNo",
          align: "left",
        },
        {
          name: "TotalProjectCost",
          align: "left",
          label: "Total Project Cost",
          field: "TotalProjectCost",
        },
        {
          name: "DateStarted",
          label: "Date Started",
          field: "DateStarted",
          align: "left",
          sortable: true,
        },
        {
          name: "TargetAccomplished",
          label: "Target Accomplished",
          field: "TargetAccomplished",
          align: "left",
        },
        {
          name: "ProjectInCharge",
          align: "left",
          label: "Project In Charge",
          field: "ProjectInCharge",
        },

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
        ProjectName: "",
        Location: "",
        ReferenceNo: "",
        TotalProjectCost: "",
        DateStarted: "",
        TargetAccomplished: "",
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
      const store = useStoreProjectInfo();

      store.GetProject(item._id).then((res) => {
        this.editedItem = store.project;
        store.fetchProject();
        const DateStarted = new Date(item.DateStarted);
        const TargetAccomplished = new Date(item.TargetAccomplished);

        this.editedItem.DateStarted = this.formatDate(DateStarted);
        this.editedItem.TargetAccomplished = this.formatDate(TargetAccomplished);

        console.log("sdasda=", this.editedItem);
      });
      this.dialogVisible = true;
    },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      const store = useStoreProjectInfo();
      store.DeleteProject(id._id).then((res) => {
        store.fetchProject();
      });
    },

    save() {
      const store = useStoreProjectInfo();
      const editedItemCopy = { ...this.editedItem };
      console.log("edited item =>", editedItemCopy._id);

      if (editedItemCopy._id) {
        store
          .UpdateProject(editedItemCopy._id, editedItemCopy)
          .then((res) => {
            this.editedItem = {
              ProjectName: "",
              Location: "",
              ReferenceNo: "",
              TotalProjectCost: "",
              DateStarted: "",
              TargetAccomplished: "",
              ProjectInCharge: "",
            };
            store.fetchProject().then((res) => {
              this.closeDialog();
            });
          });
        console.log("Item Updated: ", editedItemCopy);
      } else {

        store.AddProject(editedItemCopy).then((res) => {
          this.editedItem = {
            id: null,
            ProjectName: "",
            Location: "",
            ReferenceNo: "",
            TotalProjectCost: "",
            DateStarted: "",
            TargetAccomplished: "",
            ProjectInCharge: "",
          };
          store.fetchProject().then((res) => {
            this.closeDialog();
          });
        });
        console.log("save=", editedItemCopy);
      }
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
        ProjectInCharge: "",
      };
      this.dialogVisible = false;
    },
    getNextId() {
      const ids = this.rows.map((item) => item.id);
      return Math.max(...ids) + 1;
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
