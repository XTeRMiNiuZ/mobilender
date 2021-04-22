<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10">
      <v-breadcrumbs :items="items" />
      <v-list id="lateral" class="transparent">
        <v-list-item class="ml-6 ml-sm-2 pl-16 pl-sm-1">
          <v-list-item-icon class="mr-2">
            <v-icon class="green--text text--accent-2">
              mdi-magnify
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="headline">
              Inspeccionar
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-fab-transition>
          <v-btn
            :color="'green accent-2'"
            elevation="2"
            fab
            dark
            top
            left
            class="v-btn--example"
            to="groups"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-list>
      <v-divider class="mb-5" />
    </v-col>
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-text-field
        v-model="search_txt"
        outlined
        label="N° Cliente, crédito, ID..."
        prepend-inner-icon="mdi-magnify"
        :disable="loading_data"
      />
      <p v-if="search_txt !== ''" class="subtitle-1 grey--text text--lighten-1 font-italic">
        {{ search_txt }}... ({{ filteredUsers.length }} resultado(s))
      </p>
      <v-skeleton-loader
        v-show="loading_data"
        v-bind="attrs"
        type="list-item-avatar, divider, list-item-avatar, divider, list-item-avatar, divider, list-item-avatar, divider, list-item-avatar"
      />
      <template v-if="!loading_data">
        <v-row align="center" class="d-none d-sm-none d-md-flex grey--text text--lighten-1">
          <v-col cols="5">
            <p class="mb-0">
              Cliente
            </p>
          </v-col>
          <v-col cols="5">
            <p class="mb-0">
              RFC
            </p>
          </v-col>
        </v-row>
        <v-row
          v-for="user in filteredUsers"
          :key="user.id"
          justify="center"
          align="center"
          class="color-header mb-3 rounded"
        >
          <v-col cols="12" class="d-none d-sm-none d-md-flex">
            <v-row justify="center" align="center" class="grey--text text--lighten-1">
              <v-col cols="5">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="user.avatar" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="body-1 grey--text text--lighten-1">
                      {{ user.full_name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="5">
                <p class="body-1 mb-0">
                  {{ user.email }}
                </p>
              </v-col>
              <v-col cols="2" class="text-center">
                <v-btn
                  icon
                  color="grey lighten-1"
                  to="changes"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="d-md-none grey--text text--lighten-1">
            <v-row justify="center" align="center">
              <v-col cols="6">
                <p class="mb-0">
                  Cliente
                </p>
              </v-col>
              <v-col cols="6" class="text-truncate">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="user.avatar" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="body-1 grey--text text--lighten-1">
                      {{ user.full_name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-divider class="mb-3" />
            <v-row justify="center" align="center">
              <v-col cols="6">
                <p class="mb-0">
                  RFC
                </p>
              </v-col>
              <v-col cols="6" class="text-truncate">
                <p class="body-1 mb-0">
                  {{ user.email }}
                </p>
              </v-col>
            </v-row>
            <v-divider class="mb-3" />
            <v-row justify="center" align="center">
              <v-col cols="6">
                <p class="mb-0">
                  Acciones
                </p>
              </v-col>
              <v-col cols="6">
                <v-btn
                  icon
                  color="grey lighten-1"
                  to="changes"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="total_pages"
          circle
          :disabled="loading_data"
        />
      </div>
    </v-col>
  </v-row>
</template>
<script>
import CommonMixin from '~/mixins/globals.js'

export default {
  mixins: [CommonMixin],
  async fetch () {
    this.title_page = 'users'
    await this.getData()
  },
  data () {
    return {
      search_txt: '',
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/'
        },
        {
          text: 'Buscar créditos grupales',
          disabled: false,
          to: 'groups'
        },
        {
          text: 'Inspeccionar',
          disabled: true,
          to: 'inspect'
        }
      ]
    }
  },
  computed: {
    filteredUsers () {
      const queryTxt = this.search_txt.toLowerCase()
      return this.data_list.filter((user) => {
        return user.full_name.toLowerCase().includes(queryTxt) ||
        user.email.toLowerCase().includes(queryTxt)
      })
    }
  }
}
</script>
<style>
  #lateral .v-btn--example {
    position: absolute;
    margin-top: -52px;
    margin-left: -60px;
  }
  @media screen and (max-width: 600px) {
    #lateral .v-btn--example {
      margin-left: 0;
    }
  }
</style>
