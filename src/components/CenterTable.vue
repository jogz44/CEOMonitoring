<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm" />

    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="Employee List"
      dense
      :rows="rows"
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
      <template v-slot:body-cell-status="{ row }">
        <q-td
          ><q-chip :class="getStatusClass(row.status)">
            {{ row.status }}
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
            @click="deleteItem(row.id)"
          >
          </q-btn>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="dialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Employee Details</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.lastname"
                  label="Lastname"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.middlename"
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
                  v-model="editedItem.firstname"
                  label="Firstname"
                  class="q-pa-sm"
                  dense
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.ds"
                  label="Date Started"
                  dense
                  class="q-pa-sm"
                  type="date"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.de"
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
                  v-model="editedItem.designation"
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
                  v-model="editedItem.charges"
                  label="Charges"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
            <!-- <div class="row">
              <div class="col-xs-12 col-md-12">
                <q-select
                  filled
                  v-model="editedItem.status"
                  use-input
                  dense
                  input-debounce="0"
                  label="Simple filter"
                  :options="options"
                  @filter="filterFn"
                  behavior="menu"
                  class="q-ma-sm"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div> -->
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <q-file
                  dense
                  filled
                  accept=".pdf"
                  v-model="editedItem.resume"
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
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Save" color="secondary" v-close-popup @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
const stringOptions = ["Active", "End of Contract"];
export default {
  data() {
    return {
      sample: "hello world",
      filter: "",
      dialogVisible: false,
      editedIndex: -1,
      editedItem: {
        lastname: "",
        firstname: "",
        middlename: "",
        ds: "",
        de: "",
        designation: "",
        // status: "",
        charges: "",
        resume: "",
      },
      defaultItem: {
        lastname: "",
        firstname: "",
        middlename: "",
        ds: "",
        de: "",
        designation: "",
        // status: "",
        charges: "",
        resume: "",
      },
      columns: [
        {
          name: "lastname",
          required: true,
          label: "Lastname",
          align: "left",
          field: (row) => row.lastname,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "firstname",
          align: "center",
          label: "Firstname",
          field: "firstname",
          sortable: true,
        },
        {
          name: "middlename",
          align: "center",
          label: "Middlename",
          field: "middlename",
          sortable: true,
        },
        {
          name: "ds",
          label: "Date Started",
          field: "ds",
          sortable: true,
          align: "center",
        },
        { name: "de", label: "Date Ended", field: "de", align: "center" },
        {
          name: "designation",
          label: "Designation",
          field: "designation",
          align: "center",
        },
        {
          name: "charges",
          label: "Charges",
          field: "charges",
          align: "center",
        },
        { name: "status", label: "Status", field: "status", align: "left" },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
        },
      ],
      rows: [
        {
          id: 1,
          lastname: "Frozen Yogurt",
          firstname: " Honey",
          middlename: " Mejo",
          ds: "2012-12-27",
          de: "2023-12-27",
          designation: "City",
          status: "Active",
        },
      ],
    };
  },
  methods: {
    getStatusClass(status) {
      return {
        "text-red": status === "End of Contract", // Adjust the value as per your data
      };
    },
    Rowclick() {
      this.editedItem = {
        id: null,
        lastname: "",
        firstname: "",
        middlename: "",
        ds: "",
        de: "",
        designation: "",
        resume: "",
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
      if (this.editedItem.id !== null) {
        const index = this.rows.findIndex(
          (item) => item.id === this.editedItem.id
        );
        if (index > -1) {
          this.rows[index] = { ...this.editedItem };
        }
      } else {
        this.rows.push({ ...this.editedItem, id: this.getNextId() });
      }
      this.closeDialog();
    },
    closeDialog() {
      this.editedItem = {
        id: null,
        lastname: "",
        firstname: "",
        middlename: "",
        ds: "",
        de: "",
        designation: "",
        // status: "",
        charges: "",
        resume: "",
      };
      this.dialogVisible = false;
    },
    getNextId() {
      const ids = this.rows.map((item) => item.id);
      return Math.max(...ids) + 1;
    },
  },
  setup() {
    const options = ref(stringOptions);

    return {
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
/* .actionsbtn {
  margin-left: 90px;
} */
.text-red {
  background-color: red;
  color: white !important;
}
</style>
