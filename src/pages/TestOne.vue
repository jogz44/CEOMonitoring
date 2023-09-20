<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-page-container>
          <pie-chart :chart-data="chartData" />
        </q-page-container>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import PieChart from "../components/PieChart.vue";
import { useStorePersonnelInfo } from "src/stores/personnelStore";

const stringOptions = ["Active", "End of Contract"];

export default {
  components: {
    PieChart,
  },
  data() {
    return {
      chartData: {
        labels: ["Active", "End of Contract"],
        datasets: [
          {
            data: [10, 30],
            backgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      },
    };
  },
  setup(){
    const options = ref(stringOptions);
    const store = useStorePersonnelInfo();
    store.fetchPersonnel();
    return{
      store,
      stringOptions,
      options,
      model: ref(null)
    }
  }
};
</script>
