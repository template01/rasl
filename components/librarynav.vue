<template>
<div >
  <div class="columns is-marginless">
    <!-- <div  v-if="!showfilters" class="column is-8 is-offset-2 ">
      <p class="has-text-centered is-size-4-desktop is-size-5-touch">
        <span class="valign-middle">
          Library
        </span>
      </p>
    </div> -->

    <!-- <div v-if="showfilters" class="column is-6 "> -->
    <div class="column is-6 ">
      <p class="is-size-4-desktop is-size-5-touch">
        <span class="pr-10 valign-middle">FILTER:</span>
        <!-- <input type="checkbox" id="mike" v-model="checkedNames"> -->
        <!-- <label for="mike">Mike</label> -->
        <span v-for="filter in filtertypes" class="pr-10 valign-middle pointer">
            <input :id="'filter'+filter.name" @click="filterby=[]" v-model="filterby" :value="{name:filter.name}"  type="checkbox">
            <label class="pointer" :for="'filter'+filter.name" v-html="filter.prettyname"></label>
        </span>
        <loadingindicator v-if="loadingContent"></loadingindicator>

      </p>
    </div>
    <!-- <div v-if="showfilters" class="column is-4"> -->
    <div class="column is-4">
      <p class="is-size-4-desktop is-size-5-touch">
        <span class="pr-10 valign-middle">SEARCH:</span>
        <search></search>
      </p>
    </div>
    <div class="column navButtons ">
      <!-- <p class="has-text-right is-size-4-desktop is-size-5-touch ">
        <span  class="mr-10" v-if="!showfilters" @click=" $store.commit('SET_SHOWFILTERSDESKTOP', true);"><img class="pointer rasl-icon" :src="'icons/rasl_filter.svg'" /></span>
        <span  class="mr-10" v-else @click=" $store.commit('SET_SHOWFILTERSDESKTOP', false);"><img class="pointer rasl-icon" :src="'icons/rasl_close.svg'" /></span>
        <span><img class="opacity0 disable rasl-icon" :src="'icons/rasl_close.svg'" /></span>
      </p> -->
    </div>
  </div>
  <transition name="fade">
  <template v-if="filterby.length>0">
    <div class="filters" :class="filterby.length>0 ">
    <hr class="m-0" />
      <div class="columns pb-10">
        <div class="column">
            <filtersingle v-show="filterby[0].name === filter.name" v-for="filter in filtertypes"  :filtertype="filter.type" :filtername="filter.name"></filtersingle>
        </div>
      </div>
    </div>
  </template>
   </transition>
</div>
</template>
<script>
import _ from 'lodash'


import filtersingle from '~/components/filtersingle.vue'
import filters from '~/components/filters'
import search from '~/components/search'
import buttoncounter from '~/components/buttoncounter'
import loadingindicator from '~/components/loadingindicator'
import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  components: {
    filtersingle,
    loadingindicator,
    search,
    filters,
    buttoncounter
  },

  data: function() {
    return {
      filterby: [],
      filterbyset: false,
      filtertypes: [],
      genericData: 'generic component text',
      loadingContent:false


    }
  },
  watch: {
    'filtersstore':function(){
      this.loadingContent=true
    },
    'windowsearch': function(){
      this.loadingContent=false
    },
    'filterbystore': function() {
      if (this.filterbystore === 'search') {
        // this.showfilters=false
        this.filterby = []
      }
    }
  },
  methods: {},
  computed: {
    // filterbyset:function(){
    //   return !_.isEmpty(this.filterby)
    // },
    ...mapGetters({
      tags: "GET_TAGS",
      contenttypes: "GET_CONTENTTYPES",
      filterbystore: "GET_FILTERBY",
      filtersstore: "GET_FILTERS",
      showfilters: "GET_SHOWFILTERSDESKTOP",
      windowsearch: "GET_WINDOWSEARCH",
    }),
  },
  created() {
    if (this.filterbystore) {


      // this.showfilters = true
      if (this.filterbystore === 'tag' || this.filterbystore === 'contenttype') {
        this.filterby = [{
          name: this.filterbystore
        }]
      }
    }
    this.filtertypes = [{
      prettyname: 'Tag',
      name: 'tag',
      type: this.tags
    }, {
      prettyname: 'Type',
      name: 'contenttype',
      type: this.contenttypes
    }]
  }

}
</script>
<style scoped lang="scss">

// .navigation{
//   opacity: 0;
//   transition: opacity 0.25s ease-in-out;
//
// }
// .top-sticky .navigation{
//   opacity: 1
// }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s, max-height .5s ease-in-out;
  overflow: hidden;
  max-height: 300px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  overflow: hidden;
  max-height: 0;
  transition: opacity 0.25s, max-height .3s ease-in-out;
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

.navButtons{
  // opacity: 0;
  transition: opacity 0.25s;

}

.top-sticky{
  .navButtons{
    opacity: 1;
  }
}
</style>
