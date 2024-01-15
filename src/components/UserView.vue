<template>
  <div >
    <q-card style="width: 50%; height: 45%; align-self: center;">
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
            <q-toggle v-model="AdminValue" color="green" label="Set as Admin" />
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
  </div>
</template>

<script>
import { ref } from "vue";
import { useStoreUserInfo } from "../stores/UserStore";

export default {
  data() {
    return {
      dialogVisible: true,
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
        Credentials: {
          Module: "",
          Create: false,
          Remove: false,
          Update: false,
          Display: false,
        },
      },
    };
  },
  setup() {
    const store = useStoreUserInfo();
    const storeAccess = useStoreUserInfo();
    const storeCreds = useStoreUserInfo();
    const storeCredsFetch = useStoreUserInfo();

    store.fetchUser();
    //storeAccess.GetUser();
    storeCreds.AddCred();

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
