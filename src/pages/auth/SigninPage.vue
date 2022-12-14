<template>
  <div>
    <v-card class="pa-1">
      <v-card-title class="justify-center text-h4 mb-2">Welcome</v-card-title>
      <v-card-subtitle>Sign in to your account</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="[$rules.required]"
            :validate-on-blur="false"
            label="Email"
            name="email"
            outlined
            @keyup.enter="submit"
            @input="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? '$mdi-eye' : '$mdi-eye-off'"
            :rules="[$rules.required]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            name="password"
            outlined
            @input="resetErrors"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <error-component :error="errorMessages"></error-component>

          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            block
            x-large
            color="primary"
            @click="submit"
          >Sign In</v-btn>

          <div class="mt-5">
            <router-link to="/auth/forgot-password">
              Forgot Password
            </router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign In Page Component
|---------------------------------------------------------------------
|
| Sign in template for user authentication into the application
|
*/
import { mapState, mapActions } from 'vuex'
import ErrorComponent from '../../components/common/ErrorComponent'

export default {
  components: {
    ErrorComponent
  },
  data() {
    return {
      // form
      isFormValid: true,
      email: '',
      password: '',

      // form error
      error: false,

      errorProvider: false,
      errorProviderMessages: '',

      // show password field
      showPassword: false
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.buttonLoading,
      errorMessages: (state) => state.auth.error,
      privateColors: (state) => state.settings.privateColors
    })
  },
  mounted() {
    this.resetErrors()
  },
  methods: {
    ...mapActions({
      'signIn': 'auth/signIn'
    }),
    submit() {
      if (this.$refs.form.validate()) {
        this.signIn({
          email: this.email,
          password: this.password
        })
      }
    },
    resetErrors() {
      this.$store.commit('auth/CLEAR_ERROR')
    }
  }
}
</script>
