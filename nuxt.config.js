module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'PUBLICATIONS.RASL.NU',
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
        content: 'PUBLICATIONS.RASL.NU'
      },
    {
      name: 'msapplication-TileColor',
      content: '#000000'
    },

    {
      name: 'msapplication-TileImage',
      content: '/mstile-144x144.png'
    },

    {
      name: 'msapplication-square70x70logo',
      content: '/mstile-70x70.png'
    },

    {
      name: 'msapplication-square150x150logo',
      content: '/"mstile-150x150.png'
    },


    {
      name: 'msapplicationn-wide310x150logo',
      content: '/mstile-310x150.png'
    },

    {
      name: 'msapplication-square310x310logo',
      content: '/mstile-310x310.png'
    }
        ],
  link: [{
      rel: 'apple-touch-icon-precomposed',
      sizes: '57x57',
      href: '/apple-touch-icon-57x57.png'
    }, {
      rel: 'apple-touch-icon-precomposed',
      sizes: '114x114',
      href: '/apple-touch-icon-114x114.png'
    }, {
      rel: 'apple-touch-icon-precomposed',
      sizes: '72x72',
      href: '/apple-touch-icon-72x72.png'
    },
    {
      rel: 'apple-touch-icon-precomposed',
      sizes: '144x144',
      href: '/apple-touch-icon-144x144.png'
    },
    {
      rel: 'apple-touch-icon-precomposed',
      sizes: '60x60',
      href: '/apple-touch-icon-60x60.png'
    }, {
      rel: 'apple-touch-icon-precomposed',
      sizes: '120x120',
      href: '/apple-touch-icon-120x120.png'
    }, {
      rel: 'apple-touch-icon-precomposed',
      sizes: '76x76',
      href: '/apple-touch-icon-76x76.png'
    },
    {
      rel: 'apple-touch-icon-precomposed',
      sizes: '152x152',
      href: '/apple-touch-icon-152x152.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '196x196',
      href: '/favicon-196x196.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      href: '/favicon-96x96.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '128x128',
      href: '/favicon-128.png'
    }]
  },



  // mode: 'spa',


  //
  // styleResources: {
  //   scss: './assets/scss/variables.scss',
  //   // scss: './assets/scss/colors.scss',
  //   scss: './assets/scss/main.scss',
  //   // scss: './assets/scss/underlines.scss'
  // },


  css: [{
      src: '~assets/css/marginpaddinghelpers.css',
      lang: 'css'
    },
    {
      src: '~assets/scss/variables.scss',
      lang: 'sass'
    },
    {
      src: '~assets/scss/main.scss',
      lang: 'sass'
    },
    {
      src: '~assets/fonts/texgyrefont/stylesheet.css',
      lang: 'css'
    }
  ],


  router: {
    middleware: ['setSearchWindow', 'scrollposbefore', 'delaypagetransition']
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
      src: '~plugins/vue-slider.js',
      ssr: false
    },
    {
      src: '~/plugins/vueswipe.js',
      ssr: false
    },
    {
      src: '~/plugins/sticky.js',
      ssr: false
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
  // loading: {
  //   color: 'blue',
  //   height: '100vh'
  // },

  loading: '~/components/loading.vue',
  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios', 'lodash'],


    styleResources: {
      scss: './assets/scss/variables.scss',
      // scss: './assets/scss/colors.scss',
      // scss: './assets/scss/main.scss',
      // scss: './assets/scss/underlines.scss'
    },

    // postcss: {
    //   plugins: {
    //     'postcss-custom-properties': false
    //   }
    // }
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
