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
        wrap-cells=""
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
            :filter="filter"
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
            {{
              row.employmentDtl[row.employmentDtl.length - 1]
                ? row.employmentDtl[row.employmentDtl.length - 1].EmpStatus
                : null
            }}
          </q-td>
        </template>

        <template v-slot:body-cell-Drate="{ row }">
          <q-td>
            {{
              row.employmentDtl[row.employmentDtl.length - 1]
                ? row.employmentDtl[row.employmentDtl.length - 1].Drate
                : null
            }}
          </q-td>
        </template>

        <template v-slot:body-cell-DteStarted="{ row }">
          <q-td>
            {{
              row.employmentDtl[row.employmentDtl.length - 1]
                ? row.employmentDtl[row.employmentDtl.length - 1].DteStarted
                : null
            }}
          </q-td>
        </template>

        <template v-slot:body-cell-DteReceived="{ row }">
          <q-td>
            {{
              row.employmentDtl[row.employmentDtl.length - 1]
                ? row.employmentDtl[row.employmentDtl.length - 1].DteReceived
                : null
            }}
          </q-td>
        </template>

        <template v-slot:body-cell-de="{ row }">
          <q-td>
            {{
              row.employmentDtl[row.employmentDtl.length - 1]
                ? row.employmentDtl[row.employmentDtl.length - 1].DteEnded
                : null
            }}
          </q-td>
        </template>

        <template v-slot:body-cell-designation="{ row }">
          <q-td>
            {{
              row.employmentDtl[row.employmentDtl.length - 1]
                ? row.employmentDtl[row.employmentDtl.length - 1].Designation
                : null
            }}
          </q-td>
        </template>

        <template v-slot:body-cell-charges="{ row }">
          <q-td class="charges">
            {{
              row.employmentDtl[row.employmentDtl.length - 1]
                ? row.employmentDtl[row.employmentDtl.length - 1].Charges
                : null
            }}
          </q-td>
        </template>

        <template v-slot:body-cell-status="{ row }">
          <q-td
            ><q-chip
              style="height: auto"
              :class="
                getStatusClass(
                  row.employmentDtl[row.employmentDtl.length - 1]
                    ? row.employmentDtl[row.employmentDtl.length - 1].DteEnded
                    : null
                )
              "
            >
              {{
                getStatusClass2(
                  row.employmentDtl[row.employmentDtl.length - 1]
                    ? row.employmentDtl[row.employmentDtl.length - 1].DteEnded
                    : null
                ).status
              }}
              <br />
              {{
                row.employmentDtl[row.employmentDtl.length - 1]
                  ? row.employmentDtl[row.employmentDtl.length - 1].DteEnded
                  : null
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
            @click="deleteItemConfirm(this.DeleteId)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Mao ni gamita goooo bulok -->
    <q-dialog v-model="dialogVisibles" persistent="">
      <q-card style="width: 500px; max-width: 80vw; height: 450px" class="">
        <q-toolbar class="q-pa-md">
          <q-toolbar-title
            ><span class="text-weight-bold"
              >EMPLOYEE DETAILS</span
            ></q-toolbar-title
          >

          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
            color="orange"
            @click="this.isEditMode = false"
            v-show="exitBtn"
          />
        </q-toolbar>
        <!-- <q-card-section class="">
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
        </q-card-section> -->
        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form>
            <div class="row">
              <div class="col-12">
                <q-input
                  ref="lastname"
                  :rules="[this.required]"
                  filled
                  v-model="editedItem.lastName"
                  label="Lastname"
                  dense
                  class="q-pa-md"
                  :disable="employmenthistory === !isEditMode"
                  lazy-rules
                />
              </div>
              <div class="col-12">
                <q-input
                  ref="firstname"
                  :rules="[this.required]"
                  filled
                  v-model="editedItem.firstName"
                  label="Firstname"
                  class="q-pa-md"
                  dense
                  :disable="employmenthistory === !isEditMode"
                  lazy-rules
                />
              </div>
              <div class="col-12">
                <q-input
                  ref="middlename"
                  :rules="[this.required]"
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
            color="green-5"
            @click="save"
            class="q-mr-md"
            :disable="employmenthistory === !isEditMode"
          />
        </q-card-actions>
      </q-card>

      <!-- EMPLOYMENT DETAILS -->
      <q-card
        style="width: 500px; max-width: 80vw; height: 450px"
        v-show="employmenthistory"
      >
        <!-- <q-card-section style="max-height: " class="scroll">
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
        </q-card-section> -->
        <q-toolbar class="q-pa-md">
          <q-toolbar-title
            ><span class="text-weight-bold"
              >EMPLOYMENT DETAILS</span
            ></q-toolbar-title
          >
          <q-btn flat dense icon="close" v-close-popup color="orange" />
        </q-toolbar>
        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
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
            :rows-per-page-options="[2]"
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
                @click="createAppointment()"
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

            <!-- <template v-slot:body-cell-status="{ row }">
              <q-td
                ><q-chip :class="getStatusClass(row.employmentDtl[0].DteEnded)">
                  {{ getStatusClass2(row.employmentDtl[0].DteEnded).status }}
                </q-chip></q-td
              >
            </template> -->
            <template v-slot:body-cell-actions="{ row }">
              <div class="actionsbtn">
                <q-btn
                  icon="visibility"
                  flat
                  round
                  color="green-8"
                  @click="updateEmployment(row)"
                >
                </q-btn>
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
        </q-card-section>
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

    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="width: 500px">
        <!-- <q-card-section>
          <div class="row">
            <div class="col-11 text-h6">ADD EMPLOYMENT</div>
            <div class="col-1">
              <q-btn flat round color="orange" icon="close" v-close-popup />
            </div>
          </div>
        </q-card-section> -->
        <q-toolbar>
          <q-toolbar-title
            ><span class="text-weight-bold"
              >APPOINTMENT DETAILS</span
            ></q-toolbar-title
          >
          <q-btn
            flat
            dense
            icon="close"
            @click="closeAppointment()"
            color="orange"
          />
        </q-toolbar>
        <q-separator />
        <q-card-section class="q-pa-md">
          <div class="row">
            <div class="col-6 col-xs-12 col-sm-6">
              <q-input
                ref="dateStarted"
                :rules="[this.required]"
                lazy-rules
                filled
                v-model="EmpDtl.DteStarted"
                label="Date Started"
                dense
                class="q-pa-sm"
                type="date"
                :disable="AppointmentDtls === !isEditModeAppDtls"
              />
            </div>
            <div class="col-6 col-xs-12 col-sm-6">
              <q-input
                ref="dateEnded"
                :rules="[this.required]"
                lazy-rules
                filled
                v-model="EmpDtl.DteEnded"
                label="Date Ended"
                dense
                class="q-pa-sm"
                type="date"
                :disable="AppointmentDtls === !isEditModeAppDtls"
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
                class="q-pa-sm q-mt-sm"
                type="date"
                :disable="AppointmentDtls === !isEditModeAppDtls"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-select
                ref="designation"
                :rules="[this.requiredDesignation]"
                lazy-rules
                filled
                v-model="EmpDtl.Designation"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="designationoptions"
                @filter="filterFns"
                label="Designation"
                dense
                class="q-pa-sm"
                :disable="AppointmentDtls === !isEditModeAppDtls"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                ref="charges"
                :rules="[this.required]"
                lazy-rules
                autogrow
                filled
                v-model="EmpDtl.Charges"
                label="Charges"
                dense
                class="q-pa-sm q-mt-sm"
                :disable="AppointmentDtls === !isEditModeAppDtls"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6 col-xs-12 col-sm-6">
              <q-select
                ref="employeeStatus"
                :rules="[this.required]"
                lazy-rules
                filled
                v-model="EmpDtl.EmpStatus"
                :options="EmpStatus"
                label="Employee Status"
                class="q-pa-sm q-mt-sm"
                dense
                :disable="AppointmentDtls === !isEditModeAppDtls"
              />
            </div>
            <div class="col-6 col-xs-12 col-sm-6">
              <q-input
                ref="salaryRate"
                :rules="[this.required]"
                lazy-rules
                filled
                v-model="EmpDtl.Drate"
                label="Salary Rate"
                class="q-pa-sm q-mt-sm"
                dense
                :disable="AppointmentDtls === !isEditModeAppDtls"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-select
                ref="employeeRemarks"
                v-model="EmpDtl.Remarks"
                filled
                dense
                class="q-pa-sm q-mt-sm"
                label="Remarks"
                :options="EmpRemarks"
                :disable="AppointmentDtls === !isEditModeAppDtls"
                v-show="AppointmentDtls"
              >
              </q-select>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            round
            color="orange"
            icon="edit"
            @click="toggleEditModeAppointmentDtls()"
            v-show="AppointmentDtls"
          />
          <q-btn
            label="Save"
            color="green-5"
            size="md"
            class="q-mr-md"
            @click="savehistory(editedItem.id)"
            :disable="AppointmentDtls === !isEditModeAppDtls"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog for multiple received JO -->

    <q-dialog v-model="ReceiveJO">
      <q-card style="width: 500px; height: 65%">
        <q-toolbar class="q-pa-md">
          <q-toolbar-title
            ><span class="text-weight-bold">
              EMPLOYEE LIST</span
            ></q-toolbar-title
          >
        </q-toolbar>

        <!-- <q-card-section style="max-height: " class="scroll">
            <div class="row">
              <div class="col-12 text-h6">EMPLOYEE LIST</div>
            </div>
          </q-card-section> -->
        <q-separator />
        <q-card-section>
          <q-table
            flat
            :filter="filterReceived"
            bordered
            dense
            :rows="store.ActiveReceivedEmployees"
            :columns="columnsAdd"
            row-key="_id"
            :selected-rows-label="getSelectedString"
            selection="multiple"
            v-model:selected="selected"
            :rows-per-page-options="[10]"
          >
            <template v-slot:top-right>
              <q-btn
                label="Add Selected Employee"
                size="x-small"
                icon="chevron_right"
                @click="moveSelectedToSecondTable"
                color="green-10"
              ></q-btn>
            </template>
            <template v-slot:top-left>
              <q-input
                color="green"
                dense
                debounce="300"
                v-model="filterReceived"
                style="margin-bottom: 20px"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
        </q-card-section>
      </q-card>

      <q-card style="width: 500px; height: 65%">
        <q-toolbar class="q-pa-md">
          <q-toolbar-title
            ><span class="text-weight-bold"
              >SELECTED EMPLOYEE</span
            ></q-toolbar-title
          >
          <q-btn flat dense icon="close" v-close-popup color="orange" />
        </q-toolbar>
        <q-separator></q-separator>

        <!-- <q-card-section style="max-height: " class="scroll">
            <div class="row">
              <div class="col-11 text-h6">SELECTED EMPLOYEE</div>
              <div class="col-1">
                <q-btn
                  flat
                  round
                  color="orange"
                  icon="close"
                  v-close-popup
                  style="margin-top: -10px"
                />
              </div>
            </div>
          </q-card-section> -->
        <q-card-section>
          <q-table
            flat
            dense
            bordered
            :rows="secondTable"
            :columns="columnsAdd"
            row-key="_id"
            selection="multiple"
            v-model:selected="selectedSecondTable"
            table-style="width: 100%; max-height: 300px;"
            :rows-per-page-options="[10]"
          >
            <template v-slot:top-left>
              <q-btn
                label="Remove Selected Employee"
                size="x-small"
                icon="chevron_left"
                @click="removeSelectedFromSecondTable"
                color="green-10"
                style="margin-bottom: 20px; margin-top: 20px"
              ></q-btn>
            </template>
          </q-table>
        </q-card-section>

        <div class="row">
          <div class="col-9">
            <q-input
              filled
              v-model="recieveDate"
              label="Date Received"
              dense
              ref="dateReceived"
              lazy-rules
              :rules="[this.required]"
              class="q-ml-md"
              type="date"
            />
          </div>
          <div class="col-3">
            <q-btn
              label="RECEIVE"
              style="color: green"
              class="q-ml-md"
              @click="BatchReceiveEmployees()"
            />
          </div>
        </div>
      </q-card>
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
      // sampledata: ref([]),
      selectedSecondTable: [],
      secondTable: [],
      ReceiveJO: false,
      recieveDate: "",
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
      EmpRemarks: ["Returned", "Cancelled"],
      isFormValid: false,
      $q,
      // nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      EmployeeDeleteHistory: false,
      selectedID: ref(""),
      DeleteId: "",
      DeleteHistoryId: "",
      EmployeeDelete: false,
      isEditMode: false,
      isEditModeAppDtls: false,
      EmpHistoryDialog: false,
      employmenthistory: true,
      AppointmentDtls: true,
      filter: "",
      filters: "",
      filterReceived: "",
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
            Remarks: "",
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
          Remarks: "",
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
      columnsAdd: [
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
      ],

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
          align: "left",
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
        // {
        //   name: "de",
        //   label: "DATE ENDED",
        //   field: "employmentDtl[0].DteEnded",
        //   align: "center",
        // },
        {
          name: "DteReceived",
          label: "DATE RECEIVED",
          field: "employmentDtl[0].DteReceived",
          sortable: true,
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
          Remarks: "",
          Drate: "",
          IsDeleted: false,
        },
      },
      resumeLink: "",
    };
    // console.log("sge=", this.editedItem);
  },
  computed: {
    filteredEmployees() {
      const searchTerm = this.filter.toLowerCase();
      return this.store.personnels.filter((employee) => {
        const employmentDtl =
          employee.employmentDtl[employee.employmentDtl.length - 1] || {};
        const statusText = this.getStatusClass2(
          employmentDtl.DteEnded
        ).status.toLowerCase();
        const lastName = employee.lastName
          ? employee.lastName.toLowerCase()
          : "";
        const firstName = employee.firstName
          ? employee.firstName.toLowerCase()
          : "";
        const middleName = employee.middleName
          ? employee.middleName.toLowerCase()
          : "";

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
          EmpStatus.includes(searchTerm) ||
          statusText.includes(searchTerm)
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
    createAppointment() {
      this.secondDialog = true;
      this.AppointmentDtls = false;
    },
    BatchReceiveEmployees() {
      this.$refs.dateReceived.validate();

      if (!this.$refs.dateReceived.hasError) {
        const recievestore = useStorePersonnelInfo();
        let fin = true;
        for (let i = 0; i < this.secondTable.length; i++) {
          if (fin) {
            fin = false;
            // console.log("main id=",this.secondTable[i].employmentDtl[0]._id)
            this.secondTable[i].employmentDtl[0].DteReceived = this.recieveDate;
            console.log("main id=", this.secondTable[i].employmentDtl[0]);

            recievestore
              .AddReceive(
                this.secondTable[i]._id,
                this.secondTable[i].employmentDtl[0]._id,
                this.secondTable[i].employmentDtl[0]
              )
              .then((fin = true))
              .then((res) => {
                recievestore.fetchPersonnel();
                recievestore.ActiveReceivedEmployees;

                this.secondTable = [];
                this.EmpDtl = [
                  {
                    DteReceived: "",
                  },
                ];
              });
            window.alert("Selected items have been received.");
            this.ReceiveJO = false;
            this.filter = "";
          } else {
            if ((i = 0)) {
              i = 0;
            } else {
              i = i - 1;
            }
          }
        }
      }
    },

    //Received JO - Moving to the second table
    moveSelectedToSecondTable() {
      this.selected.forEach((employee) => {
        const index = this.store.personnels.findIndex(
          (e) => e._id === employee._id
        );
        if (index !== -1) {
          this.store.personnels.splice(index, 1);
        }
        this.secondTable.push(employee);
      });
      this.selected = [];
      console.log("Second Table =", this.secondTable);
    },
    //Received JO- Moving back items to the first table
    removeSelectedFromSecondTable() {
      this.selectedSecondTable.forEach((employee) => {
        const index = this.secondTable.findIndex((e) => e._id === employee._id);
        if (index !== -1) {
          this.secondTable.splice(index, 1);
        }
        // Add back to the first table
        this.store.personnels.push(employee);
      });

      // Clear the selected array
      this.selectedSecondTable = [];
    },
    // async onSubmit() {
    //   // Validate the form before submission
    //   await this.$refs.formRef.validate();

    //   // Check for validation errors
    //   if (this.$refs.lastNameRef.hasError || this.$refs.firstNameRef.hasError) {
    //     // Handle form validation errors
    //     this.$q.notify({
    //       color: "negative",
    //       message: "Please fill in all required fields.",
    //     });
    //   } else {
    //     // Continue with the form submission logic
    //     this.save();
    //   }
    // },
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
    toggleEditModeAppointmentDtls() {
      console.log("toggleEditMode called");
      this.isEditModeAppDtls = !this.isEditModeAppDtls;
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
      this.dialogVisibles = true;

      this.editedItem = {
        id: null,
        lastName: "",
        firstName: "",
        middleName: "",
        IsDeleted: false,
        resumeLink: "",
      };
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
        this.dialogVisibles = true;
      });
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

    updateEmployment(contractid) {
      this.secondDialog = true;
      const store = useStorePersonnelInfo();
      store.GetEmployment(this.selectedID, contractid._id).then((res) => {
        this.EmpDtl = store.EmpContractDtls;
      });
    },

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
          Remarks: "",
          Drate: "",
        },
        resumeLink: "",
      };
      this.closeDialog();
    },
    //Add Received Job Order Dialog
    AddJo() {
      this.ReceiveJO = true;
    },
    ReceiveEmployee() {
      if (!this.EmpDtl.DteReceived) {
        // Validate that a date is selected
        this.$q.notify({
          color: "negative",
          message: "Please select a date.",
        });
        return;
      }
      const store = useStorePersonnelInfo();
      const editedItemCopy = { ...this.editedItem };
    },
    required(val) {
      return (val && val.length > 0) || "Field must be filled in";
    },
    requiredDesignation(val) {
      return (val !== null && val !== undefined) || "Field must be filled in";
    },
    save() {
      this.$refs.lastname.validate();
      this.$refs.firstname.validate();
      this.$refs.middlename.validate();
      if (
        !this.$refs.lastname.hasError &&
        !this.$refs.firstname.hasError &&
        !this.$refs.middlename.hasError
      ) {
        const store = useStorePersonnelInfo();
        const editedItemCopy = { ...this.editedItem };
        console.log("edited item =>", editedItemCopy);

        if (editedItemCopy._id) {
          store
            .UpdatePersonnel(editedItemCopy._id, editedItemCopy)
            .then((res) => {
              this.closeDialog();
              this.editedItem = {
                lastName: "",
                firstName: "",
                middleName: "",
                resumeLink: "",
              };
              store.fetchPersonnel().then((res) => {
                this.isEditMode = false;
              });
            });
          console.log("Item Updated: ", editedItemCopy);
        } else {
          store.AddPersonnel(editedItemCopy).then((res) => {
            this.closeDialog();
            this.editedItem = {
              id: null,
              lastName: "",
              firstName: "",
              middleName: "",
              resumeLink: "",
            };
            store.fetchPersonnel().then((res) => {});
          });
          console.log("save=", editedItemCopy);
        }
      }
    },
    closeAppointment() {
      this.EmpDtl = [
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
      ];
      this.isEditModeAppDtls = false;
      this.secondDialog = false;
      this.AppointmentDtls = true;
    },
    savehistory() {
      this.$refs.dateStarted.validate();
      this.$refs.dateEnded.validate();
      this.$refs.designation.validate();
      this.$refs.charges.validate();
      this.$refs.employeeStatus.validate();
      this.$refs.salaryRate.validate();
      console.log("edited=", this.EmpDtl);
      if (
        !this.$refs.dateStarted.hasError &&
        !this.$refs.dateEnded.hasError &&
        !this.$refs.designation.hasError &&
        !this.$refs.charges.hasError &&
        !this.$refs.employeeStatus.hasError &&
        !this.$refs.salaryRate.hasError
      ) {
        const store = useStorePersonnelInfo();
        let editedItemCopy = { ...this.EmpDtl };

        // Remarks to be 1900 if cancelled or returned
        if (this.EmpDtl.Remarks === "Returned" ||  this.EmpDtl.Remarks === "Cancelled") {
            const dateParts = this.EmpDtl.DteEnded.split("-");
            const month = dateParts[1];
            const day = dateParts[2];
            this.EmpDtl.DteEnded = "1900-" + month + "-" + day;
          }
          console.log("this is the hotdog=>", this.EmpDtl.DteEnded);
          console.log("this is edited=>", this.EmpDtl)

        // editedItemCopy.Designation = this.EmpDtl.Designation.Designation;

        //add remarks
        // if ((this.EmpDtl.Remarks = "Returned")) {
        //   this.EmpDtl.DteEnded = "1900-01-01";
        // } else {
        // }

        if (editedItemCopy._id) {

          store
            .UpdateEmployment(
              this.selectedID,
              editedItemCopy._id,
              this.EmpDtl
            )
            .then((res) => {
              store.GetPersonnel(this.selectedID).then((res1) => {
                this.editedItem = store.personnel;
                store.GetPersonnelHistory(this.selectedID).then((res2) => {
                  this.EmpDtl = [
                    {
                      DteStarted: "",
                      DteEnded: "",
                      DteReceived: "",
                      Designation: "",
                      Charges: "",
                      EmpStatus: "",
                      Drate: "",
                      Remarks: "",
                      isDeleted: false,
                    },
                  ];
                  this.AppointmentDtls = true;
                  store.fetchPersonnel();
                });
              });
            });
        } else {
          store.AddEmployment(this.selectedID, editedItemCopy).then(() => {
            store.GetPersonnel(this.selectedID).then((res1) => {
              this.editedItem = store.personnel;
              store.GetPersonnelHistory(this.selectedID);
              (this.EmpDtl = [
                {
                  DteStarted: "",
                  DteEnded: "",
                  DteReceived: "",
                  Designation: "",
                  Charges: "",
                  EmpStatus: "",
                  Drate: "",
                  Remarks: "",
                  isDeleted: false,
                },
              ]),
                (this.AppointmentDtls = true);
              store.fetchPersonnel();
            });
          });
        }

        this.secondDialog = false;
      }
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
          Remarks: "",
          Drate: "",
        },

        resumeLink: "",
      };
      this.dialogVisibles = false;
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
  // onMounted() {
  //   this.sampledata.value = this.origdata.value.map((element) => element.Designation);
  // },
  setup() {
    const selected = ref([]);
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
    // const sampledata = ref([]);
    origdata.value = store.EmpDesignation;
    let sampledata = [];
    origdata.value.forEach((element) => {
      sampledata.push(element.Designation);
    });
    const designationoptions = ref(sampledata);
    // console.log("sampledata=", sampledata);
    return {
      designationoptions,
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],
      sampledata,
      remove,
      update,
      create,
      loginstore,
      store,
      model: ref(null),
      stringOptions,
      options,
      optionsD,
      selected,

      //filter of designation q-select
      filterFns(val, update) {
        if (val === "") {
          update(() => {
            designationoptions.value = sampledata;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          designationoptions.value = sampledata.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
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
      getSelectedString() {
        // this.rowsAdd =this.store.personnels;
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${store.personnels.length}`;
      },
    };
  },
};
</script>

<style scoped>
.my-sticky-header-table {
 height: 810px;
}
/* for the table ellipses */
.charges {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
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
td {
}
</style>
