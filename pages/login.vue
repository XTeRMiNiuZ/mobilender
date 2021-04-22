<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6" lg="4">
      <div class="d-flex flex-column justify-space-between align-center mb-3">
        <h3 class="headline">
          Integra<span class="green--text text--accent-2">Software</span>
        </h3>
      </div>
      <v-card>
        <v-card-title class="headline text-center grey--text text--lighten-1">
          {{ (is_login_form) ? 'Iniciar sesión' : 'Crear cuenta nueva' }}
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="user.email.value"
              prepend-icon="mdi-email"
              label="Correo Electrónico"
              type="email"
              :rules="user.email.rules"
              :disabled="disabled"
            />
            <v-text-field
              v-model="user.password.value"
              prepend-icon="mdi-lock"
              label="Contraseña"
              :rules="[ pass_rules.required, pass_rules.min ]"
              :append-icon="user.password.show ? 'mdi-eye-outline' : 'mdi-eye-off'"
              :type="user.password.show ? 'text' : 'password'"
              :disabled="disabled"
              @click:append="user.password.show = !user.password.show"
            />
            <v-text-field
              v-if="!is_login_form"
              v-model="user.confirm_password.value"
              prepend-icon="mdi-lock"
              label="Confirmar Contraseña"
              :rules="[ pass_rules.required, pass_rules.min, pass_rules.passMatch ]"
              :append-icon="user.confirm_password.show ? 'mdi-eye-outline' : 'mdi-eye-off'"
              :type="user.confirm_password.show ? 'text' : 'password'"
              :disabled="disabled"
              @click:append="user.confirm_password.show = !user.confirm_password.show"
            />
            <v-btn block color="primary" type="submit" :disabled="disabled" @click.stop.prevent="validateForm">
              {{ (is_login_form) ? 'Ingresar' : 'Registrar' }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-row v-if="is_login_form" justify="end" class="mt-2 float-right">
        <v-col cols="12">
          <span class="body-1 grey--text text--lighten-1 mr-2">¿No tienes cuenta?</span>
          <v-btn light :disabled="disabled" @click="is_login_form = false">
            Regístrate
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar
      v-model="show_errors"
      :timeout="timeout"
    >
      {{ errors }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="show_errors = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
<script>
export default {
  auth: 'guest',
  layout: 'login',
  data () {
    return {
      pass_rules: {
        required: v => !!v || 'Contraseña requerida',
        min: v => v.length >= 6 || 'Mínimo 6 caracteres',
        passMatch: v => v === this.user.password.value || 'Las contraseñas no coincide'
      },
      valid: true,
      user: {
        email: {
          value: '',
          rules: [
            v => !!v || 'Correo requerido',
            v => /.+@.+\..+/.test(v) || 'El correo debe ser válido'
          ]
        },
        password: {
          value: '',
          show: false
        },
        confirm_password: {
          value: '',
          show: false
        }
      },
      is_login_form: true,
      disabled: false,
      show_errors: false,
      timeout: 4000,
      errors: ''
    }
  },
  methods: {
    async validateForm () {
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        const self = this
        this.disabled = true
        if (this.is_login_form) {
          await this.$auth.loginWith('local', {
            data: {
              email: self.user.email.value,
              password: self.user.password.value
            }
          }).then(() => {
            self.$router.push('/')
          }).catch((e) => {
            // eslint-disable-next-line no-console
            self.show_errors = true
            self.errors = e.response.data.error
          }).finally(() => {
            self.disabled = false
          })
        } else {
          const data = {
            email: this.user.email.value,
            password: this.user.password.value
          }
          await this.$axios
            .$post('/register', data)
            .then((response) => {
              // eslint-disable-next-line no-console
              console.log(response)
              self.$auth
                .setUserToken(response.token)
                .then(() => {
                  self.$router.push('/')
                })
            })
            .catch((e) => {
              // eslint-disable-next-line no-console
              self.show_errors = true
              self.errors = e.response.data.error
            }).finally(() => {
              self.disabled = false
            })
        }
      }
    }
  }
}
</script>
