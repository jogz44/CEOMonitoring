<template>
  <div class="q-pa-lg">
    <q-card style="width: 100%; height: 45%; align-self: center;" class="q-pa-sm">
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
                v-model="IdNo"
                label="ID Number"
                dense
                class="q-pa-sm"
                type="number"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <q-input
                filled
                v-model="LastName"
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
                v-model="FirstName"
                label="Firstname"
                dense
                class="q-pa-sm"
              />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
              <q-input
                filled
                v-model="MiddleName"
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
                v-model="Designation"
                label="Designation"
                dense
                class="q-pa-sm"
              />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
              <q-input
                filled
                v-model="Office"
                label="Office"
                dense
                class="q-pa-sm"
              />
            </div>
          </div>
          <q-separator class="q-mb-sm"></q-separator>
          <div class="text-h6 q-pa-sm">Login Credentials</div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <q-input
                filled
                v-model="Username"
                label="Username"
                dense
                class="q-pa-sm"
              />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
              <q-input
                filled
                v-model="Password"
                label="Password"
                dense
                class="q-pa-sm"
              />
            </div>
            <!-- <q-toggle v-model="AdminValue" color="green" label="Set as Admin" /> -->
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <!-- <q-btn flat label="Cancel" color="primary" v-close-popup size="md" /> -->
        <q-btn
          label="EDIT"
          color="green"
          size="md"
          v-close-popup
          @click="save"
          class="q-mr-md q-pa-sm"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStoreUserInfo } from "../stores/UserStore";
import {useLoginStore} from "../stores/LoginStore"

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

  created() {
    const loginstore = useLoginStore();
    this.LastName = loginstore.user.LastName;
    this.IdNo = loginstore.user.IdNo;
    this.FirstName = loginstore.user.FirstName;
    this.MiddleName = loginstore.user.MiddleName;
    this.Designation = loginstore.user.Designation;
    this.Office = loginstore.user.Office;
    this.Username = loginstore.user.Username;
    this.Password = loginstore.user.Password;
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

<style>

</style>
