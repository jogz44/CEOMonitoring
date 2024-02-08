<template>
  <div class="q-pa-md">
    <q-btn
      icon="add"
      color="green-10"
      label="Add Employee"
      @click="Rowclick"
      class="q-mb-sm q-mr-md"
      v-if="create('Employee')"
    />
    <q-btn
      icon="add"
      color="green-8"
      label="Receive Multiple J.O"
      @click="AddJo"
      class="q-mb-sm q-mr-md"
    />
    <q-btn
      label="Download CSV"
      flat
      class="q-mb-sm"
      style="color: green"
      @click="exportToExcel"
    ></q-btn>
    <div style="width: auto">
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title="EMPLOYEE LIST"
        dense
        virtual-scroll
        :rows="filteredEmployees"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[20]"
      >
        <template v-slot:top-right>
          <q-input
            color="green"
            dense
            debounce="300"
            v-model="filter"
            style="margin-bottom: 20px"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-EmpStatus="{ row }">
          <q-td>
            {{ row.employmentDtl[0] ? row.employmentDtl[0].EmpStatus : null }}
          </q-td>
        </template>

        <template v-slot:body-cell-Drate="{ row }">
          <q-td>
            {{ row.employmentDtl[0] ? row.employmentDtl[0].Drate : null }}
          </q-td>
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
              v-if="update('Employee')"
              icon="visibility"
              flat
              round
              color="green-8"
              @click="editItem(row)"
              style="margin-right: -10px"
            >
            </q-btn>
            <!-- <q-btn
              v-if="update('Employee')"
              icon="add"
              size="sm"
              round
              color="green"
              @click="viewItem(row)"
            >
              <q-tooltip class="">Create Appointment</q-tooltip>
            </q-btn> -->

            <q-btn
              v-if="remove('Employee')"
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
    </div>

    <!-- For the Delete of the Employee -->
    <q-dialog
      v-model="EmployeeDelete"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-red text-white" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Delete Employee</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Do you want to delete this Employee?
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

    <!-- Mao ni gamita goooo bulok -->
    <q-dialog v-model="dialogVisibles" persistent="">
      <q-card style="width: 30%; max-width: 80vw; height: 50%">
        <q-card-section class="">
          <div class="row">
            <div class="col-11 text-h6">EMPLOYEE DETAILS</div>
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
          <q-form @submit.prevent.stop="onSubmit" ref="formRef">
            <div class="row">
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.lastName"
                  label="Lastname"
                  dense
                  class="q-pa-md"
                  :disable="employmenthistory === !isEditMode"
                  ref="lastNameRef"
                  lazy-rules
                  :rules="nameRules"
                />
              </div>
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.firstName"
                  label="Firstname"
                  class="q-pa-md"
                  dense
                  :disable="employmenthistory === !isEditMode"
                  ref="firstNameRef"
                  lazy-rules
                  :rules="nameRules"
                />
              </div>
              <div class="col-12">
                <q-input
                  filled
                  v-model="editedItem.middleName"
                  label="Middlename"
                  class="q-pa-md"
                  dense
                  maxlength="1"
                  :disable="employmenthistory === !isEditMode"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-file
                  dense
                  filled
                  accept=".pdf"
                  v-model="editedItem.resumeLink"
                  label="Resume"
                  class="q-ma-md"
                  icon="file"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </div>

            <div class="row"></div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            round
            color="orange"
            icon="edit"
            @click="toggleEditMode()"
            v-show="employmenthistory"
          />
          <q-btn
            type="submit"
            label="Save"
            color="green"
            v-close-popup
            @click="save"
            class="q-mr-md"
            :disable="employmenthistory === !isEditMode"
          />
        </q-card-actions>
        <!-- <q-card class="q-px-lg q-pt-sm q-mb-md">
          <q-btn
            style="width: 100%"
            class="btn-fixed-width"
            color="green-10"
            label="VIEW EMPLOYMENT HISTORY"
            icon="lightbulb_outline"
            @click="EmpHistoryDialog = true"
            v-show="employmenthistory"
          />
        </q-card> -->
      </q-card>

      <!-- EMPLOYMENT DETAIvisibilieditItemLS -->
      <q-card
        style="width: 40%; max-width: 80vw; height: 50%"
        v-show="employmenthistory"
      >
        <q-card-section style="max-height: " class="scroll">
          <div class="row">
            <div class="col-11 text-h6">EMPLOYMENT DETAILS</div>
            <div class="col-1">
              <q-btn
                flat
                round
                color="orange"
                icon="close"
                v-close-popup
                style="margin-top: -5px"
              />
            </div>
          </div>
        </q-card-section>

        <q-table
          class="my-sticky-header-table"
          flat
          bordered
          title=""
          wrap-cells=""
          dense
          :rows="store.EmpDtls"
          :columns="history"
          :filter="filters"
          row-key="id"
          style="margin-top: -5px"
        >
          <template v-slot:top-right>
            <q-input
              dense
              debounce="300"
              v-model="filters"
              placeholder="Search"
              color="green-10"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:top-left>
            <q-btn
              label="Create Appointment"
              size="x-small"
              icon="add"
              @click="secondDialog = true"
              color="green-10"
            ></q-btn>
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

          <template v-slot:body-cell-DteReceived="{ row }">
            <q-td>
              {{ row.DteReceived }}
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
                @click="deleteEmployment(row)"
              >
              </q-btn>
            </div>
          </template>
          <!-- <template v-slot:body-cell="{ row, charges }">
            <q-td class="custom-table-cell">
              {{ row[charges.name] }}
            </q-td>
          </template> -->
        </q-table>
        <q-dialog
          v-model="EmployeeDeleteHistory"
          persistent
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card class="bg-red text-white" style="width: 400px">
            <q-card-section>
              <div class="text-h6">Delete Employment History</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Do you want to delete this Employee Employment History?
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
                @click="deleteEmploymentHistory()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </q-dialog>

    <!-- <q-dialog v-model="dialogVisible" persistent>
      <div class="row">
        <div class="col">
          <q-card style="height: auto">
            <q-card-section>
              <div class="row">
                <div class="col-11 text-h6">EMPLOYEE DETAILS</div>
                <div class="col-1">
                  <q-btn
                    flat
                    round
                    color="orange"
                    icon="close"
                    v-close-popup
                    @click="this.isEditMode = false"
                  />
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
              <q-form @submit.prevent.stop="onSubmit" ref="formRef">
                <div class="row">
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="editedItem.lastName"
                      label="Lastname"
                      dense
                      class="q-pa-md"
                      :disable="employmenthistory === !isEditMode"
                      ref="lastNameRef"
                      lazy-rules
                      :rules="nameRules"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="editedItem.firstName"
                      label="Firstname"
                      class="q-pa-md"
                      dense
                      :disable="employmenthistory === !isEditMode"
                      ref="firstNameRef"
                      lazy-rules
                      :rules="nameRules"
                    />
                  </div>
                  <div class="col-12">
                    <q-input
                      filled
                      v-model="editedItem.middleName"
                      label="Middlename"
                      class="q-pa-md"
                      dense
                      :disable="employmenthistory === !isEditMode"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <q-file
                      dense
                      filled
                      accept=".pdf"
                      v-model="editedItem.resumeLink"
                      label="Resume"
                      class="q-ma-sm"
                      icon="file"
                      lazy-rules
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </div>
                </div>

                <div class="row"></div>
              </q-form>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                round
                color="orange"
                icon="edit"
                @click="toggleEditMode()"
                v-show="employmenthistory"
              />
              <q-btn
                type="submit"
                label="Save"
                color="green"
                v-close-popup
                @click="save"
                class="q-mr-md"
                :disable="employmenthistory === !isEditMode"
              />
            </q-card-actions>
            <q-card class="q-px-lg q-pt-sm q-mb-md">
              <q-btn
                style="width: 100%"
                class="btn-fixed-width"
                color="green-10"
                label="VIEW EMPLOYMENT HISTORY"
                icon="lightbulb_outline"
                @click="EmpHistoryDialog = true"
                v-show="employmenthistory"
              />
            </q-card>
          </q-card>
        </div>
        <div class="col">
          <q-card v-show="employmenthistory">
            <q-card-section style="max-height: 50vh" class="scroll">
              <div class="row">
                <div class="col-11 text-h6">EMPLOYMENT DETAILS</div>
                <div class="col-1">
                  <q-btn flat round color="orange" icon="close" v-close-popup />
                </div>
              </div>
            </q-card-section>

            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              title=""
              wrap-cells=""
              dense
              :rows="store.EmpDtls"
              :columns="history"
              :filter="filters"
              row-key="id"
            >
              <template v-slot:top-right>
                <q-input
                  dense
                  debounce="300"
                  v-model="filters"
                  placeholder="Search"
                  color="green-10"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:top-left>
                <q-btn
                  label="Create Appointment"
                  size="x-small"
                  icon="add"
                  @click="secondDialog = true"
                  color="green-10"
                ></q-btn>
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

              <template v-slot:body-cell-DteReceived="{ row }">
                <q-td>
                  {{ row.DteReceived }}
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
                  ><q-chip
                    :class="getStatusClass(row.employmentDtl[0].DteEnded)"
                  >
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
                    @click="deleteEmployment(row)"
                  >
                  </q-btn>
                </div>
              </template>
            </q-table>
            <q-dialog
              v-model="EmployeeDeleteHistory"
              persistent
              transition-show="scale"
              transition-hide="scale"
            >
              <q-card class="bg-red text-white" style="width: 400px">
                <q-card-section>
                  <div class="text-h6">Delete Employment History</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Do you want to delete this Employee Employment History?
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
                    @click="deleteEmploymentHistory()"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-separator />
            <div style="position: absolute; bottom: 5px; left: 10%"></div>
          </q-card>
        </div>
      </div>
    </q-dialog> -->

    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="width: 500px">
        <q-card-section>
          <div class="row">
            <div class="col-11 text-h6">ADD EMPLOYMENT</div>
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
                v-model="EmpDtl.DteStarted"
                label="Date Started"
                dense
                class="q-pa-sm"
                type="date"
              />
            </div>
            <div class="col">
              <q-input
                filled
                v-model="EmpDtl.DteEnded"
                label="Date Ended"
                dense
                class="q-pa-sm"
                type="date"
              />
            </div>
          </div>
          <div row>
            <div class="col">
              <q-input
                filled
                v-model="EmpDtl.DteReceived"
                label="Date Received"
                dense
                class="q-pa-sm"
                type="date"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-select
                filled
                v-model="EmpDtl.Designation"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsD"
                :option-label="(val) => val.Designation"
                @filter="filterFns"
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
                v-model="EmpDtl.Charges"
                label="Charges"
                dense
                class="q-pa-sm"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-select
                filled
                v-model="EmpDtl.EmpStatus"
                :options="EmpStatus"
                label="Employee Status"
                class="q-pa-sm"
                dense
              />
            </div>
            <div class="col">
              <q-input
                filled
                v-model="EmpDtl.Drate"
                label="Salary Rate"
                class="q-pa-sm"
                dense
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="orange" v-close-popup size="md" />
          <q-btn
            label="Save"
            color="green-5"
            size="md"
            v-close-popup
            @click="savehistory(editedItem.id)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="ReceiveJO">
      <q-card>test</q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useStorePersonnelInfo } from "../stores/personnelStore";
