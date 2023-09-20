<template>
  <div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      chart: null,
    };
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.pieChart.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "pie",
        data: this.chartData,

        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom", // Change the position of the legend (e.g., bottom, top, left, right)
            },
            title: {
              display: true,
              text: "Employee Status",
            },
          },
        },
      });
    },
  },
  watch: {
    chartData: "renderChart",
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>
