<template>
  <v-card class="mt-2">
    <v-card-title>
      Locations
      <v-dialog
        v-model="dialog"
        max-width="400px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            class="ml-auto"
            v-bind="attrs"
            v-on="on"
          >
            Add
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="primary white--text">
            <span class="text-h5">{{ editTitle }}</span>
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="editForm" v-model="isFormValid" lazy-validation @submit.prevent="submit">
              <v-text-field
                v-model="editedItem.name"
                label="Location name"
                :rules="[$rules.required]"
                outlined
                dense
              >
              </v-text-field>
              <v-select
                v-model="editedItem.state"
                label="State"
                :items="states"
                :rules="[$rules.required]"
                outlined
                dense
                @change="onStateChange"
              >
              </v-select>
              <v-combobox
                v-if="editedItem.state"
                v-model="editedItem.city"
                :items="cities"
                label="City"
                item-text="city"
                :return-object="false"
                :rules="[$rules.required]"
                :disabled="loadingCities"
                :loading="loadingCities"
                outlined
                dense
              ></v-combobox>
              <v-text-field
                :value="zipCode"
                label="Zip Code"
                :rules="[$rules.required]"
                :disabled="!editedItem.state || !editedItem.city"
                outlined
                dense
                readonly
              >
              </v-text-field>

              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="closeDialog"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="btnLoading"
                  :disabled="btnLoading"
                >
                  Save
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="locations"
        class="flex-grow-1"
        :loading="tableLoading"
        hide-default-footer
      >
        <template v-slot:item.location_id="{ item }">
          <span>{{ locationName(item.location_id) }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="editLocation(item)">
            <v-icon small>$mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
/*
|---------------------------------------------------------------------
| Location Component
|---------------------------------------------------------------------
|
*/
import states from '../../services/data/states'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: 'Location Name', value: 'name' },
        { text: 'State', value: 'state', align: 'center' },
        { text: 'City', value: 'city', align: 'center' },
        { text: 'Zip', value: 'zip', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
      ],

      states,

      editedIndex: -1,

      dialog: false,

      editedItem: {
        name: '',
        state: '',
        city: '',
        zip: ''
      },
      defaultItem: {
        name: '',
        state: '',
        city: '',
        zip: ''
      },
      isFormValid: true,

      searchQuery: ''
    }
  },
  computed: {
    ...mapState({
      btnLoading: (state) => state.locations.btnLoading,
      tableLoading: (state) => state.locations.tableLoading,
      cities: (state) => state.cities.data,
      loadingCities: (state) => state.cities.loadingCities
    }),
    editTitle() {
      return this.editedIndex === -1 ? 'Add Location' : 'Edit Location'
    },
    zipCode() {
      const _zip = this.cities.find((city) => city.city === this.editedItem.city)

      return _zip ? _zip.zip : ''
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      getLocations: 'locations/getLocations',
      addLocation: 'locations/addLocation',
      updateLocation: 'locations/updateLocation',
      getCities: 'cities/getCities'
    }),
    editLocation(item) {
      this.editedIndex = this.locations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.onStateChange()
      this.$nextTick(() => {
        this.$refs.editForm.resetValidation()
      })
    },
    closeDialog () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    submit() {
      if (this.$refs.editForm.validate()) {
        const data = Object.assign(this.editedItem, {
          zip: this.zipCode
        })

        if (this.editedIndex > -1) {
          this.updateLocation(data).then(() => {
            this.getLocations()
            this.closeDialog()
          })
        } else {
          this.addLocation(data).then(() => {
            this.getLocations()
            this.closeDialog()
          })
        }
      }
    },
    onStateChange() {
      this.getCities(this.editedItem.state)
    }
  }
}
</script>
