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
              <q-card-section>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-input
                      filled
                      v-model="equipmentTypes"
                      label="Designation Types"
                    >
                      <template v-slot:append>
                        <q-btn
                          flat
                          icon="library_books"
                          @click="designationClicked"
                          class="cursor-pointer"
                        >
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
                      @click="NewPositionType"
                    >
                      <!-- <q-tooltip class="text-subtitle2">
                        Add new position type to the library
                      </q-tooltip> -->
                    </q-btn>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-input
                      filled
                      v-model="equipmentTypes"
                      label="Status Types"
                    >
                      <template v-slot:append>
                        <q-btn
                          flat
                          icon="library_books"
                          @click="StatusTypes"
                          class="cursor-pointer"
                        >
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
                      @click="NewStatusType"
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
          <q-tab-panel name="machines">
            <!-- Machinery content goes here -->
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-input
                      filled
                      v-model="equipmentTypes"
                      label="Designation Types"
                    >
                      <template v-slot:append>
                        <q-btn
                          flat
                          icon="library_books"
                          @click="PositionType"
                          class="cursor-pointer"
                        >
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
                      @click="NewPositionType"
                    >
                      <!-- <q-tooltip class="text-subtitle2">
                        Add new position type to the library
                      </q-tooltip> -->
                    </q-btn>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-input
                      filled
                      v-model="equipmentTypes"
                      label="Status Types"
                    >
                      <template v-slot:append>
                        <q-btn
                          flat
                          icon="library_books"
                          @click="StatusTypes"
                          class="cursor-pointer"
                        >
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
                      @click="NewStatusType"
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
          <q-tab-panel name="it">
            <!-- IT Module content goes here -->
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-input
                      filled
                      v-model="equipmentTypes"
                      label="Designation Types"
                    >
                      <template v-slot:append>
                        <q-btn
                          flat
                          icon="library_books"

                          class="cursor-pointer"
                        >
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
                      @click="NewPositionType"
                    >
                      <!-- <q-tooltip class="text-subtitle2">
                        Add new position type to the library
                      </q-tooltip> -->
                    </q-btn>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 q-mt-md">
                    <q-input
                      filled
                      v-model="equipmentTypes"
                      label="Status Types"
                    >
                      <template v-slot:append>
                        <q-btn
                          flat
                          icon="library_books"
                          @click="StatusTypes"
                          class="cursor-pointer"
                        >
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
                      @click="NewStatusType"
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
  <q-dialog v-model="showEmployeeDialog" persistent>
    <q-card style="max-width: 1280px; width: 50%; max-height: 900px; height: 100%;" flat>
      <q-card-section>
        <div class="text-h6 text-green q-mb-lg">Designation Types</div>
        <q-separator />
        </q-card-section>
        <q-card-section align="center">
        <!-- Designation types content goes here -->

          <q-table
          
          style="height: 600px; width: 900px;"
            :rows-per-page-options="[0]"
            virtual-scroll
            class="my-sticky-header-table q-pa-md"
            :rows="designationList"
            :columns="[
              { name: 'id', label: '#', field: (row)=>{
                  return this.designationList.indexOf(row) + 1;
              }, align: 'center' },
              {
                name: 'Designation',
                label: 'Designation Name',
                field: 'Designation',
                align: 'left',
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
           <q-tr :props="props">
            <q-td key="id">
              {{ props.rowIndex + 1}}
            </q-td>
            <q-td key="Designation">
              {{ props.row.Designation }}
            </q-td>
            <q-td key="actions">

              <q-btn flat icon="delete" color="red" @click="()=>{
                console.log('Delete clicked for', props.row._id);
              }" />
            </q-td>
           </q-tr>
          </template>
          </q-table>

      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Close"
          color="green"
          @click="showEmployeeDialog = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- END OF DESIGNATION TYPES -->

  <!-- STATUS Types -->
  <q-dialog> </q-dialog>
  <!-- END OF STATUS TYPES -->
</template>

<script>
import { useDesignationStore } from "src/stores/designationStore";

export default {
  name: "LibraryModule",



  setup() {
    const designationStore = useDesignationStore();
    // Add setup logic here
    return {
      designationStore,
    };
  },
  data() {
    return {
      showEmployeeDialog: false,
      showMachineDialog: false,
      showITDialog: false,

      designation: {},
      status: {},
      machineCategory: {},
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
  computed: {
    // Add computed properties here
  },
  methods: {

    designationClicked(){
      this.getDesignationList();
      this.showEmployeeDialog = true;
    },

    async getDesignationList(){
      try {
        await this.designationStore.fetchDesignation();
        this.designationList = this.designationStore.designationList;
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    }
    // Add methods here
  },
  mounted() {
    // Add lifecycle hooks here

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
