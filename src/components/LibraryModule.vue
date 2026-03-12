<template>
  <div class="q-pa-md">
    <q-card flat>
      <q-card-section>
        <div class="text-h6 text-green">Library Module</div>
        <q-separator />
      </q-card-section>
      <q-card-section>
        <q-tabs
          v-model="tab"
          align="justify"
          indicator-color="green"
          class="bg-white text-grey-8"
          dense
        >
          <q-tab name="employee" label="EMPLOYEES" />
          <q-tab name="machines" label="MACHINERY" />
          <q-tab name="it" label="IT Equipments" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="employee">
            <!-- Employee content goes here -->
            <q-card>
              <q-card-section  >
                <div class="row" >
                  <div class="col-6 q-mt-md">
                    <q-btn
                      class="q-mt-md"
                      color="green"
                      label="New Position"
                      @click="designationClicked"
                    >
                      <q-tooltip class="text-subtitle2">
                        Add new position to the library
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-btn
                      class="q-mt-md"
                      color="green"
                      label="New Status Type"
                      @click="StatusClicked"
                    >
                      <q-tooltip class="text-subtitle2">
                        Show status list in the library
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="machines">
            <!-- Machinery content goes here -->
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-btn
                      class="q-mt-md"
                      align="right"
                      color="green"
                      label="New Machine Category"
                      @click="CategoryClicked"
                    >
                      <q-tooltip class="text-subtitle2">
                        Add new Category type to the Machine library
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 q-mt-md">

                    <q-btn
                      class="q-mt-md"
                      align="right"
                      color="green"
                      label="New Machine Type"
                    >
                      <q-tooltip class="text-subtitle2">
                        Show Type list in the library
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="it">
            <!-- IT Module content goes here -->
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-input filled label="Designation Types">
                      <template v-slot:append>
                        <q-btn flat icon="library_books" class="cursor-pointer">
                          <q-tooltip class="text-subtitle2">
                            Show position list in the library
                          </q-tooltip>
                        </q-btn>
                      </template>
                    </q-input>
                    <q-btn
                      class="q-mt-md"
                      align="right"
                      color="green"
                      label="Add Position Type"
                    >
                      <!-- <q-tooltip class="text-subtitle2">
                        Add new position type to the library
                      </q-tooltip> -->
                    </q-btn>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-input filled label="Status Types">
                      <template v-slot:append>
                        <q-btn flat icon="library_books" class="cursor-pointer">
                          <q-tooltip class="text-subtitle2">
                            Show status list in the library
                          </q-tooltip>
                        </q-btn>
                      </template>
                    </q-input>
                    <q-btn
                      class="q-mt-md"
                      align="right"
                      color="green"
                      label="Add Status Type"
                    >
                      <!-- <q-tooltip class="text-subtitle2">
                        Show status list in the library
                      </q-tooltip> -->
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </div>
  <!-- Designation Types -->
  <q-dialog v-model="showEmployeeDesignationDialog" persistent>
    <q-card style="max-width: 1280px; width: 90vw; max-height: 90vh" flat>
      <q-card-section align="center" class="q-pa-sm q-pa-md-md">
        <q-input
          filled
          v-model="designation"
          label="Designation Types"
          class="text-caption q-pb-md"
        >
          <template v-slot:append>
            <q-btn
              flat
              icon="save"
              @click="insert_designation(designation)"
              class="cursor-pointer text-green-8"
            >
              <q-tooltip class="text-subtitle2">
                save new designation type to the library
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
        <!-- Designation types content goes here -->
        <q-table
          :filter="designation"
          no-data-label="No Data Available as of the moment"
          style="height: 60vh; width: 100%"
          :rows-per-page-options="[0]"
          virtual-scroll
          class="my-sticky-header-table q-pa-md full-width"
          table-header-class="text-white"
          :rows="DesignationList"
          :columns="[
            {
              name: 'id',
              label: 'No.',
              align: 'left',
            },
            {
              name: 'Designation',
              label: 'Designation Name',
              field: 'Designation',
              align: 'center',
            },
            {
              name: 'actions',
              label: 'Actions',
              field: 'actions',
              align: 'center',
            },
          ]"
        >
          <template #body="props">
            <q-tr :props="props" class="text-caption text-weight-regular">
              <q-td key="id">
                {{ props.rowIndex + 1 }}
              </q-td>
              <q-td key="Designation">
                {{ props.row.Designation }}
              </q-td>
              <q-td key="actions" align="center">
                <q-btn
                  flat
                  icon="delete"
                  color="red"
                  @click="remove_designation(props.row._id)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          class="q-mr-md"
          label="Close"
          color="red"
          @click="showEmployeeDesignationDialog = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- END OF DESIGNATION TYPES -->

  <!-- STATUS Types -->
   <q-dialog v-model="showEmployeeStatusDialog" persistent>
    <q-card style="max-width: 1280px; width: 90vw; max-height: 90vh" flat>
      <q-card-section align="center" class="q-pa-sm q-pa-md-md">
        <q-input
          filled
          v-model="status"
          label="Status Types"
          class="text-caption q-pb-md"
        >
          <template v-slot:append>
            <q-btn
              flat
              icon="save"
              @click="insert_status(status)"
              class="cursor-pointer text-green-8"
            >
              <q-tooltip class="text-subtitle2">
                save new status type to the library
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
        <q-table
          :filter="status"
          no-data-label="No Data Available as of the moment"
          style="height: 60vh; width: 100%"
          :rows-per-page-options="[0]"
          virtual-scroll
          class="my-sticky-header-table q-pa-md full-width"
          table-header-class="text-white"
          :rows="StatusList"
          :columns="[
            {
              name: 'id',
              label: 'No.',
              align: 'left',
            },
            {
              name: 'status',
              label: 'Status Description',
              field: 'status',
              align: 'center',
            },
            {
              name: 'actions',
              label: 'Actions',
              field: 'actions',
              align: 'center',
            },
          ]"
        >
          <template #body="props">
            <q-tr :props="props" class="text-caption text-weight-regular">
              <q-td key="id">
                {{ props.rowIndex + 1 }}
              </q-td>
              <q-td key="status">
                {{ props.row.status }}
              </q-td>
              <q-td key="actions" align="center">
                <q-btn
                  flat
                  icon="delete"
                  color="red"
                  @click="remove_status(props.row._id)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          class="q-mr-md"
          label="Close"
          color="red"
          @click="showEmployeeStatusDialog = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- END OF STATUS TYPES -->

     <!-- MACHINE CATEGORY Types -->
   <q-dialog v-model="showMachineCategoryDialog" persistent>
    <q-card style="max-width: 1280px; width: 90vw; max-height: 90vh" flat>
      <q-card-section align="center" class="q-pa-sm q-pa-md-md">
        <q-input
          filled
          v-model="machineCategory"
          label="Machine Category"
          class="text-caption q-pb-md"
        >
          <template v-slot:append>
            <q-btn
              flat
              icon="save"
              @click="insert_status(status)"
              class="cursor-pointer text-green-8"
            >
              <q-tooltip class="text-subtitle2">
                save new Category type to the library
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
        <q-table
          :filter="machineCategory"
          no-data-label="No Data Available as of the moment"
          style="height: 60vh; width: 100%"
          :rows-per-page-options="[0]"
          virtual-scroll
          class="my-sticky-header-table q-pa-md full-width"
          table-header-class="text-white"
          :rows="CategoryList"
          :columns="[
            {
              name: 'id',
              label: 'No.',
              align: 'left',
            },
            {
              name: 'category',
              label: 'Category Description',
              field: 'category',
              align: 'center',
            },
            {
              name: 'actions',
              label: 'Actions',
              field: 'actions',
              align: 'center',
            },
          ]"
        >
          <template #body="props">
            <q-tr :props="props" class="text-caption text-weight-regular">
              <q-td key="id">
                {{ props.rowIndex + 1 }}
              </q-td>
              <q-td key="category">
                {{ props.row.category }}
              </q-td>
              <q-td key="actions" align="center">
                <q-btn
                  flat
                  icon="delete"
                  color="red"
                  @click="remove_status(props.row._id)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          class="q-mr-md"
          label="Close"
          color="red"
          @click="showMachineCategoryDialog = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- END OF category TYPES -->
