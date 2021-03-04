/* eslint-disable no-console */

export const actions = {
  async nidValidation({ commit }, { identification }) {
    try {
      const { data } = await this.$axios.post(
        'https://client.mobicash.rw/mobicash/services/rest/0.0.1/ltssnidValidation',
        {
          identification
        }
      )
      console.log('\n\n\n', data)
      //   if (data.responseCode === 200) {
      //     await this.$router.push({
      //       name: 'cbhi-amount',
      //       params: { data, clientId, clientPhone }
      //     })
      //     this.dispatch('helper/showingMessage', {
      //       visible: true,
      //       type: 'success',
      //       message: 'NID is valid'
      //     })
      //   }
      //   if (data.responseCode === 400) {
      //     this.dispatch('helper/showingMessage', {
      //       visible: true,
      //       type: 'error',
      //       message: data.rssbResponse.reply
      //     })
      //   }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: error.message
      })
    }
  },

  async payCBHI(
    { commit },
    { nid, clientPhone, clientId, paymentYear, amountPaid, invoice, name }
  ) {
    try {
      const { data } = await this.$axios.post(
        'https://client.mobicash.rw/mobicash/services/rest/0.0.1/mutuellePayement',
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
        await this.$router.push({
          name: 'receipt',
          params: { data }
        })
        return this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'CBHI Payed successfuly'
        })
      }
      if (data.responseDescription === 'NOT_ENOUGH_CREDITS') {
        return this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: 'You do not have enough credits. Please recharge again'
        })
      }
      if (data.responseCode === 400) {
        return this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: 'Please check if you have provided all the required field'
        })
      }
    } catch (error) {
      return this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: 'Please contact Mobicash. There is a network error'
      })
    }
  }
}
