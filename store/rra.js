/* eslint-disable no-console */

export const actions = {
  async docIdValidation({ commit }, { rraRef, clientPhone, clientId }) {
    try {
      const { data } = await this.$axios.post(
        'https://client.mobicash.rw/mobicash/services/rest/0.0.1/decValidation',
        {
          rra_ref: rraRef
        }
      )
      if (data.responseCode === 200) {
        await this.$router.push({
          name: 'rra-amount',
          params: { data, clientId, clientPhone }
        })
        return this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'Declaration Id is verified, Please proceed for the payment'
        })
      }
      if (data.responseCode === 400) {
        return this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: 'The declaration ID is not valid'
        })
      }
    } catch (error) {
      return this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: error.message
      })
    }
  },

  async payRRA(
    { commit },
    {
      bankName,
      amount,
      clientPhone,
      clientId,
      referenceNumber,
      taxPayerName,
      taxDescription,
      taxCenterNumber,
      taxTypeNumber,
      assessNumber,
      rraOriginNumber,
      declarationId,
      tinNumber
    }
  ) {
    try {
      const { data } = await this.$axios.post(
        'https://client.mobicash.rw/mobicash/services/rest/0.0.1/rraTaxPayment',
        {
          clientPhone,
          AMOUNT_TO_PAY: amount,
          bank_name: bankName,
          RRA_REF: referenceNumber,
          TAX_PAYER_NAME: taxPayerName,
          TAX_TYPE_DESC: taxDescription,
          TAX_TYPE_NO: taxTypeNumber,
          TAX_CENTRE_NO: taxCenterNumber,
          ASSESS_NO: assessNumber,
          RRA_ORIGIN_NO: rraOriginNumber,
          DEC_ID: declarationId,
          TIN: tinNumber,
          clientId
        }
      )
      if (data.status === 'PROCESSED') {
        await this.$router.push({
          name: 'receipt',
          params: { data }
        })
        return this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'Tax Payed successfuly'
        })
      }
      if (data.status === 'NOT_ENOUGH_CREDITS') {
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
        message: error.message
      })
    }
  }
}
