<template>
  <v-item-group active-class="secondary">
    <div>
      <v-row justify="center">
        <v-col cols="12" md="4" sm="6">
          <v-item>
            <v-container grid-list-md>
              <div id="pdfDom">
                <v-card text class="pa-5">
                  <v-layout row wrap class="pa-3">
                    <v-flex xs12 md12 class="pb-2">
                      <v-img
                        height="50px"
                        width="150px"
                        contain
                        src="/images/mobich.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs12 md12>
                      <p class="my-0">MobiCash LTD</p>
                      <p class="my-0">TIN No: 101435346</p>
                      <p class="my-0">Tel:(+250)78779745</p>
                      <p class="my-0">KN 3 Road, Gasabo District</p>
                      <p class="my-0">Remera, Rukili 1, Kigali Rwanda</p>
                    </v-flex>
                    <v-flex xs12 md12 class="mb-2">
                      <p class="text-right my-0">
                        Receipt Number: 314234534435
                      </p>
                      <p class="text-right my-0">Date: 2020-05-29 09:12:23</p>
                      <p class="text-right my-0">Electricity</p>
                    </v-flex>
                    <v-flex xs12 md12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 md12 class="mb-2">
                      <p class="my-0">MobiCash LTD</p>
                      <p class="my-0">TIN No: 101435346</p>
                      <p class="my-0">Tel:(+250)78779745</p>
                      <p class="my-0">KN 3 Road, Kicukiro District</p>
                      <p class="my-0">Remera, Rukili 1, Kigali Rwanda</p>
                    </v-flex>
                    <v-flex xs12 md12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 md12 class="mb-2">
                      <qrcode-vue
                        :value="value"
                        :size="size"
                        level="H"
                      ></qrcode-vue>
                    </v-flex>
                  </v-layout>
                </v-card>
              </div>
              <v-layout row wrap class="pa-3">
                <v-flex xs12 md12>
                  <v-btn @click="getPdf(htmlTitle)" color="primary" block
                    >Download</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-item>
        </v-col>
      </v-row>
    </div>
  </v-item-group>
</template>
<script>
import JsPDF from 'jspdf'
import html2Canvas from 'html2canvas'
import QrcodeVue from 'qrcode.vue'
export default {
  components: {
    QrcodeVue
  },
  data: () => ({
    isFormValid: false,
    htmlTitle: 'Receipt',
    lazy: false,
    value: 'https://example.com',
    size: 100
  }),
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    },
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    isProgressLoader() {
      return this.$store.getters['helper/isProgressLoader']
    },
    userProfile() {
      return this.$store.getters['users/userProfile']
    }
  },
  methods: {
    getPdf(title) {
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: false,
        useCORS: true
      }).then(function(canvas) {
        const pageHeight = 380
        const pageWidth = 340
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const PDF = new JsPDF('', 'pt', [400, 300])
        PDF.addImage(pageData, 'JPEG', 0, 0, pageHeight, pageWidth)
        PDF.save(title + '.pdf')
      })
    }
  }
}
</script>
<style scoped>
.disable-events {
  pointer-events: none;
}
.create-center {
  text-align: center;
}
#receipt-details {
  text-align: right !important;
  color: red;
}
.line {
  width: 63px;
  border-bottom: 5px solid #ff8c00;
  position: absolute;
}
</style>
