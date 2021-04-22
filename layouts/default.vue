<template>
  <v-app dark>
    <Navbar />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="false"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar'
export default {
  components: { Navbar }
}
</script>
<style>
.color-header{
  background-color: #171925 !important;
}
</style>
