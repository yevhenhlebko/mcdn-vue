<template>
  <div>
    <v-card
      height="100%"
      :loading="loadingInventories"
      :disabled="loadingInventories"
    >
      <v-card-title>
        Material Assignment
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          class="ml-1"
          @click="$emit('reload')"
        >
          <v-icon>$mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div v-if="inventory.inventories && inventory.inventories.length" class="d-flex flex-wrap px-2">
          <v-row dense>
            <v-col
              v-for="(inv, i) in inventory.inventories"
              :key="i"
              cols="12"
              md="3"
              sm="6"
              class="py-1"
            >
              <v-card>
                <div class="overline ml-2">{{ `Hopper ${i + 1}` }}</div>
                <v-card-text class="text--primary text-subtitle-1">{{ materialText(i) }}</v-card-text>
                <v-card-text class="text--primary text-subtitle-1">{{ locationText(i) }}</v-card-text>
                <v-card-actions>
                  <v-btn
                    small
                    block
                    color="primary"
                    @click="editMaterial(i)"
                  >
                    Add Material/Location
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else class="text-center">
          No Data From Device
        </div>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="editDialog"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title class="primary white--text">{{ dialogText }}</v-card-title>
        <v-card-text class="mt-2">
          <v-form ref="editForm" v-model="isEditFormValid" lazy-validation @submit.prevent="submit">
            <v-select
              v-model="editItem.material"
              :items="materials"
              placeholder="Material"
              item-value="id"
              item-text="material"
              :rules="[$rules.required]"
              outlined
              dense
            >
            </v-select>

            <v-select
              v-model="editItem.location"
              :items="locations"
              placeholder="Location"
              item-value="id"
              item-text="location"
              :rules="[$rules.required]"
              outlined
              dense
            >
            </v-select>

            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                :disabled="savingMaterial"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :loading="savingMaterial"
                :disabled="savingMaterial"
              >
                Submit
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    serialNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      editDialog: false,
      isEditFormValid: true,

      editedIndex: -1,

      editItem: {
        material: -1,
        location: -1
      }
    }
  },
  computed: {
    ...mapState({
      userRole: (state) => state.auth.user.role,
      materials: (state) => state.materials.data,
      locations: (state) => state.materials.materialLocations
    }),
    ...mapState('bdBlenderAnalytics', ['loadingInventories', 'togglingInventoryTrack', 'inventory', 'savingMaterial']),
    dialogText () {
      return `Hopper ${this.editedIndex + 1}`
    }
  },
  mounted() {
    this.getInventory({ serialNumber: this.serialNumber })
    this.getMaterials()
    this.getMaterialLocations()
  },
  methods: {
    ...mapActions({
      getMaterials: 'materials/getMaterials',
      updateInventoryMaterial: 'bdBlenderAnalytics/updateInventoryMaterial',
      getMaterialLocations: 'materials/getMaterialLocations',      
      getInventory: 'bdBlenderAnalytics/getInventory',
      toggleInventoryTracking: 'bdBlenderAnalytics/toggleInventoryTracking'
    }),

    editMaterial(item) {
      this.editedIndex = item
      this.editItem.material = this.inventory.inventory_material[`material${item + 1}_id`]
      this.editItem.location = this.inventory.inventory_material[`location${item + 1}_id`]

      this.editDialog = true
      this.$nextTick(() => {
        this.$refs.editForm.resetValidation()
      })
    },
    close () {
      this.editDialog = false
    },
    async submit () {
      if (this.$refs.editForm.validate()) {
        try {
          await this.updateInventoryMaterial({
            id: this.editedIndex,
            serialNumber: this.serialNumber,
            location: this.editItem.location,
            material: this.editItem.material
          })

          this.getInventory({ serialNumber: this.serialNumber })
          this.close()
        } catch (err) {
          console.log(err)
        }
      }
    },

    startClicked() {
      this.toggleInventoryTracking({
        serialNumber: this.serialNumber
      })
    },

    materialText(ind) {
      let m = null

      m = this.materials.find((material) => material.id === this.inventory.inventory_material.[`material${ind + 1}_id`])

      return m ? m.material : 'Material Not Selected'
    },
    locationText(ind) {
      let m = null

      m = this.locations.find((location) => location.id === this.inventory.inventory_material.[`location${ind + 1}_id`])

      return m ? m.location : 'Location Not Selected'
    }
  }
}
</script>