import { useLoginStore } from "src/stores/LoginStore";
import * as XLSX from "xlsx";
import { store } from "quasar/wrappers";

const stringOptions = ["Active", "End of Contract"];

//const API_URL ='http://10.0.1.23:5000/api/Personnels/'

export default {
  data() {
    const $q = useQuasar();

    return {
      ReceiveJO: false,
      exitBtn: true,
      dialogVisibles: false,
      // EmpDetails: false,
      // EmploymentDetails: false,
      // viewAdd: false,
      DeletedItem: [],
      EmpStatus: [
        "Regular",
        "Casual",
        "Job Order (Program-Based)",
        "Job Order (Project-Based)",
      ],
      isFormValid: false,
      $q,
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      EmployeeDeleteHistory: false,
      selectedID: ref(""),
      DeleteId: "",
      DeleteHistoryId: "",
      EmployeeDelete: false,
      isEditMode: false,
      EmpHistoryDialog: false,
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
        isDeleted: false,
        employmentDtl: {
          0: {
            DteStarted: "",
            DteEnded: "",
            DteReceived: "",
            Designation: "",
            Charges: "",
            EmpStatus: "",
            Drate: "",
            isDeleted: false,
          },
        },
        resumeLink: "",
      },
      EmpDtl: [
        {
          DteStarted: "",
          DteEnded: "",
          DteReceived: "",
          Designation: "",
          Charges: "",
          EmpStatus: "",
          Drate: "",
          isDeleted: false,
        },
      ],
      defaultItem: {
        id: null,
        lastName: "",
        firstName: "",
        middleName: "",

        employmentDtl: {
          DteStarted: "",
          DteEnded: "",
          DteReceived: "",
          Designation: "",
          Charges: "",
          EmpStatus: "",
          Drate: "",
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
          name: "EmpStatus",
          align: "center",
          label: "EMP STATUS",
          field: "employmentDtl[0].EmpStatus",
          sortable: true,
        },
        {
          name: "Drate",
          align: "center",
          label: "RATE",
          field: "employmentDtl[0].Drate",
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
        // {
        //   name: "DteReceived",
        //   label: "DATE RECEIVED",
        //   field: "employmentDtl[0].DteReceived",
        //   sortable: true,
        //   align: "center",
        // },
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
          name: "DteReceived",
          label: "Date Received",
          field: "DteReceived",
          sortable: true,
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
  created() {
    this.editedItem = {
      id: null,
      lastName: "",
      firstName: "",
      middleName: "",
      isDeleted: false,
      employmentDtl: {
        0: {
          DteStarted: "",
          DteEnded: "",
          DteReceived: "",
          Designation: "",
          Charges: "",
          EmpStatus: "",
          Drate: "",
          isDeleted: false,
        },
      },
      resumeLink: "",
    };
    console.log("sge=", this.editedItem);
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
        const dteReceived = employmentDtl.DteReceived
          ? employmentDtl.DteReceived.toLowerCase()
          : "";
        const designation = employmentDtl.Designation
          ? employmentDtl.Designation.toLowerCase()
          : "";
        const charges = employmentDtl.Charges
          ? employmentDtl.Charges.toLowerCase()
          : "";
        const Drate = employmentDtl.Drate
          ? employmentDtl.Drate.toLowerCase()
          : "";
        const EmpStatus = employmentDtl.EmpStatus
          ? employmentDtl.EmpStatus.toLowerCase()
          : "";

        return (
          lastName.includes(searchTerm) ||
          firstName.includes(searchTerm) ||
          middleName.includes(searchTerm) ||
          dteStarted.includes(searchTerm) ||
          dteEnded.includes(searchTerm) ||
          dteReceived.includes(searchTerm) ||
          designation.includes(searchTerm) ||
          charges.includes(searchTerm) ||
          Drate.includes(searchTerm) ||
          EmpStatus.includes(searchTerm)
        );
      });
    },
  },
  watch: {
    // editedItem: {
    //   handler() {
    //     this.validateForm();
    //   },
    //   deep: true,
    // },
  },
  methods: {
    async onSubmit() {
      // Validate the form before submission
      await this.$refs.formRef.validate();

      // Check for validation errors
      if (this.$refs.lastNameRef.hasError || this.$refs.firstNameRef.hasError) {
        // Handle form validation errors
        this.$q.notify({
          color: "negative",
          message: "Please fill in all required fields.",
        });
      } else {
        // Continue with the form submission logic
        this.save();
      }
    },
    // validateForm() {
    //   // Check if the required fields are filled
    //   this.isFormValid =
    //     this.editedItem.lastName.trim().length > 0 &&
    //     this.editedItem.firstName.trim().length > 0;
    // },
    toggleEditMode() {
      console.log("toggleEditMode called");
      this.isEditMode = !this.isEditMode;
    },
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
      this.exitBtn = true;

      this.editedItem = {
        id: null,
        lastName: "",
        firstName: "",
        middleName: "",
        isDeleted: false,
        resumeLink: "",
      };
      this.dialogVisibles = true;
    },
    //Add Received Job Order Dialog
    AddJo() {
      this.ReceiveJO = true;
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
      (this.selectedID = item._id),
        (this.exitBtn = false),
        (this.employmenthistory = true);
      const store = useStorePersonnelInfo();
      store.GetPersonnel(item._id).then((res) => {
        this.editedItem = store.personnel;
        console.log("this.editeditem=", this.editedItem);
      });
      store.GetPersonnelHistory(item._id).then((res) => {
        console.log("sdasda=", this.editedItem);
      });
      this.dialogVisibles = true;
    },

    // viewItem(item) {
    //   console.log("EmployeeInfo", item);
    //   this.editedItem = "";
    //   this.selectedID = item._id;
    //   // this.dialogVisible = true;
    //   // this.EmpHistoryDialog = true;

    //   const store = useStorePersonnelInfo();

    //   store.GetPersonnelHistory(this.selectedID).then((res) => {
    //     this.editedItem = store.EmpDtls;
    //     // store.GetPersonnel(this.selectedID);
    //     console.log("sdasda=", this.editedItem);

    //     this.dialogVisibles = true;
    //     this.EmploymentDetails = true;
    //     this.employmenthistory = true;
    //   });
    // },

    deleteItem(id) {
      console.log("Delete Item ID => ", id._id);
      this.DeletedItem = id;
      this.DeleteId = id._id;
      this.EmployeeDelete = true;
    },

    deleteItemConfirm() {
      const editedItemCopy = { ...this.editedItem };
      console.log("Delete Item ID => ", this.DeleteId);
      const store = useStorePersonnelInfo();
      editedItemCopy.isDeleted = true;

      store.DeletePersonnel(this.DeleteId, this.DeletedItem).then((res) => {
        store.fetchPersonnel();
      });

      // store.DeletePersonnel(this.DeleteId).then((res) => {
      //   store.fetchPersonnel();
      // });
      // console.log("row click=", id);
    },

    // deleteItemConfirmHistory() {
    //   console.log("Delete Item ID => ", this.DeleteId);
    //   const store = useStorePersonnelInfo();
    //   store.DeletePersonnel(this.DeleteId).then((res) => {
    //     store.fetchPersonnel();
    //   });
    //   console.log("row click=", id);
    // },

    deleteEmployment(contractid) {
      // console.log("Contract ID =>", id + "----" + contractid);
      this.DeleteHistoryId = contractid;
      this.EmployeeDeleteHistory = true;
      // const store = useStorePersonnelInfo();
      // store.DeleteEmployment(id, contractid).then((req) => {
      //   store.fetchPersonnel();
      //   store.GetPersonnel(id);
      // });
    },

    deleteEmploymentHistory() {
      console.log("Contract ID =>", this.DeleteHistoryId);
      const store = useStorePersonnelInfo();
      store
        .DeleteEmployment(this.selectedID, this.DeleteHistoryId._id)
        .then((req) => {
          store.fetchPersonnel();
          store.GetPersonnelHistory(this.selectedID);
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
          DteReceived: "",
          Designation: "",
          Charges: "",
          EmpStatus: "",
          Drate: "",
        },
        resumeLink: "",
      };
      this.closeDialog();
    },
    save() {
      const store = useStorePersonnelInfo();
      const editedItemCopy = { ...this.editedItem };
      console.log("edited item =>", editedItemCopy);
      if (
        this.editedItem.lastName.trim().length === 0 ||
        this.editedItem.firstName.trim().length === 0
      ) {
        this.$q.notify({
          color: "negative",
          message: "Please fill in all required fields.",
        });
        return; // Do not proceed with saving
      }

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
              this.isEditMode = false;
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
    savehistory() {
      const store = useStorePersonnelInfo();

      let editedItemCopy = { ...this.EmpDtl };
      editedItemCopy.Designation = this.EmpDtl.Designation.Designation;
      //console.log("item=", editedItemCopy);
      store.AddEmployment(this.selectedID, editedItemCopy).then(() => {
        store.GetPersonnel(this.selectedID).then((res1) => {
          this.editedItem = store.personnel;
          store.GetPersonnelHistory(this.selectedID);
          this.EmpDtl = "";
          store.fetchPersonnel();
          //  });
        });
      });
      //store.fetchPersonnel().then((res) => {
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
          DteReceived: "",
          Designation: "",
          Charges: "",
          EmpStatus: "",
          Drate: "",
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
          "Date Received",
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
          this.formatDate(row.employmentDtl[0]?.DteReceived) || "",
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

    store.fetchPersonnel();
    store.fetchDesignation();
    const optionsD = ref([]);
    const origdata = ref([]);
    origdata.value = store.EmpDesignation;

    return {
      // lastNameRef,
      // nameRules: [(val) => (val && val.length > 0) || "Please type something"],
      // onSubmit() {
      //   lastNameRef.value.validate();
      //   firstNameRef.value.validate();
      // },
      remove,
      update,
      create,
      loginstore,
      store,
      model: ref(null),
      stringOptions,
      options,
      optionsD,

      filterFns(val, update, abort) {
        const needle = (val || "").toLowerCase();
        const filteredItems = origdata.value.filter((item) =>
          item.Designation.toLowerCase().includes(needle)
        );

        update(() => {
          optionsD.value = filteredItems;
        });
      },

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
.custom-table-cell {
  white-space: normal;
  word-wrap: break-word;
}
</style>
