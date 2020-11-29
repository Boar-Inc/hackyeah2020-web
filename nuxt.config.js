require('dotenv').config();
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  srcDir: 'src/',
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  telemetry: false,
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  pwa: {
    meta: {
      name: 'Dzika Akcja',
      author: 'Jude (Mateusz Sowiński-Smętny) Hunter, Jakub Kopańko (pcktm)',
      description: 'Dzika Akcja is a hackathon project for HackYeah 2020',
      lang: 'pl-PL',
    },
    manifest: {
      name: 'Dzika Akcja',
      lang: 'pl',
      short_name: 'Dzika Akcja',
      theme_color: '#198840',
      background_color: '#198840'
    }
  },
  head: {
    title: 'Dzika Akcja',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {hid: 'description', name: 'description', content: 'Dzika Akcja is a hackathon project for HackYeah 2020' },
      {hid: 'author', name: 'author', content: 'Jude (Mateusz Sowiński) Hunter, Jakub Kopańko (pcktm)'},
      {hid: 'keywords', name: 'keywords', content: 'boar, asf, hackyeah2020'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      // Montserrat
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400&family=Roboto:wght@400;500&display=swap' },
      {rel: 'stylesheet', href: 'https://unpkg.com/boxicons@latest/css/boxicons.min.css'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css'}
    ],
    script: [
      {
        // src: 'https://unpkg.com/openlayers@4.6.5/dist/ol.js'
      }
    ]
  },

  // loading: '~/components/Loading.vue',
  loading: {
    css: false
  },
  /*
  ** Global CSS
  */
  // css: [
  //   {src: 'leaflet.markercluster/dist/MarkerCluster.css', lang: 'css'},
  //   {src: 'leaflet.markercluster/dist/MarkerCluster.Default.css', lang: 'css'}
  // ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {src: '@/plugins/infscroll.js', ssr: false},
    {src: '@/plugins/portal.js', ssr: true},
    {src: '@/plugins/vuexpersist.js', ssr: false},
    {src: '~plugins/vuelayers.js', ssr: false},
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},

  styleResources: {
    scss: [
      '~styles/globals.scss'
    ]
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  // build: {
  //   publicPath: 'https://omvyxegm72.execute-api.us-east-1.amazonaws.com/stage/_nuxt/'
  // },

  // router: {
  //   base: '/stage/'
  // },

  render: {
    compressor: false,
    etag: false,
    static: {}
  },

  build: {
    transpile: ['vuelayers', 'ol']
  }
}
