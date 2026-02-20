<template>
  <div class="q-pa-md">
    <q-card flat >
      <q-card-section  >
        <div class="text-h6 text-green">Library Module</div>
        <p class="text-caption text-grey-8">This is the Library Module component. You can add your content here.</p>
      </q-card-section>
      <q-card-section>
        <q-tabs v-model="tab" align="justify" indicator-color="green" class="bg-white text-grey-8"  dense>
          <q-tab name="employee" label="EMPLOYEES" />
          <q-tab name="machines" label="MACHINERY" />
          <q-tab name="it" label="IT Equipments" />
        </q-tabs>
          <q-separator/>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="employee">
              <!-- Employee content goes here -->
             <q-card>
                <q-card-section>
                  <div class="text-subtitle1">Employee Library</div>
                  <div class="q-mt-md">
                    <q-input filled v-model="equipmentTypes" label="Designation Types" />
                    <q-btn class="q-mt-md" align="right" color="green" label="Add Position Type" @click="addPositionType" />
                  </div>
                   <div class="q-mt-md">
                    <q-input filled v-model="equipmentTypes" label="Status Types" />
                    <q-btn class="q-mt-md" align="right" color="green" label="Add Position Type" @click="addPositionType" />
                  </div>

                </q-card-section>
             </q-card>
            </q-tab-panel>
            <q-tab-panel name="machines">
              <!-- Machinery content goes here -->
             <q-card>
                <q-card-section>
                  <div class="text-subtitle1">Machinery Library</div>
                  <div class="q-mt-md">
                    <q-input filled v-model="equipmentTypes" label="Machinery Category" />
                    <q-btn class="q-mt-md" align="right" color="green" label="Add Category" @click="addPositionType" />
                  </div>
                  <div class="q-mt-md">
                    <q-input filled v-model="equipmentTypes" label="Machinery Types" />
                    <q-btn class="q-mt-md" align="right" color="green" label="Add Type" @click="addPositionType" />
                  </div>
                </q-card-section>
             </q-card>
            </q-tab-panel>
            <q-tab-panel name="it">
              <!-- IT Module content goes here -->
              <q-card>
                <q-card-section>
                  <div class="text-subtitle1">IT Equipment Library</div>
                  <p class="text-caption text-grey-8">Manage IT equipment-related resources and information here.</p>
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
  name: 'LibraryModule',
  data() {
    return {
      // Add your reactive data here
      equipmentTypes: [],
      tab: 'employee', // Default active tab
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
