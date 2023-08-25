<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm" />

    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="User List"
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
          <div class="text-h6">User Details</div>
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
                  v-model="editedItem.username"
                  label="Username"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.password"
                  label="Password"
                  dense
                  type="password"
                  class="q-pa-sm"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="editedItem.confirmPassword"
                  label="Confirm Password"
                  dense
                  type="password"
                  class="q-pa-sm"
                />
                <q-alert
                  v-if="!passwordMatch && editedItem.confirmPassword"
                  color="negative"
                >
                  Passwords do not match.
                </q-alert>
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

export default {
  data() {
    return {
      sample: "hello world",
      filter: "",
      passwordMatch: true,
      dialogVisible: false,
      editedIndex: -1,
      editedItem: {
        lastname: "",
        firstname: "",
        userName: "",
        password: "",
        confirmPassword: "",
        designation: "",
      },
      defaultItem: {
        lastname: "",
        firstname: "",
        userName: "",
        password: "",
        confirmPassword: "",
        designation: "",
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
        // { name: "ds", label: "Date Started", field: "ds", sortable: true },
        { name: "username", label: "Username", field: "username" },
        { name: "designation", label: "Designation", field: "designation" },
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
          ds: "2012-12-27",
          de: "2023-12-27",
          designation: "City",
        },
      ],
    };
  },
  watch: {
    "editedItem.password"(newValue) {
      this.passwordMatch = newValue === this.editedItem.confirmPassword;
    },
    "editedItem.confirmPassword"(newValue) {
      this.passwordMatch = newValue === this.editedItem.password;
    },
  },
  methods: {
    Rowclick() {
      this.editedItem = {
        id: null,
        lastname: "",
        firstname: "",
        userName: "",
        password: "",
        confirmPassword: "",
        designation: "",
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
        userName: "",
        password: "",
        confirmPassword: "",
        designation: "",
      };
      this.dialogVisible = false;
    },
    getNextId() {
      const ids = this.rows.map((item) => item.id);
      return Math.max(...ids) + 1;
    },
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
