<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>Running States</v-card-title>
    <v-card-text class="px-2">
      <v-list v-if="states.length">
        <v-list-item v-for="(state, i) in states" :key="i">
          <v-list-item-content class="py-1">
            {{ state.name }}
          </v-list-item-content>

          <v-list-item-action class="my-1">
            <div class="align-center" style="width: 160px;">
              <v-icon left :color="state.value ? 'acs-machine-running' : 'acs-machine-not-running'">$mdi-circle</v-icon> {{ state.value ? 'Running' : 'Not Running' }}
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
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
    states: {
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
