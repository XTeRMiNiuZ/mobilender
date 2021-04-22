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
              Control de cambios
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
            to="inspect"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-list>
      <v-divider class="mb-5" />
    </v-col>
    <v-col cols="12" sm="10">
      <v-skeleton-loader
        v-show="loading_data"
        v-bind="attrs"
        type="list-item-avatar, divider, list-item-avatar, divider, list-item-avatar, divider, list-item-avatar, divider, list-item-avatar"
      />
      <template v-if="!loading_data">
        <v-row align="center" class="d-none d-sm-none d-md-flex grey--text text--lighten-1">
          <v-col cols="2" sm="2" md="1" />
          <v-col cols="2">
            <p class="mb-0">
              Fecha
            </p>
          </v-col>
          <v-col cols="4">
            <p class="mb-0">
              Archivo
            </p>
          </v-col>
          <v-col cols="4">
            <p class="mb-0">
              Cambios
            </p>
          </v-col>
        </v-row>
        <v-row
          v-for="data in data_list"
          :key="data.id"
          class="color-header mb-3 rounded grey--text text--lighten-1"
        >
          <v-col cols="2" sm="2" md="1" align-self="center">
            <v-list-item-icon class="mr-2 icon-id" :data-set="(data.id).toString().padStart(2,0)">
              <v-icon x-large color="green accent-2">
                mdi-checkbox-blank-outline
              </v-icon>
            </v-list-item-icon>
          </v-col>
          <v-col cols="5" class="d-flex d-sm-flex d-md-none">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline text-decoration-underline d-inline-block text-truncate grey--text text--lighten-1">
                  clientes_credito.xml
                </v-list-item-title>
                <v-list-item-subtitle class="body-1 grey--text text--lighten-1">
                  {{ $moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).format('DD/MM/YY') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="2" align-self="center" class="d-none d-sm-none d-md-flex">
            <p class="body-1 mb-0">
              {{ $moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).format('DD/MM/YY') }}
            </p>
          </v-col>
          <v-col cols="4" align-self="center" class="d-none d-sm-none d-md-flex">
            <p class="headline mb-0 text-decoration-underline d-inline-block text-truncate">
              clientes_credito.xml
            </p>
          </v-col>
          <v-col cols="5" md="4" align-self="center">
            <p class="body-1 mb-0">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit et repellat in distinctio facere, architecto ipsa iusto aliquid, illo soluta explicabo pariatur. Assumenda voluptatibus at sed repellendus, totam eos ipsum.
            </p>
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
    this.title_page = 'changes'
    await this.getData()
  },
  data () {
    return {
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
          disabled: false,
          to: 'inspect'
        },
        {
          text: 'Control de cambios',
          disabled: true,
          to: 'changes'
        }
      ]
    }
  }
}
</script>
<style>
.icon-id::before{
  content: attr(data-set);
  position: absolute;
  margin-left: 11px;
  margin-top: 9px;
  font-size: 1rem;
}
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
