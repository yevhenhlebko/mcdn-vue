<template>
  <div>
    <v-card :loading="isReportLoading" :disabled="isReportLoading">
      <v-card-title class="pb-0">Select Parameters</v-card-title>
      <v-card-text class="mt-0">Select machine Parameters you want to include in your report</v-card-text>
      <v-card-text>
        <v-row
          v-for="(id, key) in deviceIds"
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
          <v-col cols="8">
            <v-select
              v-model="selectedTags[id]"
              chips
              dense
              multiple
              small-chips
              required
              :items="getMachineTags(id)"
              label="Choose parameters for this machine"
              item-text="name"
              item-value="id"
              :return-object="true"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <div class="mt-2 pb-3 text-right">
        <v-btn color="grey lighten-2" depressed @click="$emit('cancel')">Back</v-btn>
        <v-btn class="ml-2" depressed color="primary" @click="$emit('setMachineTags', selectedTags)">Next Step</v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    deviceIds: {
      type: Array,
      default: () => []
    },
    selectedTags: {
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
      reportMachines: (state) => state.machines.reportMachines,
      reportMachineTags: (state) => state.machines.reportMachineTags,
      isReportLoading: (state) => state.machines.isReportLoading
    })
  },
  methods: {
    ...mapActions({

    }),
    getMachineName(id) {
      const machine =  this.reportMachines.find((machine) => machine.device_id === id)

      return machine ? machine.name : ''
    },
    getMachineTags(id) {
      const machineInfo = this.reportMachineTags.find((item) => item.device_id === id)
      const tags = machineInfo ? [...machineInfo.tags] : []
      const importantTags = machineInfo ? [...machineInfo.tags].filter((t) => t.divided_by) : []

      tags && tags.splice(importantTags.length, 0, { divider: true })
      tags && tags.splice(importantTags.length + 1, 0, { header: 'Alarms' })

      return tags
    }
  }
}
</script>
