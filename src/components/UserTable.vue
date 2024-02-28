<template>
  <div class="q-pa-md">
    <q-btn
      label="Add User"
      color="green-10"
      @click="Rowclick"
      class="q-mb-sm"
      icon="add"
    />

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
            icon="visibility"
            flat
            round
            color="green"
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
      <q-card style="width: 50%; height: auto">
        <q-card-section>
          <div class="row text-h6">
            <div class="col-11">USER DETAILS</div>
            <div class="col-1">
              <q-btn flat round color="orange" icon="close" v-close-popup />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.IdNo"
                  :disable="editdetails === !isEditMode"
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
                  :disable="editdetails === !isEditMode"
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
                  :disable="editdetails === !isEditMode"
                  label="Firstname"
                  dense
                  class="q-pa-sm"
                />
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.MiddleName"
                  :disable="editdetails === !isEditMode"
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
                  :disable="editdetails === !isEditMode"
                  label="Designation"
                  dense
                  class="q-pa-sm"
                />
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.Office"
                  :disable="editdetails === !isEditMode"
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
                  :disable="editdetails === !isEditMode"
                  label="Username"
                  dense
                  class="q-pa-sm"
                />
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12">
                <q-input
                  filled
                  v-model="editedItem.Password"
                  :disable="editdetails === !isEditMode"
                  label="Password"
                  dense
                  class="q-pa-sm"
                />
              </div>
              <q-toggle
                v-model="editedItem.isAdmin"
                :disable="editdetails === !isEditMode"
                color="green"
                label="Set as Admin"
              />
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
            v-show="editdetails"
          />
          <q-btn
            label="Save"
            color="green-10"
            size="md"
            v-close-popup
            @click="save"
            class="q-mr-sm"
            :disable="editdetails === !isEditMode"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- USER ACCESS BUTTON DIALOG -->
    <q-dialog v-model="UserAccess">
      <q-card style="width: 50%; height: auto" class="container q-pa-sm">
        <q-card-section>
          <div class="row">
            <div class="text-h6 col-11">USER ACCESS</div>
            <div class="col-1">
              <q-btn flat round color="orange" icon="close" v-close-popup />
            </div>
          </div>
        </q-card-section>

        <q-table
          title="Module Names"
          :rows="loadCreds"
          :columns="ModuleColumn"
          row-key="id"
          flat
          bordered
          dense
        >
          <template v-slot:top-left>
            <q-btn
              label="ADD ACCESS"
              size="x-small"
              icon="add"
              @click="ModuleEditDialog = true"
              color="green-10"
              class="q-pa-sm q-mt-sm"
            ></q-btn>
          </template>
          <template v-slot:body-cell-actions="{ row }">
            <div class="actionsbtn">
              <q-btn
                icon="edit"
                flat
                round
                color="secondary"
                @click="editModule(row)"
              >
              </q-btn>
              <q-btn
                icon="delete"
                flat
                round
                color="deep-orange"
                @click="deleteCredentials(this.selectedid, row._id)"
              >
              </q-btn>
            </div>
          </template>
        </q-table>

        <!-- <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup size="md" />
           <q-btn
            label="Save"
            color="secondary"
            size="md"
            v-close-popup
            @click="save"
          />
        </q-card-actions> -->
      </q-card>
    </q-dialog>

    <q-dialog v-model="ModuleEditDialog">
      <q-card style="width: 50%; height: auto" class="container">
        <q-card-section>
          <div class="row">
            <div class="text-h6 col-11">USER ACCESS</div>
            <div class="col-1">
              <q-btn flat round color="orange" icon="close" v-close-popup />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <!-- Q-FORM FOR MODULE ADDITION -->
          <q-form>
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <!-- <q-input
                  label="Module Name"
                  filled
                  dense
                  class="q-pa-md"
                  v-model="editedItem.Credentials.Module"
                /> -->
                <q-select
                  filled
                  v-model="editedItem.Credentials.Module"
                  dense
                  class="q-pa-sm"
                  :options="filteredOptions"
                  label="Module Name"
                />
              </div>
              <div class="q-ml-md">
                <p>USER MODULE ACCESS</p>
                <q-separator></q-separator>
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12 q-gutter-sm q-ml-sm">
                <q-checkbox
                  v-model="editedItem.Credentials.Create"
                  val="True"
                  label="Create"
                  color="teal"
                />
                <br />

                <q-checkbox
                  v-model="editedItem.Credentials.Update"
                  label="Edit"
                  color="teal"
                />
                <br />
                <q-checkbox
                  v-model="editedItem.Credentials.Remove"
                  label="Delete"
                  color="teal"
                />
                <br />
                <q-checkbox
                  v-model="editedItem.Credentials.Display"
                  val="True"
                  label="View"
                  color="teal"
                />
              </div>
            </div>
          </q-form>
          <q-separator />
          <q-card-actions align="right">
            <!-- <q-btn
              flat
              label="Cancel"
              color="primary"
              v-close-popup
              size="md"
            /> -->
            <q-btn
              label="Save"
              color="green"
              size="md"
              v-close-popup
              @click="saveCreds(this.selectedid, this.selectedCredID)"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- For the Delete of User -->
    <q-dialog
      v-model="UserDelete"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-red text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Delete User</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Do you want to delete this User?
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
  </div>
