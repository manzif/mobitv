const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans'
      },
      {
        href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
        rel: 'stylesheet'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#0087ff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/axios.js',
    '@/plugins/core-components.js',
    '@/plugins/vee-validate.js',
    { src: '@/plugins/vue-notification.js', ssr: false },
    '@/plugins/axios.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
    ['vuetify-dialog/nuxt', { property: '$dialog' }]
  ],

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {
  //           url: 'http://tests.mcash.rw/mobtiv/login.php',
  //           method: 'get'
  //         },
  //         logout: false,
  //         user: false
  //       },
  //       autoFetchUser: false
  //     }
  //   },
  //   plugins: [{ src: '~/plugins/axios', ssr: true }, '~/plugins/auth.js']
  // },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  // axios: {
  //   baseURL: 'http://localhost:3000/api/'
  // },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      options: {
        customProperties: true
      },
      themes: {
        light: {
          background: colors.grey.lighten3,
          primary: '#0087ff',
          secondary: '#b0bec5',
          accent: '#0087ff',
          error: '#b71c1c'
        },
        dark: {
          background: '#012538',
          primary: '#0087ff',
          secondary: '#b0bec5',
          accent: '#0087ff',
          error: '#b71c1c'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
