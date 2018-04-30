<template>
<div class="indexheader p-40">
  <div class=" ">
    <hr class="m-0" />
  </div>
  <div class="indexheaderSticky" v-sticky sticky-offset="0" sticky-side="top" >
  <div  class="columns is-marginless">
    <div class="column is-2  logoWrapper">
        <img class="logoHeader" :src="'rasllogow.svg'"/>
        <p class="is-size-4 logoText">
          RASL
        </p>
    </div>
    <div class="column is-8 ">
      <p class="has-text-centered is-size-4">
        COMPOSITIONS
      </p>
    </div>
    <div class="column  is-2 headerheight">
      <p class="has-text-right is-size-4 ">
        <span><nuxt-link :to="'collection'+windowsearch"><img class="rasl-icon mr-10" :src="'icons/rasl_library.svg'" /></nuxt-link>
        </span>
        <span><nuxt-link :to="'collection'+windowsearch"><span class="mr-10"><buttoncounter></buttoncounter></span></nuxt-link>
        </span>
        <span><nuxt-link :to="'collection'+windowsearch"><img class="rasl-icon" :src="'icons/rasl_about.svg'" /></nuxt-link>
        </span>
        <!-- <span><nuxt-link :to="'collection'+windowsearch"><span class="mr-10"><buttoncounter></buttoncounter></span></nuxt-link></span> -->
      </p>
    </div>
  </div>
  <div class=" ">
    <hr class="m-0" />
  </div>
</div>

  <div class="columns is-marginless">
    <div class="column is-8 is-offset-2 ">
      <p class="has-text-centered is-size-4">
        Featured
      </p>
    </div>

  </div>
  <div class=" ">
    <hr class="m-0" />
  </div>
</div>
</template>
<script>
import _ from 'lodash'
if (process.browser) {
  var Sticky = require('vue-sticky-directive')
}

import buttoncounter from '~/components/buttoncounter'
import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  components: {
    buttoncounter
  },
  directives: {
    Sticky
  },

  data: function() {
    return {
      filterby: [],
      filterbyset: false,
      filtertypes: [],
      genericData: 'generic component text',


    }
  },
  watch: {

  },
  methods: {},
  computed: {
    // filterbyset:function(){
    //   return !_.isEmpty(this.filterby)
    // },
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH"
    }),
  },


}
</script>
<style scoped lang="scss">

.indexheaderSticky{
  background: $white;
}
.logoWrapper{
  position: relative;
}
.logoHeader{
  background: white;
  padding-bottom:  20px;
  padding-top: 20px;
  padding-right: 30px;
  padding-left: 0px;
  // padding-left: 10px;
  // padding-right: 15px;
  position: absolute;
  z-index: 9999;
  // left: 0px;
  // top:0px;
  // height: 60px;
  left: 0px;
  top:-2px;
  height: 124px;
  opacity: 1;
  max-height: 124px;
  transition: opacity 0.10s ease-in-out, max-height 0.10s ease-in-out;
  overflow: hidden;
}

.logoText{
  opacity: 0;
  transition: opacity 0.10s ease-in-out;
}

.top-sticky{
  .logoHeader{
    opacity: 0;
    // max-height: 0px;


  }
  .logoText{
    opacity: 1
  }
}
// .navigation{
//   opacity: 0;
//   transition: opacity 0.25s ease-in-out;
//
// }
// .top-sticky .navigation{
//   opacity: 1
// }

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s, max-height 0.5s ease-in-out;
    overflow: hidden;
    max-height: 300px;
}
/* .fade-leave-active below version 2.1.8 */
.fade-enter,
.fade-leave-to {
    opacity: 0;
    overflow: hidden;
    max-height: 0;
    transition: opacity 0.25s, max-height 0.3s ease-in-out;
}

input {
    display: none;
}
input[type=checkbox]:checked + label {
    border-bottom: 2px solid $black;
    // background: $black;
    // color: white;
    // border: 2px solid $white;

}
</style>
