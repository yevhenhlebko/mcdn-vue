<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Add New Company</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click>
        <v-icon>$mdi-refresh</v-icon>
      </v-btn>
    </div>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab>Account</v-tab>
      <v-tab>Information</v-tab>
    </v-tabs>

    <v-tabs-items>
      <v-card v-show="tab === 0" class="my-2">
        <v-card-title>Basic Information</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column flex-sm-row">
            <div class="flex-grow-1 pt-2 pa-sm-2">
              <v-form ref="accountForm" v-model="isAccountFormValid" lazy-validation @submit.prevent="submit">
                <v-combobox
                  v-model="company.companyName"
                  :items="companies"
                  label="Company"
                  placeholder="Type in new company name or choose from existing for ex: Acme Inc"
                  item-text="name"
                  :return-object="false"
                  :rules="[$rules.required]"
                  outlined
                  dense
                  @input="clearError"
                ></v-combobox>
                <v-text-field
                  v-model="company.administratorName"
                  :rules="[$rules.required]"
                  :validate-on-blur="false"
                  label="Administrator Name"
                  placeholder="Jane Doe"
                  outlined
                  dense
                  @input="clearError"
                ></v-text-field>
                <v-text-field
                  v-model="company.administratorEmail"
                  :rules="[$rules.required, $rules.emailFormat]"
                  :validate-on-blur="false"
                  label="Administrator Email"
                  placeholder="jane.doe@example.com"
                  outlined
                  dense
                  @input="clearError"
                ></v-text-field>

                <error-component :error="errorMessages"></error-component>

                <div class="mt-2">
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="buttonLoading"
                  >Save</v-btn>
                </div>
              </v-form>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-card v-show="tab === 1" class="my-2">
        <v-card-title>Account Information</v-card-title>
        <v-card-text ref="b">
          <v-form ref="profileForm" v-model="isProfileFormValid" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="company.address_1"
                  label="Address"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-select
                  v-model="company.state"
                  label="State"
                  :items="states"
                  :rules="[$rules.required]"
                  outlined
                  dense
                  @change="onStateChange"
                >
                </v-select>
                <v-combobox
                  v-if="company.state"
                  v-model="company.city"
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
                  :disabled="!company.state || !company.city"
                  outlined
                  dense
                  readonly
                >
                </v-text-field>
                <v-text-field
                  v-model="company.country"
                  :rules="[$rules.required]"
                  label="Country"
                  outlined
                  dense
                  disabled
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="company.phone"
                  v-mask="'###-###-####'"
                  placeholder="123-456-7890"
                  :rules="[$rules.required, $rules.phoneFormat]"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>

            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onBack">Back</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-tabs-items>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Add Company Page Component
| url: /companies/add
|---------------------------------------------------------------------
|
| Create a new company
*/
import states from '../../services/data/states'
import ErrorComponent from '../../components/common/ErrorComponent'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ErrorComponent
  },
  data() {
    return {
      tab: 0,

      breadcrumbs: [
        {
          text: 'Companies',
          to: '/companies',
          exact: true
        },
        {
          text: 'Add New Company'
        }
      ],

      states,

      // need change(remove single quote)
      company: {
        'companyName': '',
        'administratorName': '',
        'administratorEmail': '',
        'address_1': '',
        'state': '',
        'city': '',
        'country': 'US',
        'phone': ''
      },

      isAccountFormValid: true,
      isProfileFormValid: true
    }
  },
  computed: {
    ...mapState({
      buttonLoading: (state) => state.companies.buttonLoading,
      cities: (state) => state.cities.data,
      errorMessages: (state) => state.companies.error,
      companies: (state) => state.companies.companies,
      loadingCities: (state) => state.cities.loadingCities
    }),
    zipCode() {
      const _zip = this.cities.find((city) => city.city === this.company.city)

      return _zip ? _zip.zip : ''
    }
  },
  mounted() {
    this.getCompanies()
  },
  methods: {
    ...mapActions({
      getCompanies: 'companies/getCompanies',
      addCompany: 'companies/addCompany',
      getCities: 'cities/getCities'
    }),
    onStateChange() {
      this.getCities(this.company.state)
    },
    submit() {
      if (this.$refs.accountForm.validate()) {
        if (this.$refs.profileForm.validate()) {
          const data = Object.assign(this.company, {
            zip: this.zipCode
          })

          this.addCompany(data)
        } else {
          this.tab = 1
        }
      }
    },
    onBack() {
      if (this.$refs.profileForm.validate()) {
        this.tab = 0
      }
    },
    clearError() {
      this.$store.commit('companies/CLEAR_ERROR')
    }
  }
}
</script>
