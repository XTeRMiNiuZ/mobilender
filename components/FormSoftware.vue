<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Nuevo Software</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                label="Nombre del Software *"
                required
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-select
                :items="credit_groups"
                label="Tipo de Crédito *"
                required
              />
            </v-col>
          </v-row>
        </v-container>
        <small>*Indica Campo Requerido</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('close')"
        >
          Cerrar
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('close')"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['show'],
  data: () => ({
    credit_groups: ['Individual', 'Grupal', 'Otro']
  })
}
</script>
