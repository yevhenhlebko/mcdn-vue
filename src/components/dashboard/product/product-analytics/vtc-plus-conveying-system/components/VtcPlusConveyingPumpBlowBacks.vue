<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>Pumps Blowback Engaged</v-card-title>
    <v-card-text>
      <v-row v-if="blowBacks.length" dense>
        <v-col cols="12" md="6">
          <v-list>
            <v-list-item v-for="(item, i) in blowBacks.slice(0, 6)" :key="i" style="min-height: 36px;">
              <v-list-item-content class="py-1">
                {{ `Pump ${i + 1}` }}
              </v-list-item-content>

              <v-list-item-action class="my-1">
                <div class="align-center" style="width: 100px;">
                  <v-icon left :color="item ? 'acs-online' : 'acs-offline'">$mdi-circle</v-icon> {{ item ? 'On' : 'Off' }}
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-list>
            <v-list-item v-for="(item, i) in blowBacks.slice(6)" :key="i" style="min-height: 36px;">
              <v-list-item-content class="py-1">
                {{ `Pump ${i + 7}` }}
              </v-list-item-content>

              <v-list-item-action class="my-1">
                <div class="align-center" style="width: 100px;">
                  <v-icon left :color="item ? 'acs-online' : 'acs-offline'">$mdi-circle</v-icon> {{ item ? 'On' : 'Off' }}
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <div v-else class="text-center">
        No Data From Device
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    blowBacks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
