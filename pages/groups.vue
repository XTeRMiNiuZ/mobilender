<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <v-breadcrumbs :items="items" />
      <v-list class="transparent">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">
              Buscar créditos grupales
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              outlined
              color="green"
              class="float-right"
              :disabled="loading_data"
              to="inspect"
            >
              <v-icon class="green--text text--accent-2">
                mdi-magnify
              </v-icon>
              <span class="white--text text-uppercase">Inspeccionar</span>
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
        <v-row justify="center" align="center" class="d-none d-sm-none d-md-flex">
          <v-col cols="6" align-self="center">
            <v-row class="grey--text text--lighten-1">
              <v-col cols="5" align-self="center">
                <p class="mb-0">
                  Archivo
                </p>
              </v-col>
              <v-col cols="3" align-self="center">
                <p class="mb-0">
                  Expedición
                </p>
              </v-col>
              <v-col cols="4" align-self="center" class="text-center">
                <p class="mb-0">
                  % Calidad de información
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" align-self="center">
            <v-row class="grey--text text--lighten-1">
              <v-col cols="3" align-self="center">
                <p class="mb-0">
                  Estatus
                </p>
              </v-col>
              <v-col cols="3" align-self="center">
                <p class="mb-0">
                  Finalización
                </p>
              </v-col>
              <v-col cols="3" align-self="center">
                <p class="mb-0">
                  Usuario
                </p>
              </v-col>
              <v-col cols="3" align-self="center">
                <p class="mb-0">
                  Acciones
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          v-for="credit in data_list"
          :key="credit.id"
          justify="center"
          align="center"
          class="color-header mb-3 rounded"
        >
          <v-col cols="6" class="d-none d-sm-none d-md-flex">
            <v-row justify="center" align="center" class="grey--text text--lighten-1">
              <v-col cols="5" class="text-truncate">
                <p class="headline mb-0 text-decoration-underline d-inline-block text-truncate">
                  clientes_credito.xml
                </p>
              </v-col>
              <v-col cols="3">
                <p class="body-1 mb-0">
                  {{ $moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).format('DD/MM/YY') }}
                </p>
              </v-col>
              <v-col cols="4" class="text-center">
                <p class="body-1 mb-0">
                  {{ (Math.floor(Math.random() * 101) +1).toString() + '%' }}
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" class="d-none d-sm-none d-md-flex">
            <v-row justify="center" align="center" class="grey--text text--lighten-1">
              <v-col cols="3">
                <p class="body-1 mb-0" :class="[ status_list[getOneTwoThree(credit.id) -1].color ]">
                  {{ status_list[getOneTwoThree(credit.id) -1].title }}
                </p>
              </v-col>
              <v-col cols="3">
                <p class="body-1 mb-0">
                  {{ $moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).format('DD/MM/YY') }}
                </p>
              </v-col>
              <v-col cols="3">
                <p class="body-1 mb-0">
                  @{{ credit.name }}
                </p>
              </v-col>
              <v-col cols="3">
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      icon
                      color="grey lighten-1"
                      @click="downloadFile"
                    >
                      <v-icon>mdi-file-download</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      icon
                      color="grey lighten-1"
                      to="inspect"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="d-md-none grey--text text--lighten-1">
            <v-row justify="center" align="center">
              <v-col cols="6">
                <p class="mb-0">
                  Archivo
                </p>
              </v-col>
              <v-col cols="6" class="text-truncate">
                <p class="headline mb-0 text-decoration-underline d-inline-block text-truncate">
                  clientes_credito.xml
                </p>
              </v-col>
            </v-row>
            <v-divider class="mb-3" />
            <v-row justify="center" align="center">
              <v-col cols="6">
                <p class="mb-0">
                  Expedición
                </p>
              </v-col>
              <v-col cols="6" class="text-truncate">
                <p class="body-1 mb-0">
                  {{ $moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).format('DD/MM/YY') }}
                </p>
              </v-col>
            </v-row>
            <v-divider class="mb-3" />
            <v-row justify="center" align="center">
              <v-col cols="6">
                <p class="mb-0">
                  % Calidad de información
                </p>
              </v-col>
              <v-col cols="6" class="text-truncate">
                <p class="body-1 mb-0">
                  {{ (Math.floor(Math.random() * 101) +1).toString() + '%' }}
                </p>
              </v-col>
            </v-row>
            <v-divider class="mb-3" />
            <v-row justify="center" align="center">
              <v-col cols="6">
                <p class="mb-0">
                  Estatus
                </p>
              </v-col>
              <v-col cols="6" class="text-truncate">
                <p class="body-1 mb-0" :class="[ status_list[getOneTwoThree(credit.id) -1].color ]">
                  {{ status_list[getOneTwoThree(credit.id) -1].title }}
                </p>
              </v-col>
            </v-row>
            <v-divider class="mb-3" />
            <v-row justify="center" align="center">
              <v-col cols="6">
                <p class="mb-0">
                  Finalización
                </p>
              </v-col>
              <v-col cols="6" class="text-truncate">
                <p class="body-1 mb-0">
                  {{ $moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))).format('DD/MM/YY') }}
                </p>
              </v-col>
            </v-row>
            <v-divider class="mb-3" />
            <v-row justify="center" align="center">
              <v-col cols="6">
                <p class="mb-0">
                  Usuario
                </p>
              </v-col>
              <v-col cols="6" class="text-truncate">
                <p class="body-1 mb-0">
                  @{{ credit.name }}
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
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      icon
                      color="grey lighten-1"
                      @click="downloadFile"
                    >
                      <v-icon>mdi-file-download</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      icon
                      color="grey lighten-1"
                      to="inspect"
                    >
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
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
    this.title_page = 'credits'
    await this.getData()
  },
  data () {
    return {
      status_list: [
        {
          title: 'Finalizado',
          color: 'green--text text--lighten-1'
        },
        {
          title: 'En proceso',
          color: 'yellow--text text--lighten-1'
        },
        {
          title: 'Rechazado',
          color: 'red--text text--lighten-1'
        }
      ],
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/'
        },
        {
          text: 'Buscar créditos grupales',
          disabled: true,
          to: 'groups'
        }
      ]
    }
  },
  methods: {
    downloadFile () {
      fetch('http://localhost:3000/cd_catalog.xml')
        .then(resp => resp.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          // the filename you want
          a.download = 'credit.xml'
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          // alert('your file has downloaded!'); // or you know, something with better UX...
        })
        .catch(() => alert('oh no!'))
    },
    getOneTwoThree (numb = 1) {
      if (numb <= 3) {
        return numb
      } else {
        numb -= 3
        if (numb > 3) {
          return this.getOneTwoThree(numb)
        } else {
          return numb
        }
      }
    }
  }
}
</script>
