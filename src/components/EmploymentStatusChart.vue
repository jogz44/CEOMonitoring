<template>
  <div>
    <apexchart
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
        align:"center",
      },
      labels: ["Active", "End of Contract"],
      legend: {
        position: "bottom",
      },
      title: {
        text: "Employment Status", // Your title text goes here
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "12px",
          color: "#263238",
        },
      },
      responsive: [
        {
          breakpoint: 300,
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

    return {
      options,
    };
  },
};
</script>
