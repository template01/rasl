<template>
<div class="">
  <!-- <nuxt-link :to="'collection'+windowsearch">collection</nuxt-link> -->
  <div sticky-container class="columns">
    <div class="column">
      <indexheader></indexheader>
      <div class="pl-40 pr-40">
        <div class="columns">
        <postlist  :display="featuredPosts"></postlist>
      </div>
      </div>
    </div>
  </div>
  <div>


    <div sticky-container class="pt-40" id="library">
      <div class=" pl-40 pr-40 ">
        <hr class="m-0" />
      </div>
      <div v-sticky sticky-offset="0" sticky-side="top" class="librarynavwrapper pl-40 pr-40 ">
        <librarynav></librarynav>
        <hr class="m-0" />
      </div>
      <div class="pl-40 pr-40">
        <div class="columns is-marginless">
          <div class="column is-marginless green-background">
            <p class="has-text-centered is-size-4">
              reflective
            </p>
          </div>
          <div class="column is-marginless pink-background">
            <p class="has-text-centered is-size-4">
              practice
            </p>
          </div>
        </div>
        <hr class="m-0" />
      </div>

      <div class="pl-40 pr-40">
        <div class="columns is-marginless">
          <div class="column is-marginless is-paddingless green-background">
            <div class="green-background ">
              <ul>
                <li class="is-size-4" :key="postdata.id" v-for="postdata in reflectivePosts">
                  <postindex :left="true" :postdata="postdata"></postindex>
                </li>
              </ul>

              <getmore type="reflective"></getmore>
            </div>
          </div>
          <div class="column is-marginless is-paddingless pink-background">
            <div class="pink-background ">
              <ul>
                <li class="is-size-4" :key="postdata.id" v-for="postdata in practicePosts">
                  <postindex :left="false" :postdata="postdata"></postindex>
                </li>
              </ul>

              <getmore type="practice"></getmore>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>


</div>
</div>
</template>

<script>
// if (process.browser) {
// import Sticky from 'vue-sticky-directive'
// };
// var URI = require('urijs');


if (process.browser) {
  var Sticky = require('vue-sticky-directive')
}

// import genericcomp from '~/components/_genericComp.vue'
import filters from '~/components/filters.vue'
import postlist from '~/components/postlist.vue'
import postindex from '~/components/postIndex'
import getmore from '~/components/getmore.vue'
import librarynav from '~/components/librarynav.vue'
import indexheader from '~/components/indexheader.vue'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    // genericcomp,
    filters,
    getmore,
    postlist,
    postindex,
    librarynav,
    indexheader
  },
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
      featuredPosts: "GET_FEATUREDPOSTS",
      reflectivePosts: "GET_REFLECTIVEPOSTS",
      practicePosts: "GET_PRATICEPOSTS",
      windowsearch: "GET_WINDOWSEARCH"
    }),
  },
  directives: {
    Sticky
  },

  //
  mounted() {


  },


  async asyncData({
    params,
    query,
    error,
    store,
    route,
    redirect
  }) {


    // GET POSTS START
    // if (store.state.posts.length == 0) {
    //   const postsRes = await axios.get(store.state.apiRoot + '/posts')
    //   store.commit('SET_POSTS', postsRes.data)
    // }

    // RETURN DATA DIRECTLY
    // return { title: 'blah blah blah' }


  },


}
</script>

<style lang="scss">
#library {

    .options-wrapper {
        position: absolute;
        right: 0;
        height: 100%;
    }

    background: linear-gradient(to right, $green 50%,$pink 50%);

    .librarynavwrapper {
        background: linear-gradient(to right, $green 50%,$pink 50%);

    }
}
</style>
