<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-breadcrumbs :items="items" />
      <v-list class="transparent">
        <v-list-item>
          <v-list-item-icon class="mr-2">
            <v-icon class="green--text text--accent-2">
              mdi-view-list-outline
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="headline">
              Listado de softwares
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              outlined
              color="green"
              class="float-right"
              :disabled="loading_data"
              @click="add_software = true"
            >
              <span class="green--text text--accent-2 mr-2">
                +
              </span><span class="white--text text-uppercase">Agregar Nuevo</span>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider class="mb-5" />
      <v-skeleton-loader
        v-show="loading_data"
        v-bind="attrs"
        type="list-item-avatar, divider, list-item-avatar, divider, list-item-avatar, divider, list-item-avatar, divider, list-item-avatar"
      />
      <template v-if="!loading_data">
        <v-row
          v-for="software in data_list"
          :key="software.id"
          class="color-header mb-3 rounded"
        >
          <v-col cols="2" sm="2" md="1" align-self="center">
            <v-list-item-icon class="mr-2 icon-id" :data-set="(software.id).toString().padStart(2,0)">
              <v-icon x-large color="green accent-2">
                mdi-checkbox-blank-outline
              </v-icon>
            </v-list-item-icon>
          </v-col>
          <v-col cols="8" class="d-flex d-sm-flex d-md-none">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  {{ software.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="body-1 grey--text text--lighten-1 mb-0">
                  Crédito Grupal
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="5" align-self="center" class="d-none d-sm-none d-md-flex">
            <p class="headline mb-0">
              {{ software.name }}
            </p>
          </v-col>
          <v-col cols="5" align-self="center" class="d-none d-sm-none d-md-flex">
            <p class="body-1 grey--text text--lighten-1 mb-0">
              Crédito Grupal
            </p>
          </v-col>
          <v-col cols="2" sm="2" md="1" align-self="center">
            <v-btn
              icon
              color="grey lighten-1"
              to="groups"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
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
    <FormSoftware :show.sync="add_software" @close="add_software = false" />
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import FormSoftware from '~/components/FormSoftware'
import CommonMixin from '~/mixins/globals.js'

export default {
  components: { FormSoftware },
  mixins: [CommonMixin],
  async fetch () {
    this.title_page = 'softwares'
    await this.getData()
  },
  data () {
    return {
      add_software: false,
      items: [
        {
          text: 'Listado de softwares',
          disabled: true,
          to: '/'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    fullName () {
      return this.loggedInUser.first_name + ' ' + this.loggedInUser.last_name
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
</style>
