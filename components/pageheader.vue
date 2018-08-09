<template>
    <transition name="fade">
<div v-show="appinitated" class="indexheader pr-40 pl-40 pt-20">

  <div class="indexheaderInner">

    <div>
      <div class="columns is-marginless">
        <div class="column  logoWrapper">
          <nuxt-link :to="'/'+windowsearch">
            <p class="is-size-3 logoText">
              <span class="">
              PUBLICATIONS.RASL.NU
            </span>
            </p>

          </nuxt-link>
          </p>
        </div>
        <div v-if="$route.params.type ==='reflective' || $route.params.type ==='practice'" class="column  logoWrapper">

          <p class="is-size-3 has-text-right logoText">
            <selectpost class="pointer mr-40 pr-5" :posttype="selectpost.type" :postid="selectpost.id"></selectpost>
          </p>
        </div>

      </div>


    </div>


  </div>
</div>
</transition>
</template>
<script>
import _ from 'lodash'

import selectpost from '~/components/selectpost'

import buttoncounter from '~/components/buttoncounter'
import menucontent from '~/components/menucontent'
import {
  mapGetters
} from 'vuex'


export default {
  props: ['title', 'selectpost','initload'],
  components: {
    buttoncounter,
    selectpost,
    menucontent
  },
  directives: {
  },

  data: function() {
    return {
      hideLogo: false,
      widthHr: 0,
      widthHeaderInit: 0,
      widthLogoInit: 0,
      widthHeader: 0,
      widthLogo: 0,

    }
  },
  watch: {

  },

  beforeDestroy: function() {
    // window.removeEventListener('scroll', this.handleWindowScroll)
    // window.removeEventListener('resize', this.handleWindowResize)
  },
  mounted() {
    // window.addEventListener('scroll', this.handleWindowScroll);
    // window.addEventListener('resize', this.handleWindowResize);
    // this.widthHeaderInit = this.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
    // this.widthLogoInit = this.$el.querySelector('.logoHeader').getBoundingClientRect().width
    // this.widthHeader = this.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
    // this.widthLogo = this.$el.querySelector('.logoHeader').getBoundingClientRect().width
    // this.setWidthHr()
  },
  methods: {
    // openMenu: function () {
    //   this.menuOpen = true
    //   this.hideLogo = true
    //   this.widthHeader = this.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
    //   this.widthLogo = 0
    //   this.setWidthHr()
    // },
    // closeMenu: function () {
    //   this.menuOpen = false
    //   if (window.scrollY < 40) {
    //     this.hideLogo = false
    //     this.widthHeader = this.widthHeaderInit
    //     this.widthLogo = this.widthLogoInit
    //   }else{
    //     this.widthHeader = this.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
    //     this.widthLogo = 0
    //   }
    //   this.setWidthHr()
    // },
    //
    // setWidthHr: function() {
    //   this.widthHr = this.widthHeader - this.widthLogo
    // },
    //
    // handleWindowResize: _.throttle(function(arg) {
    //       this.widthHeader = this.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
    //       this.widthLogo = this.$el.querySelector('.logoHeader').getBoundingClientRect().width
    //       if (window.scrollY < 40) {
    //         this.widthHeaderInit = this.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
    //         this.widthLogoInit = this.$el.querySelector('.logoHeader').getBoundingClientRect().width
    //       }
    //       this.setWidthHr()
    //
    // }, 50),
    //
    // handleWindowScroll: _.throttle(function(arg) {
    //
    //   if(!this.menuOpen){
    //
    //     if (window.scrollY > 40) {
    //       this.hideLogo = true
    //       this.widthHeader = this.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
    //       this.widthLogo = this.$el.querySelector('.logoHeader').getBoundingClientRect().width
    //       this.setWidthHr()
    //
    //     } else {
    //       this.hideLogo = false
    //
    //       this.widthHeader = this.widthHeaderInit
    //       this.widthLogo = this.widthLogoInit
    //       this.setWidthHr()
    //       var vm = this
    //       setTimeout(function() {
    //         vm.widthHeaderInit = vm.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
    //         vm.widthLogoInit = vm.$el.querySelector('.logoHeader').getBoundingClientRect().width
    //         vm.widthHeader = vm.widthHeaderInit
    //         vm.widthLogo = vm.widthLogoInit
    //         vm.setWidthHr()
    //       }, 100)
    //     }
    //
    //   }
    //
    // }, 150)

  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
      appinitated: "GET_APP_INITIATED",
    }),
  },


}
</script>
<style scoped lang="scss">
.indexheader{
  // transform: translateY(-40px);
  position: absolute;
  z-index: 100;
  width: 100%;
  .fixedMenu{
    position: fixed;
    right: calc(40px + 0.75rem)
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
