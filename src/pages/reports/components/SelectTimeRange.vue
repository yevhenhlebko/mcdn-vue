<template>
  <div>
    <report-time-range-chooser ref="timeRange" :time-range="timeRange"></report-time-range-chooser>
    <v-card>
      <v-card-title class="pb-0">Date and Time</v-card-title>
      <v-card-text class="mt-0">Select Date and Time for the report</v-card-text>
      <v-card-text>
        <v-row
          v-for="(id, key) in Object.keys(selectedTags)"
          :key="key"
          dense
          align="center"
          justify="center"
          class="grey lighten-3 rounded mb-3"
        >
          <v-col cols="4" class="d-flex flex-column">
            <div class="pa-0 text-caption">Machine</div>
            <div class="primary--text">{{ getMachineName(id) }}</div>
          </v-col>
          <v-col cols="8" class="d-flex flex-column">
            <div class="pa-0 text-caption">Tags</div>
            <div class="primary--text">
              <v-chip
                v-for="(tag, i) in selectedTags[id]"
                :key="i"
                class="mr-1 mb-1"
                color="primary"
                outlined
                small
              >
                {{ tag.name }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <div class="mt-2 pb-3 text-right">
        <v-btn color="grey lighten-2" depressed @click="$emit('cancel')">Back</v-btn>
        <v-btn class="ml-2" depressed color="primary" @click="handleNext">Next Step</v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import ReportTimeRangeChooser from './ReportTimeRangeChooser'

export default {
  components: {
    ReportTimeRangeChooser
  },
  props: {
    selectedTags: {
      type: Object,
      default: () => {}
    },
    timeRange: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState({
      reportMachines: (state) => state.machines.reportMachines
    })
  },
  methods: {
    getMachineName(id) {
      const machine =  this.reportMachines.find((machine) => machine.id === Number(id))

      return machine ? machine.name : ''
    },
    handleNext() {
      console.log(this.$refs.timeRange)
      this.timeRange['timeRangeOption'] = this.$refs.timeRange.locTimeRangeOption
      this.timeRange['dateFrom'] = this.$refs.timeRange.locDateFrom
      this.timeRange['dateTo'] = this.$refs.timeRange.locDateTo
      this.timeRange['timeFrom'] = this.$refs.timeRange.locTimeFrom
      this.timeRange['timeTo'] = this.$refs.timeRange.locTimeTo
      
      this.$emit('setSelectedTimeRange', this.timeRange)
    }
  }
}
</script>