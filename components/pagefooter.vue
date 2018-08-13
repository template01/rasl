<template>
<transition name="fade">
  <div v-if="footerContent" v-show="appinitated" class="pagefooter lightgrey-background pr-40 pl-40 pt-20 pb-20">

    <div class="">

      <div class="columns is-marginless is-size-4">
        <div class="column">
          <!-- <nuxt-link :to="'/'+windowsearch">
            <p class="is-size-3 logoText">
              <span class="">
              PUBLICATIONS.RASL.NU
            </span>
            </p>
          </nuxt-link> -->
          <div v-html="footerContent.acf.content">
          </div>
        </div>


      </div>
      <div class="columns is-marginless is-size-4">
        <div class="column">
          <div class="logoWrapperOuter">
            <span class="logo mr-40" v-for="link in footerContent.acf.logoslinks">
                <a v-if="link.link.length>0":href="link.link">
                  <img :src="link.logo.url"/>
                </a>
                <span v-else>
                  <img :src="link.logo.url"/>
                </span>
            </span>
          </div>
        </div>


      </div>



    </div>
  </div>
</transition>
</template>
<script>
import axios from 'axios'

// import _ from 'lodash'

// import selectpost from '~/components/selectpost'

// import buttoncounter from '~/components/buttoncounter'
// import menucontent from '~/components/menucontent'
import {
  mapGetters
} from 'vuex'


export default {
  // props: ['title', 'selectpost','initload'],
  components: {
    // buttoncounter,
    // selectpost,
    // menucontent
  },
  directives: {},

  data: function() {
    return {
      footerContent: false
    }
  },
  watch: {

  },

  beforeDestroy: function() {

  },
  methods: {
    getFooterContent: function() {
      var vm = this
      axios.all([
          // axios.get('http://google.com'),
          // axios.get('http://apple.com')
          axios.get(this.apiRoot + '/wp/v2/pages?slug=footer')
        ])
        .then(axios.spread((footerRes) => {
          this.footerContent = footerRes.data[0]
        }))

    }
  },
  mounted() {
    this.getFooterContent()
  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
      appinitated: "GET_APP_INITIATED",
      apiRoot: "GET_APIROOT",
    }),
  },


}
</script>
<style scoped lang="scss">
.logoWrapperOuter {
    display: flex;
}
.logo {
    img {
        max-height: 100px;
    }
}
</style>
