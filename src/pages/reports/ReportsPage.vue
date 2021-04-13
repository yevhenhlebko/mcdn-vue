<template>
  <div class="d-flex flex-column flex-grow-1">
    <create-report
      v-if="!creatingReport"
      @createReport="creatingReport = true"
    >
    </create-report>
    <v-stepper v-else v-model="stepNumber" alt-labels>
      <v-stepper-header>
        <v-stepper-step :complete="stepNumber > 1" step="1">Select Machines</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepNumber > 2" step="2">Select Tags</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepNumber > 3" step="3">Select Date</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepNumber > 4" step="4">Generate Report</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <select-machines
            @setReportMachines="handleSetReportMachines"
          >
          </select-machines>
        </v-stepper-content>

        <v-stepper-content step="2">
          <select-tags
            :machine-ids="machineIds"
          >
          </select-tags>
        </v-stepper-content>

        <v-stepper-content step="3">
        </v-stepper-content>

        <v-stepper-content step="4">
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import CreateReport from './components/CreateReport'
import SelectMachines from './components/SelectMachines'
import SelectTags from './components/SelectTags'

export default {
  components: {
    CreateReport,
    SelectMachines,
    SelectTags
  },
  data() {
    return {
      creatingReport: false,
      machineIds: [],
      stepNumber: 1
    }
  },
  methods: {
    ...mapActions({
      getMachineTags: 'machines/getMachineTags'
    }),
    handleSetReportMachines(data) {
      this.machineIds = data
      this.stepNumber = 2
      try {
        this.getMachineTags({
          machineIds: data
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
