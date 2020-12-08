/* eslint-disable no-console */

export const actions = {
  async docIdValidation({ commit }, rraRef) {
    try {
      const { data } = await this.$axios.post(
        'http://52.36.87.202/mobicash/services/rest/0.0.1/decValidation',
        {
          rra_ref: rraRef
        }
      )
      if (data.statusCode === 200) {
        await this.$router.push({
          name: 'rra-amount',
          params: { data }
        })
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'Declaration Id is verified, Please proceed for the payment'
        })
      }
      if (data.responseCode === 400) {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: 'The declaration ID is not valid'
        })
      }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: 'Please contact Yves from Mobicash. There is a network error'
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
        'http://52.36.87.202/mobicash/services/rest/0.0.1/rraTaxPayment',
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
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'Tax Payed successfuly'
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
