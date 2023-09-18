<template>
  <q-page>
    <q-page-container>
      <q-card class="q-mb-md">
        <q-card-section>
          <canvas ref="chart"></canvas>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script>
import { Doughnut, mixins } from 'vue-chartjs';

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveData],
  data() {
    return {
      chartData: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
  },
};
</script>
