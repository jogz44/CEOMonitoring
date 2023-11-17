<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm q-mr-md" />
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
      title="EMPLOYEE LIST"
      dense
      :rows="filteredEmployees"
      :columns="columns"
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

      <template v-slot:body-cell-DteStarted="{ row }">
        <q-td>
          {{ row.employmentDtl[0] ? row.employmentDtl[0].DteStarted : null }}
        </q-td>
      </template>

      <template v-slot:body-cell-de="{ row }">
        <q-td>
          {{ row.employmentDtl[0] ? row.employmentDtl[0].DteEnded : null }}
        </q-td>
      </template>

      <template v-slot:body-cell-designation="{ row }">
        <q-td>
          {{ row.employmentDtl[0] ? row.employmentDtl[0].Designation : null }}
        </q-td>
      </template>

      <template v-slot:body-cell-charges="{ row }">
        <q-td>
          {{ row.employmentDtl[0] ? row.employmentDtl[0].Charges : null }}
        </q-td>
      </template>

      <template v-slot:body-cell-status="{ row }">
        <q-td
          ><q-chip
            :class="
              getStatusClass(
                row.employmentDtl[0] ? row.employmentDtl[0].DteEnded : null
              )
            "
          >
            {{
              getStatusClass2(
                row.employmentDtl[0] ? row.employmentDtl[0].DteEnded : null
              ).status
            }}
          </q-chip></q-td
        >
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
      <q-card style="width: 40%; height: 50%">
        <q-card-section>
          <div class="text-h6">Employee Details</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.lastName"
                  label="Lastname"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.middleName"
                  label="Middlename"
                  class="q-pa-sm"
                  dense
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.firstName"
                  label="Firstname"
                  class="q-pa-sm"
                  dense
                />
              </div>
            </div>

            <div class="row">
              <div class="col-xs-12 col-md-12">
                <q-file
                  dense
                  filled
                  accept=".pdf"
                  v-model="editedItem.resumeLink"
                  label="Resume"
                  class="q-ma-sm"
                  icon="file"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="cancel"
          />
          <q-btn label="Save" color="secondary" v-close-popup @click="save" />
        </q-card-actions>
      </q-card>
      <q-card style="width: 50%; height: 50%" v-show="employmenthistory">
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="text-h6">
            Employment History
            <q-btn
              label="Add Employment Details"
              @click="secondDialog = true"
            ></q-btn>
          </div>
        </q-card-section>

        <q-table
          class="my-sticky-header-table"
          flat
          bordered
          title=""
          dense
          :rows="store.personnel.employmentDtl"
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

          <template v-slot:body-cell-DteStarted="{ row }">
            <q-td>
              {{ row.DteStarted }}
            </q-td>
          </template>

          <template v-slot:body-cell-de="{ row }">
            <q-td>
              {{ row.DteEnded }}
            </q-td>
          </template>

          <template v-slot:body-cell-designation="{ row }">
            <q-td>
              {{ row.Designation }}
            </q-td>
          </template>

          <template v-slot:body-cell-charges="{ row }">
            <q-td>
              {{ row.Charges }}
            </q-td>
          </template>

          <template v-slot:body-cell-status="{ row }">
            <q-td
              ><q-chip :class="getStatusClass(row.employmentDtl[0].DteEnded)">
                {{ getStatusClass2(row.employmentDtl[0].DteEnded).status }}
              </q-chip></q-td
            >
          </template>
          <template v-slot:body-cell-actions="{ row }">
            <div class="actionsbtn">
              <q-btn
                icon="delete"
                flat
                round
                color="deep-orange"
                @click="deleteEmployment(editedItem._id, row._id)"
              >
              </q-btn>
            </div>
          </template>
        </q-table>
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
          <div class="text-h6">Add Employment</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input
                filled
                v-model="editedItem.employmentDtl.DteStarted"
                label="Date Started"
                dense
                class="q-pa-sm"
                type="date"
              />
            </div>
            <div class="col">
              <q-input
                filled
                v-model="editedItem.employmentDtl.DteEnded"
                label="Date Ended"
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
                v-model="editedItem.employmentDtl.Designation"
                label="Designation"
                dense
                class="q-pa-sm"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                filled
                v-model="editedItem.employmentDtl.Charges"
                label="Charges"
                dense
                class="q-pa-sm"
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
  </div>
</template>

<script>
import { ref } from "vue";
import { useStorePersonnelInfo } from "../stores/personnelStore";
import * as XLSX from "xlsx";