</template>

<script>
import { useDesignationStore } from "src/stores/designationStore";
import { useEmployeeStatusStore } from "src/stores/EmployeeStatusStore";
import { useMachineCategoryStore } from "src/stores/MachineryCategoryStore";
import { Notify } from "quasar";

export default {
  name: "LibraryModule",

  setup() {
    const designationStore = useDesignationStore();
    const employeeStatusStore = useEmployeeStatusStore();
    const machineCategoryStore = useMachineCategoryStore();
    // Add setup logic here
    return {
      designationStore,
      employeeStatusStore,
      machineCategoryStore
    };
  },
  data() {
    return {
      filterDesignation: "",

      showEmployeeDesignationDialog: false,
      showEmployeeStatusDialog: false,
      showMachineCategoryDialog: false,
      showITDialog: false,

      designation: null,
      status: null,
      machineCategory: null,
      machineType: {},
      ITequipmentType: {},

      designationList: [],
      statusList: [],
      machineCategoryList: [],
      machineTypeList: [],
      ITequipmentTypeList: [],

      tab: "employee", // Default active tab
    };
  },

  methods: {

    async insert_status(payload){
          try {
        if (!payload?.trim()) {
          Notify.create({
            type: "warning",
            message: "Please enter a designation name.",
            position: "center",
          });
          return;
        }
        console.log("Saving new status with payload:", {
          status: payload,
        });
        await this.employeeStatusStore.NewStatus({ status: payload });
        this.status = null; // Clear the input after adding
      } catch (error) {
        console.error("Error adding new status:", error.message);
      }
    },

     async remove_status(id) {
      try {
        console.log("Deleting status with id:", id);
        await this.employeeStatusStore.DeleteStatus(id);
      } catch (error) {
        console.error("Error deleting designation:", error.message);
      }
    },

    async remove_designation(id) {
      try {
        console.log("Deleting designation with id:", id);
        await this.designationStore.RemoveDesignation(id);
      } catch (error) {
        console.error("Error deleting designation:", error.message);
      }
    },
    async insert_designation(payload) {
      try {
        if (!payload?.trim()) {
          Notify.create({
            type: "warning",
            message: "Please enter a designation name.",
            position: "center",
          });
          return;
        }
        console.log("Saving new designation with payload:", {
          Designation: payload,
        });
        await this.designationStore.NewDesignation({ Designation: payload });
        // this.designation = null; // Clear the input after adding
      } catch (error) {
        console.error("Error adding new designation:", error.message);
      }
    },

    designationClicked() {
      this.getDesignationList();
      this.showEmployeeDesignationDialog = true;
    },

     StatusClicked() {
      this.getStatusList();
      this.showEmployeeStatusDialog = true;
    },

    CategoryClicked(){
      this.getMachineCategoryList();
      this.showMachineCategoryDialog = true;
    },


    // async getMachineCategoryList(){
    //    try {
    //     await this.machineCategoryStore.MachineCategoryList();
    //   } catch (error) {
    //     console.error("Error fetching Machine Category:", error);
    //   }

    // },

    // async getDesignationList() {
    //   try {
    //     await this.designationStore.fetchDesignation();
    //   } catch (error) {
    //     console.error("Error fetching designations:", error);
    //   }
    // },

    //  async getStatusList() {
    //   try {
    //     await this.employeeStatusStore.fetchStatusList();
    //   } catch (error) {
    //     console.error("Error fetching statuses:", error);
    //   }
    // },
  },

  computed: {
    // Add computed properties here

    DesignationList() {
      return this.designationStore.designationList;
    },

    StatusList(){
      return this.employeeStatusStore.statusList;
    },

    CategoryList(){
      return this.machineCategoryStore.MachineCategoryList;
    }
  },
};
</script>

<style scoped>
/* Add component styles here */
</style>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 610px


  thead tr th
    /* bg color is important for th; just specify one */
    background-color: #008000

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 100px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 50px
</style>