</template>

<script>
import { ref } from "vue";
import { useStoreUserInfo } from "../stores/UserStore";

export default {
  data() {
    return {
      DeleteId: "",

      UserDelete: false,
      editdetails: true,
      isEditMode: false,
      AdminValue: false,
      loadCreds: [],
      selectedid: "",
      selectedCredID: "",
      selected: [],
      ModuleRows: [{}],
      ModuleColumn: [
        {
          name: "Module Name",
          align: "left",
          label: "MODULE NAME",
          field: "Module",
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
        },
      ],

      options: ["Employee", "Machine Equipment", "IT Equipment", "Project"],

      // defaultCreds: {
      //   Module: "",
      //   Create: false,
      //   Remove: false,
      //   Update: false,
      //   Display: false,
      // },
      // editedCreds: {
      //   Module: "",
      //   Create: false,
      //   Remove: false,
      //   Update: false,
      //   Display: false,
      // },

      ModuleEditDialog: false,
      createPermission: false,
      selectedRows: [],

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
        isAdmin: false,
        Credentials: {
          0: {
            Module: "",
            Create: false,
            Remove: false,
            Update: false,
            Display: false,
          },
        },
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
        isAdmin: false,
        Credentials: {
          Module: "",
          Create: false,
          Remove: false,
          Update: false,
          Display: false,
        },
      },
      UserAccess: false,

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
  computed: {
    filteredOptions() {
      return this.options.filter(
        (option) => !this.moduleExistsInCredentials(option)
      );
    },
  },
  methods: {
    toggleEditMode() {
      console.log("toggleEditMode called");
      this.isEditMode = !this.isEditMode;
    },
    moduleExistsInCredentials(module) {
      // Check if the selected module already exists in credentials
      const credentialsModules = this.loadCreds.map((cred) => cred.Module);
      return credentialsModules.includes(module);
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
      this.editdetails = false;

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
        isAdmin: false,
        // Credentials: {
        //   0: {
        //     Module: "",
        //     Create: false,
        //     Remove: false,
        //     Update: false,
        //     Display: false,
        //   },
        // },
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
    async accessItem(item) {
      this.loadCreds = [];
      console.log("selectedID :", item);
      this.selectedid = item._id;
      console.log("selectedID :", item._id);
      await this.storeCredsFetch
        .GetUserCredentials(this.selectedid)
        .then((res) => {
          this.loadCreds = this.storeCreds.user;
        });

      console.log("creds: ", this.loadCreds);
      // const storeAccess = useStoreUserInfo();
      // await storeAccess.GetUserCredentials(item._id).then((res) => {

      // })
      this.UserAccess = true;
    },
    editItem(item) {
      this.editdetails = true;
      const store = useStoreUserInfo();

      store.GetUser(item._id).then((res) => {
        this.editedItem = store.user;
        store.fetchUser();

        console.log("sdasda=", this.editedItem);
      });
      this.dialogVisible = true;
    },

    // FOR USER MODULE ACCESS EDIT
    editModule(item) {
      // const store = useStoreUserInfo();
      // store.GetUserCredentialsSpec(item._id,item.Credentials._id);
      this.selectedCredID = item._id;
      this.ModuleEditDialog = true;
      this.editedItem.Credentials = item;
      console.log("imong mama =", item.Module);
    },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      this.DeleteId = id._id;
      this.UserDelete = true;
      // const store = useStoreUserInfo();
      // store.DeleteUser(id._id).then((res) => {
      //   store.fetchUser();
      // });
    },

    deleteItemConfirm() {
      const store = useStoreUserInfo();
      store.DeleteUser(this.DeleteId).then((res) => {
        store.fetchUser();
      });
    },

    saveCreds(id, cid) {
      const store = useStoreUserInfo();
      console.log("pass userID=", id);
      console.log("pass credentialID=", cid);

      // store.UpdateCredentialsSpec(id,cid)
      const editedCredsCopy = { ...this.editedItem.Credentials };
      console.log("pass credentialID=", editedCredsCopy);

      if (editedCredsCopy._id) {
        store.UpdateCredentialsSpec(id, cid, editedCredsCopy).then((res) => {
          // console.log("Credentials updated successfully:", res);
          this.editedItem.Credentials = {
            Module: "",
            Create: false,
            Update: false,
            Remove: false,
            Display: false,
          };
        });
      } else {
        store.AddCred(this.selectedid, editedCredsCopy).then((res2) => {
          this.editedItem.Credentials = {
            Module: "",
            Create: false,
            Update: false,
            Remove: false,
            Display: false,
          };
          this.storeCredsFetch
            .GetUserCredentials(this.selectedid)
            .then((res) => {
              this.loadCreds = this.storeCreds.user;
            });
        });
        // store.fetchUser().then((res) => {
        //   store.GetUser(this.selectedid).then((res1) => {
        //     this.editedCreds = store.user;
        //     store.fetchUser();
        //   });
        // });
      }
    },

    deleteCredentials(id, cid) {
      const store = useStoreUserInfo();
      // console.log("USES TABLE  == UserID====" + id + "===== CredID======" + cid)
      try {
        store.DeleteCredentialsSpec(id, cid).then(() => {
          console.log("Successfuly Deleted");
          // store.GetUserCredentials(this.selectedid);
          this.storeCredsFetch.GetUserCredentials(id).then((res) => {
            this.loadCreds = this.storeCreds.user;
          });
        });
      } catch (error) {
        console.log("Unable to Delete: ", error);
      }
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
            isAdmin: false,
          };
          store.fetchUser().then((res) => {
            this.closeDialog();
            this.isEditMode = false;
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
            isAdmin: false,
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
        isAdmin: false,
      };
      this.dialogVisible = false;
    },
    getNextId() {
      const ids = this.rows.map((item) => item.id);
      return Math.max(...ids) + 1;
    },
  },
  created() {},

  setup() {
    const store = useStoreUserInfo();
    const storeAccess = useStoreUserInfo();
    const storeCreds = useStoreUserInfo();
    const storeCredsFetch = useStoreUserInfo();

    store.fetchUser();
    //storeAccess.GetUser();
    // storeCreds.AddCred();

    return {
      store,
      storeAccess,
      storeCreds,
      storeCredsFetch,
      model: ref(null),
      group: ref(["display"]),
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
</style>
