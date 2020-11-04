<template>
  <v-footer padless>
    <v-card flat tile class="lighten-1 white--text text-center pa-0">
      <div id="socialMedia">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
      </div>
      <div id="rights">
        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider color="white"></v-divider>
        <v-card-text class="white--text">
          All Rights Reserved.<v-icon color="white">mdi-copyright</v-icon>
          {{ new Date().getFullYear() }} —
          <a href="https://mobicashonline.com/" target="_blank"
            ><strong>Mobicash</strong></a
          >
        </v-card-text>
      </div>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
  })
}
</script>
<style scoped>
#socialMedia {
  background-color: #ff8c00;
}
#rights {
  background-color: #6c757d;
}
#rights a {
  color: #ff8c00;
}
</style>
