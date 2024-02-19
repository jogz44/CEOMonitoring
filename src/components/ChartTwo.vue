<template>
  <div>
    <apexchart
      width="380"
      type="pie"
      :options="options"
      :series="chartData.data"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { ref } from "vue";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const options = ref({
      chart: {
        width: 380,
        type: "pie",
      },

      labels: ["Regular", "Casual", "Program-Based", "Project-Based"],
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    });

    const series = ref([44, 55, 41, 17, 15]);

    return {
      options,
      series,
    };
  },
};
</script>
