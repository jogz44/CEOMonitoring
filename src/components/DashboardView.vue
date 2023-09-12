<template>
  <div class="dashboard">
    <q-card class="my-card" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #007fff"
                text-color="white"
                icon="account-group-outline"
              >
              </q-avatar>
            </q-item-section>

            <q-item-section class="">
              <q-item-label><b>CEO EMPLOYEE</b></q-item-label>
              <q-item-label caption> Employee List </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="q-pa-md">
          <div
            class="text-center"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            "
          >
            <!-- Center horizontally -->
            <p>
              <b style="font-size: 30px">{{ store.personnelsCount }}</b>
            </p>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="my-card" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #007fff"
                text-color="white"
                icon="account-group-outline"
              >
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label><b>MACHINE EQUIPMENT</b></q-item-label>
              <q-item-label caption> Machine List </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="q-pa-md">
          <div
            class="text-center"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            "
          >
            <!-- Center horizontally -->
            <p>
              <b style="font-size: 30px">{{
                storeEquipment.equipmentsCount
              }}</b>
            </p>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="my-card" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #007fff"
                text-color="white"
                icon="account-group-outline"
              >
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label><b>IT EQUIPMENT</b></q-item-label>
              <q-item-label caption> IT Equipment List</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="q-pa-md">
          <div
            class="text-center"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            "
          >
            <!-- Center horizontally -->
            <p>
              <b style="font-size: 30px">{{
                storeITEquipment.itequipmentsCount
              }}</b>
            </p>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="my-card" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #007fff"
                text-color="white"
                icon="account-group-outline"
              >
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label><b>CEO PROJECTS</b></q-item-label>
              <q-item-label caption> Project List </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="q-pa-md">
          <div
            class="text-center"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            "
          >
            <!-- Center horizontally -->
            <p>
              <b style="font-size: 30px">{{
                storeITEquipment.itequipmentsCount
              }}</b>
            </p>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useStorePersonnelInfo } from "../stores/personnelStore";
import { useEquipmentInfo } from "../stores/EquipmentsStore";
import { useITEquipmentInfo } from "../stores/ItStore";
import { useStoreProjectInfo } from "../stores/ProjectStore";

export default {
  name: "DashboardView",
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
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>

<style scoped>
/* Add custom CSS styles here */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 3%;
}
.my-card {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}
</style>
