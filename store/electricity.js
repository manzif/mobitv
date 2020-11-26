/* eslint-disable no-console */

export const actions = {
  async getElectricity({ commit }, meterNumber) {
    try {
      const { data } = await this.$axios.get(
        'https://app.mcash.rw/electricity/getMeterNumberDetails.php',
        {
          params: { meterNumber }
        }
      )
      if (data.message === 'Meter number found') {
        await this.$router.push({
          name: 'electricity-amount',
          params: { clientName: data.clientName, meterNumber: data.meterNumber }
        })
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: 'Please check the meter number and provide the amount.'
        })
      }
      if (data.statusCode === '0') {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: 'Meter Number not found. Try again'
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
