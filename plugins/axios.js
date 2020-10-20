/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// export default function({ $axios, redirect }) {
//   localStorage.getItem('Token')
//   this.$axios.setToken('123', 'Bearer')
// }

export default function({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })
  /* api if (process.client) {
  //   console.log(`\n\n Kigali ${localStorage.getItem('Token')}`)
  //   api.setToken(localStorage.getItem('Token'), 'Bearer')
  // }

  //   Set baseURL to something different
  //   api.setBaseURL('https://my_api.com')

  // Inject to context as $api
  // inject('axios', api)

  */
}
