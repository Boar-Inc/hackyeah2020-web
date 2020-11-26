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
  head: {
    title: 'Boar Inc.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {hid: 'description', name: 'description', content: 'Boar Inc. is a hackathon project for HackYeah 2020' },
      {hid: 'author', name: 'author', content: 'Jude (Mateusz Sowiński) Hunter, Jakub Kopańko'},
      {hid: 'keywords', name: 'keywords', content: 'boar, asf'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' },
      // Montserrat
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400&family=Roboto:wght@400;500&display=swap' },
      {rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.0.5/css/boxicons.min.css'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css'}
    ]
  },

  // loading: '~/components/Loading.vue',
  loading: {
    css: false
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {src: '@/plugins/infscroll.js', ssr: false},
    {src: '@/plugins/portal.js', ssr: true},
    {src: '@/plugins/vuexpersist.js', ssr: false}
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
    ['nuxt-gmaps', {
      key: 'AIzaSyAbzr2-d1_XVbGcAOHHxKFc-aR1BB-Z4aw'
    }]
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},

  auth: {
    cookie: {
      options: {
        maxAge: 60 * 60 * 24 * 30 * 12 * 3,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      }
    },
    redirect: {
      login: '/login',
      callback: '/callback',
      home: '/feed',
      logout: '/login'
    },
    strategies: {
      facebook: {
        scheme: 'oauth2',
        clientId: '1798890273583314',
        endpoints: {
          logout: false,
          authorization: 'https://facebook.com/v6.0/dialog/oauth',
          token: process.env.API_URL + 'auth/facebook',
          userInfo: process.env.API_URL + 'me'
        },
        scope: ['public_profile', 'email'],
        responseType: 'code',
        token: {
          maxAge: 60 * 60 * 24 * 30 * 12 * 3
        }
      },
      google: {
        scheme: 'oauth2',
        clientId: '833386515779-oj8up1us0jfbmvpn9k6i2e79caof5440.apps.googleusercontent.com',
        endpoints: {
          logout: false,
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          token: process.env.API_URL + 'auth/google',
          userInfo: process.env.API_URL + 'me'
        },
        scope: ['email', 'profile', 'openid'],
        responseType: 'code',
        codeChallengeMethod: '',
        token: {
          maxAge: 60 * 60 * 24 * 30 * 12 * 3
        }
      },
      local: {
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24 * 30 * 12 * 3
        },
        endpoints: {
          login: {url: process.env.API_URL + 'auth/local/login', method: 'post'},
          logout: false,
          user: {url: process.env.API_URL + 'me', method: 'get'}
        },
        user: {
          property: false
        }
      }
    }
  },

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
  }
}
