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
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "LibraryModule",
  data() {
    return {
      // Add your reactive data here
      equipmentTypes: [],
      tab: "employee", // Default active tab
    };
  },
  computed: {
    // Add computed properties here
  },
  methods: {
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
