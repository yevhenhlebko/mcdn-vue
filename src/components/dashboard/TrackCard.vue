<template>
  <v-card class="d-flex flex-column flex-grow-1" light height="100%" min-height="220">
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else class="d-flex flex-column flex-grow-1">
      <v-card-title>
        {{ label }}
      </v-card-title>

      <div class="d-flex flex-column flex-grow-1">
        <div class="px-2 pb-2">
          <div class="d-flex align-center">
            <div class="text-h4">{{ value }}</div>
            <v-spacer></v-spacer>
            <div class="d-flex flex-column text-right">
              <div class="font-weight-bold">
                <trend-percent :value="percentage" />
              </div>
              <div class="text-caption">{{ percentageLabel }}</div>
            </div>
          </div>
        </div>

        <v-spacer></v-spacer>

        <apexchart
          type="area"
          height="60"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </v-card>
</template>

<script>
import TrendPercent from '../common/TrendPercent'

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
  components: {
    TrendPercent
  },
  props: {
    series: {
      type: Array,
      default: () => ([])
    },
    isFlat: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333333'
    },
    value: {
      type: String,
      default: ''
    },
    percentage: {
      type: Number,
      default: 0
    },
    percentageLabel: {
      type: String,
      default: 'vs. last week'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: true,
      chartOptions: {
        chart: {
          animations: {
            speed: 400,
            animateGradually: {
              enabled: false
            }
          },
          width: '100%',
          height: 60,
          type: 'area',
          sparkline: {
            enabled: true
          }
        },
        colors: [this.color],
        fill: {
          type: 'solid',
          colors: [this.color],
          opacity: 0.15
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          type: 'datetime'
        },
        tooltip: {
          followCursor: true,
          theme: 'dark'
        },
        ...this.options
      }
    }
  },
  computed: {

  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  }
}
</script>
