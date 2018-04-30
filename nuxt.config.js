module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Nuxt boilerplate - bulma flavour',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt boilerplate - bulma flavour'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },



  // mode: 'spa',

  css: [
    '~assets/css/marginpaddinghelpers.css',
    '~assets/bulmaCustom/custom/custom.css',
    '~assets/fonts/okomito/stylesheet.css',
  ],


  router: {
    middleware: ['setSearchWindow','scrollposbefore']
  },

  modules: [
    //'@nuxtjs/bulma'
  ],

  plugins: [

    //GLOBAL MIXINS
    // '~/mixins/computedresizerglobalmixin.js',

    '~/plugins/lodash-plugin.js',
    {
      src: '~/plugins/dragorderlist.js',
    },
    {
      src: '~/plugins/setscrollpos.js',
    },
    {
      src: '~/plugins/vuemq.js',
      ssr: false
    },
    {
      src: '~/plugins/vueawesomeswiper-plugin.js',
      ssr: false
    },
    {
      src: '~/plugins/documentoffset.js',
      ssr: false
    },
    {
      src: '~/plugins/smoothscroll.js',
      ssr: false
    },
    {
      src: '~/plugins/urijs-plugin.js',
      ssr: false
    },
    {
      src: '~/plugins/lazyload.js',
      ssr: false
    },
    // {
    //   src: '~/mixins/computedscrollbarwidth.js',
    //   ssr: false
    // },
  ],

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#091540'
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios', 'lodash'],


    styleResources: {
      scss: './assets/scss/variables.scss',
      scss: './assets/scss/colors.scss',
      scss: './assets/scss/main.scss',
      // scss: './assets/scss/underlines.scss'
    },

    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
    /*
     ** Run ESLint on save
     */
    // extend(config, ctx) {
    //   if (ctx.dev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },
  generate: {
    minify: {
      collapseWhitespace: false
    }
  }
}