const stringOptions = ["Active", "End of Contract"];
//const API_URL ='http://10.0.1.23:5000/api/Personnels/'

export default {
  data() {
    return {
      employmenthistory: true,
      filter: "",
      filters: "",
      dialogVisible: false,
      secondDialog: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        lastName: "",
        firstName: "",
        middleName: "",
        employmentDtl: {
          0: {
            DteStarted: "",
            DteEnded: "",
            Designation: "",
            Charges: "",
          },
        },
        resumeLink: "",
      },
      defaultItem: {
        id: null,
        lastName: "",
        firstName: "",
        middleName: "",
        employmentDtl: {
          DteStarted: "",
          DteEnded: "",
          Designation: "",
          Charges: "",
        },
        resumeLink: "",
      },

      columns: [
        {
          name: "lastname",
          required: true,
          label: "LASTNAME",
          align: "left",
          field: (row) => row.lastName,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "firstname",
          align: "center",
          label: "FIRSTNAME",
          field: "firstName",
          sortable: true,
        },
        {
          name: "middlename",
          align: "center",
          label: "MIDDLENAME",
          field: "middleName",
          sortable: true,
        },
        {
          name: "DteStarted",
          label: "DATE STARTED",
          field: "employmentDtl[0].DteStarted",
          sortable: true,
          align: "center",
        },
        {
          name: "de",
          label: "DATE ENDED",
          field: "employmentDtl[0].DteEnded",
          align: "center",
        },
        {
          name: "designation",
          label: "DESIGNATION",
          field: "employmentDtl[0].Designation",
          align: "center",
        },
        {
          name: "charges",
          label: "CHARGES",
          field: "employmentDtl[0].Charges",
          align: "center",
        },
        {
          name: "status",
          label: "STATUS",
          field: "status",
          align: "left",
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
          name: "DteStarted",
          label: "Date Started",
          field: "DteStarted",
          sortable: true,
          align: "left",
        },
        {
          name: "de",
          label: "Date Ended",
          field: "DteEnded",
          align: "left",
        },
        {
          name: "designation",
          label: "Designation",
          field: "Designation",
          align: "left",
        },
        {
          name: "charges",
          label: "Charges",
          field: "Charges",
          align: "left",
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
    filteredEmployees() {
      const searchTerm = this.filter.toLowerCase();
      return this.store.personnels.filter((employee) => {
        const lastName = employee.lastName
          ? employee.lastName.toLowerCase()
          : "";
        const firstName = employee.firstName
          ? employee.firstName.toLowerCase()
          : "";
        const middleName = employee.middleName
          ? employee.middleName.toLowerCase()
          : "";
        const employmentDtl = employee.employmentDtl[0] || {};

        const dteStarted = employmentDtl.DteStarted
          ? employmentDtl.DteStarted.toLowerCase()
          : "";
        const dteEnded = employmentDtl.DteEnded
          ? employmentDtl.DteEnded.toLowerCase()
          : "";
        const designation = employmentDtl.Designation
          ? employmentDtl.Designation.toLowerCase()
          : "";
        const charges = employmentDtl.Charges
          ? employmentDtl.Charges.toLowerCase()
          : "";

        return (
          lastName.includes(searchTerm) ||
          firstName.includes(searchTerm) ||
          middleName.includes(searchTerm) ||
          dteStarted.includes(searchTerm) ||
          dteEnded.includes(searchTerm) ||
          designation.includes(searchTerm) ||
          charges.includes(searchTerm)
        );
      });
    },
  },
  methods: {
    getStatusClass(status) {
      const mydate = new Date(status);
      const currentdate = new Date();
      if (mydate >= currentdate) {
        status = "Active";
        return {
          "text-green": status === "Active",
        };
      } else {
        status = "End of Contract";
        return {
          "text-red": status === "End of Contract",
        };
      }
    },

    getStatusClass2(status) {
      const mydate = new Date(status);
      const currentdate = new Date();
      if (mydate >= currentdate) {
        status = "Active";
        return {
          status,
        };
      } else {
        status = "End of Contract";
        return {
          status,
        };
      }
    },

    Rowclick() {
      this.employmenthistory = false;
      this.editedItem = {
        id: null,
        lastName: "",
        firstName: "",
        middleName: "",
        // employmentDtl: {
        //   DteStarted: "",
        //   DteEnded: "",
        //   Designation: "",
        //   Charges: "",
        // },
        resumeLink: "",
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
      this.employmenthistory = true;
      const store = useStorePersonnelInfo();
      store.GetPersonnel(item._id).then((res) => {
        this.editedItem = store.personnel;

        console.log("this.editeditem=", this.editedItem);
      });
      this.dialogVisible = true;
    },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      const store = useStorePersonnelInfo();
      store.DeletePersonnel(id._id).then((res) => {
        store.fetchPersonnel();
      });
      console.log("row click=", id);
    },

    deleteEmployment(id, contractid) {
      console.log("Contract ID =>", id + "----" + contractid);
      const store = useStorePersonnelInfo();
      store.DeleteEmployment(id, contractid).then((req) => {
        store.fetchPersonnel();
        store.GetPersonnel(id);
      });
    },
    cancel() {
      this.editedItem = {
        lastName: "",
        firstName: "",
        middleName: "",
        employmentDtl: {
          DteStarted: "",
          DteEnded: "",
          Designation: "",
          Charges: "",
        },
        resumeLink: "",
      };
      this.closeDialog();
    },
    save() {
      const store = useStorePersonnelInfo();
      const editedItemCopy = { ...this.editedItem };
      console.log("edited item =>", editedItemCopy._id);

      if (editedItemCopy._id) {
        store
          .UpdatePersonnel(editedItemCopy._id, editedItemCopy)
          .then((res) => {
            this.editedItem = {
              lastName: "",
              firstName: "",
              middleName: "",
              // employmentDtl: {
              //   DteStarted: "",
              //   DteEnded: "",
              //   Designation: "",
              //   Charges: "",
              // },
              resumeLink: "",
            };
            store.fetchPersonnel().then((res) => {
              this.closeDialog();
            });
          });
        console.log("Item Updated: ", editedItemCopy);
      } else {
        store.AddPersonnel(editedItemCopy).then((res) => {
          this.editedItem = {
            id: null,
            lastName: "",
            firstName: "",
            middleName: "",
            // employmentDtl: {
            //   DteStarted: "",
            //   DteEnded: "",
            //   Designation: "",
            //   Charges: "",
            // },
            resumeLink: "",
          };
          store.fetchPersonnel().then((res) => {
            this.closeDialog();
          });
        });

        console.log("save=", editedItemCopy);
      }
    },
    savehistory(id) {
      const store = useStorePersonnelInfo();
      const editedItemCopy = { ...this.editedItem.employmentDtl };
      store.AddEmployment(id._id, editedItemCopy);
      store.fetchPersonnel().then((res) => {
        store.GetPersonnel(id._id).then((res1) => {
          this.editedItem = store.personnel;
          store.fetchPersonnel();
        });
      });
    },
    closeDialog() {
      this.editedItem = {
        id: null,
        lastName: "",
        firstName: "",
        middleName: "",
        employmentDtl: {
          DteStarted: "",
          DteEnded: "",
          Designation: "",
          Charges: "",
        },

        resumeLink: "",
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
          "Lastname",
          "Firstname",
          "Middlename",
          "Date Started",
          "Date Ended",
          "Designation",
          "Charges",
          "Status",
        ],
        ...this.filteredEmployees.map((row) => [
          row.lastName || "",
          row.firstName || "",
          row.middleName || "",
          this.formatDate(row.employmentDtl[0]?.DteStarted) || "",
          this.formatDate(row.employmentDtl[0]?.DteEnded) || "",
          row.employmentDtl[0]?.Designation || "",
          row.employmentDtl[0]?.Charges || "",
          this.getStatusClass2(row.employmentDtl[0]?.DteEnded || "").status ||
            "",
        ]),
      ];

      // Create a workbook with a worksheet
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Employee Data");

      // Save the workbook as a .xlsx file
      XLSX.writeFile(wb, "employee_data.xlsx");
    },
  },
  setup() {
    const options = ref(stringOptions);
    const store = useStorePersonnelInfo();
    store.fetchPersonnel();
    return {
      store,
      model: ref(null),
      stringOptions,
      options,

      filterFn(val, update) {
        if (val === "") {
          update(() => {
            options.value = stringOptions;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
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
.text-red {
  background-color: red;
  color: white !important;
}
.text-green {
  background-color: rgb(103, 228, 72);
  color: white !important;
}
/* .my-sticky-header-table thead tr th {
  position: sticky;
  z-index: 1;
} */
</style>
