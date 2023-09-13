<template>
  <div class="dashboard column">
    <div class="col-3 col-sm-6">
      <q-card class="my-card" bordered>
        <q-card-section horizontal>
          <q-card-section>
            <q-item>
              <q-item-section avatar>
                <q-avatar
                  rounded
                  style="background-color: #007fff"
                  text-color="white"
                  icon="groups"
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
    </div>
    <div class="col-3 col-sm-6">
    <q-card class="my-card" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #007fff"
                text-color="white"
                icon="precision_manufacturing"
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
    </div>
    <div class="col-3 col-sm-6">
    <q-card class="my-card" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #007fff"
                text-color="white"
                icon="devices_other"
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
    </div>
    <div class="col-3 col-sm-6">
    <q-card class="my-card" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-avatar
                rounded
                style="background-color: #007fff"
                text-color="white"
                icon="engineering"
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
.dashboard {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  );
  gap: 30px;
  padding: 3%;
}

.my-card {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}


/* @media (max-width: 768px) {
  .dashboard {
    grid-template-columns: repeat(
      2,
      1fr
    );
  }
}


@media (max-width: 480px) {
  .dashboard {
    grid-template-columns: repeat(
      1,
      1fr
    );
  }
} */
</style>
