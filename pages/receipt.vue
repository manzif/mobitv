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
                      <p>
                        Gushora imari yawe mu kigega RNIT ITERAMBERE FUND
                        ukoresheje mobicash biroroshye, bibereye buri wese,
                        kandi ni iby;igihe kirambye. Ukeneye
                        ubusobanuro:(+250)787900207
                      </p>
                      <v-divider></v-divider>
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
export default {
  data: () => ({
    isFormValid: false,
    firstName: '',
    companyName: '',
    htmlTitle: 'Receipt',
    companyId: '',
    companySector: '',
    lastName: '',
    username: '',
    callBackUrl: '',
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    companyRegistrationNumber: '',
    companyRegistrationNumberRules: [
      (v) => !!v || 'Company registration number',
      (v) => (v && v.length <= 10) || 'must be less than 10 characters'
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    selectedSector: null,
    sectors: ['E-commerce', 'Online delivery', 'Online store'],
    lazy: false
  }),
  computed: {
    companyNam() {
      return this.$store.getters['users/companyName']
    },
    companyI() {
      return this.$store.getters['users/companyId']
    },
    companySecto() {
      return this.$store.getters['users/companySector']
    },
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
  created() {
    if (this.$route.params.data) {
      console.log('\n\n\n\n\n', this.$route.params.data)
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    getPdf(title, isShowPreviewFullTime) {
      // const margins = {
      //   top: 12,
      //   bottom: 60,
      //   left: 0
      // }
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
  border-bottom: 5px solid #98989d;
  position: absolute;
}
</style>
