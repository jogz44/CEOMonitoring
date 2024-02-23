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
  created() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.chart) {
      this.chart.destroy();
    }
      const ctx = this.$refs.pieChart
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
              text: "Employment Status ",
            },
          },
        },
      });
    },
    destroy() {
      if (this.chart) {
        this.chart.destroy();
      }
    },
  },
  watch: {
    chartData: "renderChart",
  },
  beforeUnmount() {
    this.destroy();
  },
};
</script>
