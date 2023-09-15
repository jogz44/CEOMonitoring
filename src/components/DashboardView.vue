<template>
   <div>
  <div class="row dashboard">

    <div class="col-12 col-sm-6 col-md-3 col-lg-3">
      <q-card class="my-card" bordered >
        <q-card-section horizontal class="content" @click="employee=true">
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #057407"
                text-color="white"
                icon="groups"
              >
              </q-avatar>
            </q-item-section>

            <q-item-section >
              <q-item-label><b>CEO EMPLOYEE</b></q-item-label>
              <p>
                <b style="font-size: 20px; color:#057407 ;">{{ store.personnelsCount }}</b>
              </p>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-sm-6 col-md-3 col-lg-3">
      <q-card class="my-card" bordered>
        <q-card-section horizontal >
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #057407"
                text-color="white"
                icon="precision_manufacturing"
              >
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label><b>MACHINE EQUIPMENT</b></q-item-label>
              <p>
                <b style="font-size: 20px; color:#057407 ;">{{
                  storeEquipment.equipmentsCount
                }}</b>
              </p>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-sm-6 col-md-3 col-lg-3">
      <q-card class="my-card" bordered>
        <q-card-section horizontal>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #057407"
                text-color="white"
                icon="devices_other"
              >
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label><b>IT EQUIPMENT</b></q-item-label>
              <p>
                <b style="font-size: 20px; color:#057407 ;">{{
                  storeITEquipment.itequipmentsCount
                }}</b>
              </p>
            </q-item-section>
          </q-item>


        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-sm-6 col-md-3 col-lg-3">
      <q-card class="my-card" bordered>
        <q-card-section horizontal>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #057407"
                text-color="white"
                icon="engineering"
              >
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label><b>CEO PROJECTS</b></q-item-label>
              <p>
                <b style="font-size: 20px; color:#057407 ;">{{
                  storeITEquipment.itequipmentsCount
                }}</b>
              </p>
            </q-item-section>
          </q-item>

        </q-card-section>
      </q-card>
    </div>
  </div>

    <div v-if="employee">
      <!-- <router-view /> -->
      <CenterTable />
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import CenterTable from "./CenterTable.vue";
import { useStorePersonnelInfo } from "../stores/personnelStore";
import { useEquipmentInfo } from "../stores/EquipmentsStore";
import { useITEquipmentInfo } from "../stores/ItStore";
import { useStoreProjectInfo } from "../stores/ProjectStore";

export default defineComponent({
  name: "DashboardView",
  components: {
    CenterTable,
  },
  data(){
    return {
      employee: false,

    }
  },
  setup() {
    const store = useStorePersonnelInfo();
    const storeEquipment = useEquipmentInfo();
    const storeITEquipment = useITEquipmentInfo();
    const storeProjectInfo = useStoreProjectInfo();

    store.fetchPersonnel();
    storeEquipment.fetchEquipment();
    storeITEquipment.fetchITEquipment();
    storeProjectInfo.fetchProject();

    return {
      store,
      storeEquipment,
      storeITEquipment,
      storeProjectInfo,
    };
  },
});
</script>

<style scoped>
.dashboard {
  padding: 2%;
  justify-content: space-between;
}

.my-card {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  margin: 1%;
}

@media (max-width: 768px) {
.responsive-text{
  font-size: 1px !important;
}
}

@media (max-width: 480px) {

.responsive-text{
  font-size: 1px !important;
}

}
</style>
