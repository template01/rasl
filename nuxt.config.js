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
