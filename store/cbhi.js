/* eslint-disable no-console */

export const actions = {
  async nidValidation({ commit }, { nid, paymentYear }) {
    try {
      const { data } = await this.$axios.post(
        'http://52.36.87.202/mobicash/services/rest/0.0.1/nidValidation',
        {
          nid,
          paymentYear
        }
      )
      if (data.responseCode === 200) {
        await this.$router.push({
          name: 'cbhi-amount',
          params: { data }
        })
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'NID is valid'
        })
      }
      if (data.responseCode === 400) {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: data.rssbResponse.reply
        })
      }
    } catch (error) {
      console.log('\n\n\n\n\n\n', error)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: 'Please contact Mobicash. There is a network error'
      })
    }
  },

  async payCBHI(
    { commit },
    { nid, clientPhone, clientId, paymentYear, amountPaid, invoice, name }
  ) {
    try {
      const { data } = await this.$axios.post(
        'http://52.36.87.202/mobicash/services/rest/0.0.1/mutuellePayement',
        {
          clientPhone,
          nid,
          paymentYear,
          amountPaid,
          invoice,
          name,
          clientId
        }
      )
      if (data.responseDescription === 'PROCESSED') {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'CBHI Payed successfuly'
        })
      }
      if (data.responseCode === 400) {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: 'Please check if you have provided all the required field'
        })
      }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: 'Please contact Mobicash. There is a network error'
      })
    }
  }
}
