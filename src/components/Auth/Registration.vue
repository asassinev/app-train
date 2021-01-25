<template>
  <v-container fluid fill-height>
      <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>
                  Registration form
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    type="email"
                    prepend-icon="mdi-account"
                    v-model="email"
                    label="E-mail"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    :error-messages="emailErrors"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :error-messages="passwordErrors"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-lock"
                    name="confirm-password"
                    label="Confirm password"
                    type="password"
                    v-model="confirmPassword"
                    @input="$v.confirmPassword.$touch()"
                    @blur="$v.confirmPassword.$touch()"
                    :error-messages="confirmPasswordErrors"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="onSubmit"
                  :loading="loading"
                >Create account</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { required }
  },
  data () {
    return {
      email: '',
      password: '',
      counter: '',
      confirmPassword: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Min length length 6 characters.')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      this.password !== this.confirmPassword && errors.push('Passwords must match')
      !this.$v.confirmPassword.required && errors.push('Password is required')
      return errors
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('reqisterUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => console.log(err))
      }
    }
  }
}
</script>
