<template>
  <v-app-bar
    :clipped-left="false"
    fixed
    app
    class="color-header"
  >
    <v-toolbar-title>
      Integra<span class="green--text text--accent-2">Software</span>
    </v-toolbar-title>
    <v-spacer />
    <span class="subtitle-1 mr-2">{{ fullName }}</span>
    <v-menu
      bottom
      min-width="200px"
      rounded
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          x-large
          v-on="on"
        >
          <v-avatar
            size="36"
          >
            <img
              :src="loggedInUser.avatar"
              :alt="fullName"
            >
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar>
              <img
                :src="loggedInUser.avatar"
                :alt="fullName"
              >
            </v-avatar>
            <h3 class="mt-4">
              {{ fullName }}
            </h3>
            <p class="caption mt-1">
              {{ loggedInUser.email }}
            </p>
            <v-divider class="my-3" />
            <v-btn
              depressed
              rounded
              text
            >
              Ver Perfil
            </v-btn>
            <v-divider class="my-3" />
            <v-btn
              depressed
              rounded
              text
              @click="logout"
            >
              Logout
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    fullName () {
      return this.loggedInUser.first_name + ' ' + this.loggedInUser.last_name
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
