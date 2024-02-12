<template>
  <div>
    <div class="row dashboard" v-if="menu">
      <div class="col-12 col-sm-6 col-md-3 col-lg-3">
        <q-card class="my-card" bordered>
          <q-card-section horizontal @click="CeoEmployee">
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

              <q-item-section>
                <q-item-label><b>CEO EMPLOYEE</b></q-item-label>
                <p>
                  <b style="font-size: 20px; color: #057407">{{
                    store.ActiveCount
                  }}</b>
                </p>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3 col-lg-3">
        <q-card class="my-card" bordered>
          <q-card-section horizontal @click="MachineEquipment">
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
                <q-item-label><b>MACHINERY</b></q-item-label>
                <p>
                  <b style="font-size: 20px; color: #057407">{{
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
          <q-card-section horizontal @click="ItEquipment">
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
                  <b style="font-size: 20px; color: #057407">{{
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
          <q-card-section horizontal @click="CeoProjects">
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
                  <b style="font-size: 20px; color: #057407">{{
                    storeProjectInfo.projectsCount
                  }}</b>
                </p>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- dashboard -->
    <div class="row chart">
      <div class="col-12 col-sm-6 col-md-3 col-lg-3">
        <q-card class="my-card" bordered>
          <q-card-section>
            <q-card>
              <p class="q-pa-md" style="text-align: center">
                <b style="font-size: 18px; color: #057407"
                  >EMPLOYEE DESIGNATION
                </b>
              </p>
            </q-card>
            <q-card>
              <q-table
                dense
                :rows="store.designationtype"
                :columns="personnelcolumns"
                :rows-per-page-options="[5]"
              >
              </q-table>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3 col-lg-3">
        <q-card class="my-card" bordered>
          <q-card-section>
            <q-card>
              <p class="q-pa-md" style="text-align: center">
                <b style="font-size: 18px; color: #057407"
                  >MACHINE EQUIPMENT
                </b>
              </p>
            </q-card>

            <p>
              <b>
                Heavy Equipment:
                <span style="font-size: 18px; color: #057407">{{
                  storeEquipment.heavyEquipmentsCount
                }}</span></b
              >
            </p>
            <p>
              <b>
                Light Equipment:
                <span style="font-size: 18px; color: #057407">{{
                  storeEquipment.lightEquipmentsCount
                }}</span></b
              >
            </p>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3 col-lg-3">
        <q-card class="my-card" bordered>
          <q-card-section>
            <q-card>
              <p class="q-pa-md" style="text-align: center">
                <b style="font-size: 18px; color: #057407">IT EQUIPMENT </b>
              </p>
            </q-card>
            <q-card>
              <q-table
                dense
                :rows="storeITEquipment.itequipmenttype"
                :columns="itcolumns"
                :rows-per-page-options="[5]"
              >
                <!-- <template v-slot:body-cell-ItemCount="{ row }">
                  <q-td>
                    {{ row.ItemCount }}
                  </q-td>
                </template> -->
              </q-table>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3 col-lg-3">
        <q-card class="my-card" bordered>
          <q-card-section>
            <q-card>
              <p class="q-pa-md" style="text-align: center">
                <b style="font-size: 18px; color: #057407">PROJECT NAMES </b>
              </p>
            </q-card>
            <q-card>
              <q-table
                dense
                :rows="latestProject"
                :columns="columns"
                :rows-per-page-options="[5]"
              >
                <template v-slot:body-cell-DateStarted="{ row }">
                  <q-td>
                    {{ formatDate(row.DateStarted) }}
                  </q-td>
                </template>
              </q-table>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- chart viewing -->
    <p class="text-h6 q-pa-xl" style="margin-bottom: -70px; color: green;">CEO PROJECTS UPDATES</p>
    <div class="row dashboard">
      <div class="col-12 col-sm-6 col-md-3 col-lg-3">
        <q-card class="my-card" bordered>
          <q-card-section>
            <pie-chart :chart-data="ChartDatas()" class="pie" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-3 col-lg-3">
        <q-card class="my-card" bordered>
          <q-card-section>
            <status-chart :chart-data="ChartDatas()" class="pie" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-6 col-lg-6">
        <q-card class="my-card" bordered>
          <q-card-section>
            <q-card>
              <q-card-section>
                <p><b style="font-size: 14px">Total Ongoing Projects Cost : </b></p>
              </q-card-section>
            </q-card>

            <q-card class="q-mt-sm">
              <q-card-section>
                <p>
                  <b style="font-size: 20px; color: #057407">PHP </b>
                  <br />
                  <b
                    style="color: #057407; text-align: center; display: block"
                    class="responsive-text"
                    >{{ formatProjectCost(storeProjectInfo.projectCost) }}</b
                  >
                </p>
              </q-card-section>
            </q-card>

            <div class="row">
              <div class="col q-mr-sm">
                <q-card class="q-mt-sm ">
                  <q-card-section>
                    <p>
                      <b style="font-size: 14px"
                        >Total Projects for 2024 : <br />
                        <p>
                          <b
                            style="
                              font-size: 20px;
                              color: #057407;
                              text-align: center;
                              display: block;
                            "
                            >{{ storeProjectInfo.projectsCount }}</b
                          >
                        </p></b
                      >
                    </p>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col">
                <q-card class="q-mt-sm">
                  <q-card-section>
                    <p>
                      <b style="font-size: 14px"
                        >Ongoing Projects : <br />
                        <p>
                          <b
                            style="
                              font-size: 20px;
                              color: #057407;
                              text-align: center;
                              display: block;
                            "
                            >{{ storeProjectInfo.projectsCount }}</b
                          >
                        </p></b
                      >
                    </p>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col q-ml-sm">
                <q-card class="q-mt-sm">
                  <q-card-section>
                    <p>
                      <b style="font-size: 14px"
                        >Completed Projects : <br />
                        <p>
                          <b
                            style="
                              font-size: 20px;
                              color: #057407;
                              text-align: center;
                              display: block;
                            "
                            >{{ storeProjectInfo.projectsCount }}</b
                          >
                        </p></b
                      >
                    </p>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div v-if="employee">
      <CenterTable />
    </div>
    <div v-if="machine">
      <MachineTable />
    </div>
    <div v-if="it">
      <ItTable />
    </div>
    <div v-if="projects">
      <ProjectTable />
    </div>
  </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";
import StatusChart from "../components/StatusChart.vue";
import { defineComponent } from "vue";
import CenterTable from "./CenterTable.vue";
import MachineTable from "./MachineTable.vue";
import ItTable from "./ItTable.vue";
import ProjectTable from "./ProjectTable.vue";
import { useStorePersonnelInfo } from "../stores/personnelStore";
import { useEquipmentInfo } from "../stores/EquipmentsStore";
import { useITEquipmentInfo } from "../stores/ItStore";
import { useStoreProjectInfo } from "../stores/ProjectStore";

export default defineComponent({
  name: "DashboardView",
  components: {
    CenterTable,
    ItTable,
    ProjectTable,
    MachineTable,
    PieChart,
    StatusChart,
  },
  data() {
    return {
      employee: false,
      menu: true,
      machine: false,
      it: false,
      projects: false,

      personnelcolumns: [
        {
          name: "Designation",
          required: true,
          label: "Designation",
          align: "left",
          field: (row) => row._id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "PersonnelCount",
          label: "Designation Count",
          field: "count",
          align: "center",
        },
      ],
      itcolumns: [
        {
          name: "EquipmentType",
          required: true,
          label: "Equipment Type",
          align: "left",
          field: (row) => row.EquipmentType,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "ItemCount",
          label: "Item Count",
          field: "count",
          align: "center",
        },
      ],
      columns: [
        {
          name: "ProjectName",
          required: true,
          label: "Project Name",
          align: "left",
          field: (row) => row.ProjectName,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "DateStarted",
          label: "Date Started",
          field: "DateStarted",
          align: "left",
        },
      ],
    };
  },

  computed: {
    latestProject() {
      const sortedProjects = this.storeProjectInfo.projects
        .slice()
        .sort((a, b) => new Date(b.DateStarted) - new Date(a.DateStarted));
      return sortedProjects.slice(0, 3);
    },
  },
  created() {},
  methods: {
    ChartDatas() {
      const activecount = this.store.ActiveCount;
      const inactive = this.store.personnelsCount - activecount;
      const chartData = {
        labels: ["Active", "End of Contract",
      ],
        datasets: [
          {
            data: [activecount, inactive],
            backgroundColor: ["#77DD76", "#FFB6B3"],
          },
        ],
      };
      return chartData;
    },

    CeoEmployee() {
      this.employee = true;
      this.machine = false;
      this.it = false;
      this.projects = false;
    },
    MachineEquipment() {
      this.employee = false;
      this.machine = true;
      this.it = false;
      this.projects = false;
    },
    ItEquipment() {
      this.employee = false;
      this.machine = false;
      this.it = true;
      this.projects = false;
    },
    CeoProjects() {
      this.employee = false;
      this.machine = false;
      this.it = false;
      this.projects = true;
    },
    formatDate(value) {
      if (!value) return "";

      const date = new Date(value);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    formatProjectCost(cost) {
      if (typeof cost !== "number") {
        return cost; // Return as is if not a number
      }

      // Format the number with commas for thousands and display with 2 decimal places
      return cost.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },

  setup() {
    const store = useStorePersonnelInfo();
    const storeEquipment = useEquipmentInfo();
    const storeITEquipment = useITEquipmentInfo();
    const storeProjectInfo = useStoreProjectInfo();

    store.fetchPersonnel();
    store.fetchDashboard();
    storeEquipment.fetchEquipment();
    storeITEquipment.fetchDashboard();
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
  display: flex;
  flex-wrap: wrap;
}
.chart {
  padding-left: 2%;
  padding-right: 2%;
  justify-content: space-between;
  margin-top: -10px;
}

.my-card {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  margin: 1%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
@media (max-width: 576px) {
  /* Small screens (sm) */
  .responsive-text {
    font-size: 16px !important;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  /* Medium screens (md) */
  .responsive-text {
    font-size: 18px !important;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  /* Large screens (lg) */
  .responsive-text {
    font-size: 20px !important;
  }
}

@media (min-width: 992px) {
  /* Extra-large screens (xl) */
  .responsive-text {
    font-size: 28px !important;
  }
}
</style>
