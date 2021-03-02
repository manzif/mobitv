/* eslint-disable no-console */

export const actions = {
  async getElectricity({ commit }, { meterNumber, clientId, msisdn }) {
    try {
      const { data } = await this.$axios.post(
        'https://client.mobicash.rw/mobicash/services/rest/0.0.1/cashPowerMeterNumberValidation',
        {
          meterNumber
        }
      )
      if (data.responseCode === 200) {
        await this.$router.push({
          name: 'electricity-amount',
          params: {
            clientName: data.consumer.customerName,
            meterNumber,
            clientId,
            msisdn
          }
        })
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'Please check the meter number and provide the amount.'
        })
      }
      if (data.responseCode === 400) {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message:
            'Meter Number must at least 10 characters, and does not contain any letter'
        })
      }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: error.message
      })
    }
  },

  async payElectricity({ commit }, { meterNumber, amount, msisdn, clientId }) {
    try {
      const { data } = await this.$axios.post(
        'https://client.mobicash.rw/mobicash/services/rest/0.0.1/buyElectricity',
        {
          meterNumber,
          amount,
          msisdn,
          clientId
        }
      )
      if (data.responseCode === 200) {
        await this.$router.push({
          name: 'receipt',
          params: { data }
        })
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'The electricity paid successfuly'
        })
      }
      if (data.responseCode === 400) {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: 'Check if you have sent all the required details'
        })
      }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: 'Please contact Yves from Mobicash. There is a network error'
      })
    }
  }
}
