<template>
  <div class="q-pa-md">
    <q-btn label="Add" @click="Rowclick" class="q-mb-sm" />

    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="User List"
      dense
      :rows="store.users"
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
            @click="deleteItem(row)"
          >
          </q-btn>
          <q-btn
            icon="security"
            flat
            round
            color="primary"
            @click="accessItem(row)"
          >
          </q-btn>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="dialogVisible" persistent>
      <q-card style="width: 50%; height: 50%">
        <q-card-section>
          <div class="text-h6">User Details</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.IdNo"
                  label="ID Number"
                  dense
                  class="q-pa-sm"
                  type="number"
                />
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.LastName"
                  label="Lastname"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.FirstName"
                  label="Firstname"
                  dense
                  class="q-pa-sm"
                />
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.MiddleName"
                  label="Middlename"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.Designation"
                  label="Designation"
                  dense
                  class="q-pa-sm"
                />
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.Office"
                  label="Office"
                  dense
                  class="q-pa-sm"
                />
              </div>
            </div>
            <q-separator class="q-mb-sm"></q-separator>
            <div class="text-title">Login Credentials</div>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.Username"
                  label="Username"
                  dense
                  class="q-pa-sm"
                />
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.Password"
                  label="Password"
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

    <!-- USER ACCESS BUTTON DIALOG -->
    <q-dialog v-model="UserAccess">
      <q-card style="width: 50%; height: auto">
        <q-card-section>
          <div class="text-h6">USER ACCESS</div>
        </q-card-section>
        <q-separator />
        <q-table
          :rows="rowAccess"
          row-key="id"
          :selection="selection"
          @selection="onSelectionChange"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <!-- <q-td :props="props">
                <custom-checkbox
                  :value="props.row.selectedCheckbox1"
                  @input="toggleCheckbox1"
                />
                <custom-checkbox
                  :value="props.row.selectedCheckbox2"
                  @input="toggleCheckbox2"
                />

              </q-td> -->
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ props.row[col.name] }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup size="md" />
          <q-btn
            label="Save"
            color="secondary"
            size="md"
            v-close-popup
            @click="saved"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStoreUserInfo } from "../stores/UserStore";

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
        Username: "",
        Password: "",
        IdNo: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Designation: "",
        Office: "",
      },
      defaultItem: {
        id: null,
        Username: "",
        Password: "",
        IdNo: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Designation: "",
        Office: "",
      },
      UserAccess: false,
      selection: [],
      columnAccess: [
        {
          name: "Modulename",
          required: true,
          label: "MODULE NAME",
          align: "left",
          field: (row) => row.Modulename,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Add",
          required: true,
          label: "ADD",
          align: "left",
          field: (row) => row.add,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Edit",
          required: true,
          label: "EDIT",
          align: "left",
          field: (row) => row.edit,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "Delete",
          required: true,
          label: "DELETE",
          align: "left",
          field: (row) => row.delete,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "View",
          required: true,
          label: "VIEW",
          align: "left",
          field: (row) => row.view,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      rowAccess: [
        {
          Modulename: "Employee List",
          // selectedCheckbox1: false,
          // selectedCheckbox2: false,
          add: false,
          edit: false,
          delete: false,
          view: false, // Add more properties as needed
        },
        {
          Modulename: "Machine Equipment List",
          // selectedCheckbox1: false,
          // selectedCheckbox2: false,
          add: false,
          edit: false,
          delete: false,
          view: false,
        },
        {
          Modulename: "IT Equipment List",
          // selectedCheckbox1: false,
          // selectedCheckbox2: false,
          add: false,
          edit: false,
          delete: false,
          view: false,
        },
        {
          Modulename: "Project List",
          // selectedCheckbox1: false,
          // selectedCheckbox2: false,
          add: false,
          edit: false,
          delete: false,
          view: false,
        },
      ],
      columns: [
        {
          name: "Username",
          required: true,
          label: "Username",
          align: "left",
          field: (row) => row.Username,
          format: (val) => `${val}`,
          sortable: true,
        },

        {
          name: "Fullname",
          label: "Fullname",
          field: (row) => `${row.FirstName} ${row.MiddleName} ${row.LastName}`,
          align: "left",
          sortable: true,
        },
        {
          name: "Designation",
          label: "Designation",
          field: "Designation",
          align: "left",
        },
        {
          name: "Office",
          align: "left",
          label: "Office",
          field: "Office",
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
    saved() {
      this.UserAccess = false;
    },
    onSelectionChange(selected) {
      this.selection = selected;
    },
    toggleCheckbox1(value, row) {
      row.selectedCheckbox1 = value;
    },
    toggleCheckbox2(value, row) {
      row.selectedCheckbox2 = value;
    },
    Rowclick() {
      this.editedItem = {
        id: null,
        Username: "",
        Password: "",
        IdNo: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Designation: "",
        Office: "",
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
    accessItem(item) {
      this.UserAccess = true;
    },
    editItem(item) {
      const store = useStoreUserInfo();

      store.GetUser(item._id).then((res) => {
        this.editedItem = store.user;
        store.fetchUser();

        console.log("sdasda=", this.editedItem);
      });
      this.dialogVisible = true;
    },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      const store = useStoreUserInfo();
      store.DeleteUser(id._id).then((res) => {
        store.fetchUser();
      });
    },

    save() {
      const store = useStoreUserInfo();
      const editedItemCopy = { ...this.editedItem };
      console.log("edited item =>", editedItemCopy._id);

      if (editedItemCopy._id) {
        store.UpdateUser(editedItemCopy._id, editedItemCopy).then((res) => {
          this.editedItem = {
            Username: "",
            Password: "",
            IdNo: "",
            FirstName: "",
            MiddleName: "",
            LastName: "",
            Designation: "",
            Office: "",
          };
          store.fetchUser().then((res) => {
            this.closeDialog();
          });
        });
        console.log("Item Updated: ", editedItemCopy);
      } else {
        store.AddUser(editedItemCopy).then((res) => {
          this.editedItem = {
            id: null,
            Username: "",
            Password: "",
            IdNo: "",
            FirstName: "",
            MiddleName: "",
            LastName: "",
            Designation: "",
            Office: "",
          };
          store.fetchUser().then((res) => {
            this.closeDialog();
          });
        });
        console.log("save=", editedItemCopy);
      }
    },

    closeDialog() {
      this.editedItem = {
        id: null,
        Username: "",
        Password: "",
        IdNo: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        Designation: "",
        Office: "",
      };
      this.dialogVisible = false;
    },
    getNextId() {
      const ids = this.rows.map((item) => item.id);
      return Math.max(...ids) + 1;
    },
  },
  // components: {
  //   CustomCheckbox: {
  //     props: {
  //       value: Boolean,
  //     },
  //     template: '<q-checkbox v-model="value" />',
  //   },
  // },

  setup() {
    const store = useStoreUserInfo();
    store.fetchUser();

    return {
      store,
      model: ref(null),
      group: ref(["display"]),
      options: [
        {
          label: "Create",
          value: "create",
        },
        {
          label: "Remove",
          value: "remove",
        },
        {
          label: "Update",
          value: "update",
        },
        {
          label: "Display",
          value: "display",
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
