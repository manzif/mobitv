<template>
  <v-item-group active-class="secondary">
    <div>
      <v-row justify="center">
        <v-col cols="12" md="5" sm="6">
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
                      <p class="my-0">KN 3 Road, Kicukiro District</p>
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
  methods: {
    async profileEdit(id) {
      this.$store.dispatch('helper/loading')
      try {
        const personalData = {
          username: this.username,
          email: this.email
        }
        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
          callBackUrl: this.callBackUrl
        }
        id = this.authUser._id
        await this.$store.dispatch('users/profileEdit', {
          userData
        })
        await this.$store.dispatch('users/personalEdit', {
          id,
          personalData
        })
        this.$store.dispatch('helper/loading')
        this.firstName = null
        this.lastName = null
        this.companyName = null
        this.companySector = null
        this.companyId = null
      } catch (e) {
        return e
      }
    },
    generatePdf() {
      console.log('\n\n\n\n\n', 'ndahari')
      if (process.client) {
        /* eslint-disable new-cap */
        const doc = new JsPDF('p', 'pt', 'A4')
        const margins = {
          top: 80,
          bottom: 60,
          left: 40,
          width: 522
        }

        doc.fromHTML(this.$refs.content, margins.left, margins.top, {
          width: margins.width
        })
        // doc.text('Hello world!', 10, 10)

        doc.save('test.pdf')
      }
    },
    getPdf(title, isShowPreviewFullTime) {
      const margins = {
        top: 10,
        bottom: 60,
        left: 10
      }
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: false,
        useCORS: true,
        x: 370,
        y: 80
      }).then(function(canvas) {
        const pageWidth = 295.28
        const pageHeight = canvas.height / (canvas.width / 292.28)
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const PDF = new JsPDF('', 'pt', [pageWidth, pageHeight])
        PDF.addImage(
          pageData,
          'JPEG',
          margins.left,
          margins.top,
          pageWidth,
          pageHeight
        )
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
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
