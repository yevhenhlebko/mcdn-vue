<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    height="100%"
    light
  >
    <v-card-title>
      Downtime
      <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            small
            class="ml-auto"
            v-on="on"
          >
            <v-icon>$mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item
            v-for="(item, index) in viewOptions"
            :key="index"
            link
          >
            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text>
      <apexchart
        :options="chartOptions2"
        :series="series2"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      showChart: true,
      series2: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
      }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
      }, {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
      }],
      chartOptions2: {
        chart: {
          type: 'bar',
          height: '100%',
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '30%',
            horizontal: false
          }
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ]
        },
        legend: {
          position: 'bottom',
          offsetY: 10
        },
        fill: {
          opacity: 1
        }
      },
      viewOptions: [
        'Daily', 'Weekly', 'Monthly'
      ]
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      getDowntimeGraphData: 'devices/getDowntimeGraphData'
    })
  }
}
</script>
<style scoped>
  .v-card__title {
    word-break: break-word;
  }
</style>
