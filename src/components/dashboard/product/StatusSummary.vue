<template>
  <v-card>
    <v-card-subtitle class="d-flex justify-space-between">
      <strong>Machine 1 Status Summary</strong>
      <small class="ml-auto">1 Mon</small>
    </v-card-subtitle>
    <v-card-text>
      <apexchart
        type="area"
        height="130"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    series: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: 'Products',
          data: [88, 71, 84, 0, 0, 88, 88, 82, 88, 88, 0, 0, 48, 0, 88]
        },
        {
          id: 2,
          name: 'Products',
          data: [78, 61, 74, 0, 0, 78, 78, 72, 78, 78, 0, 0, 38, 0, 78]
        }
      ]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        chart: {
          height: 120,
          type: 'area',
          sparkline: {
            enabled: true
          },
          animations: {
            speed: 400
          }
        },
        colors: ['#689F38'],
        fill: {
          type: 'solid',
          colors: ['#689F38'],
          opacity: 0.15
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: this.xaxis
      }
    }
  },
  computed: {
  },
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>