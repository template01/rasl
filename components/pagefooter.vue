<template>
<transition name="fade">
  <div v-if="footerContent" v-show="appinitated" class="pagefooter lightgrey-background pr-40 pl-40 pt-20 pb-20">


      <div  v-if="$mq === 'lg'"  style="display:flex" class=" is-size-4-desktop is-size-6-touch" :class="$mq != 'lg' ? '':'mt-20'">
            <div class="is-pulled-left  logo" v-for="link in footerContent.acf.logoslinks">
                <a v-if="link.link.length>0":href="link.link">
                  <img :src="link.logo.url"/>
                </a>
                <span v-else>
                  <img :src="link.logo.url"/>
                </span>
            </div>
          <div class="is-pulled-left pl-40 footerText" v-html="footerContent.acf.content">
          </div>
      </div>

      <div  v-else  class=" is-size-4-desktop is-size-6-touch">
            <div class="" v-html="footerContent.acf.content">
            </div>
            <div class="mt-10" v-for="link in footerContent.acf.logoslinks">
                <a v-if="link.link.length>0":href="link.link">
                  <img width="60px":src="link.logo.url"/>
                </a>
                <span v-else>
                  <img width="60px":src="link.logo.url"/>
                </span>
            </div>
      </div>
  </div>
</transition>
</template>
<script>
import axios from 'axios'

import {
  mapGetters
} from 'vuex'


export default {

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
// .logoWrapperOuter {
//     display: flex;
// }
.logo {

    img {
        min-width: 50px;
        max-height: 100px;
    }
}
</style>
