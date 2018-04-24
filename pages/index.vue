<template>
<div class="">
  <nuxt-link :to="'collection'+windowsearch">collection</nuxt-link>
  <div class="columns">
    <div class="column">
      <p class="has-text-centered is-size-3 mb-80">
        featured
      </p>
      <postlist :display="featuredPosts"></postlist>


    </div>
  </div>
  <div class="library pt-40">
    <div class="pl-40 pr-40 librarynav">
      <hr class="m-0" />
      <div class="columns is-marginless">
        <div class="column is-8 is-offset-2 ">
          <p class="has-text-centered is-size-3">
            Library
          </p>
        </div>
        <div class="column is-2 ">
          <p class="has-text-right is-size-3">
            <img class="rasl-icon mr-10" :src="'icons/rasl_folder.svg'" />
            <img class="rasl-icon" :src="'icons/rasl_filter.svg'" />
            <!-- <div>
              <div class="options-wrapper">
              </div>
            </div> -->


          </p>
        </div>
      </div>
      <hr class="m-0" />
      <div>
        <filters></filters>
      </div>
    </div>


    <div class="pl-40 pr-40">
      <hr class="m-0" />
      <div class="columns is-marginless">
        <div class="column is-marginless green-background">
          <p class="has-text-centered is-size-3">
            reflective
          </p>
        </div>
        <div class="column is-marginless pink-background">
          <p class="has-text-centered is-size-3">
            pratice
          </p>
        </div>
      </div>
      <hr class="m-0" />
    </div>

    <div class="pl-40 pr-40">
      <div class="columns ">
        <div class="column is-paddingless">
          <div class="green-background p-40">
            <postlist :display="reflectivePosts"></postlist>
            <getmore type="reflective"></getmore>
          </div>
        </div>
        <div class="column is-paddingless">
          <div class="pink-background p-40">
            <postlist :display="praticePosts"></postlist>
            <getmore type="pratice"></getmore>
          </div>
        </div>
      </div>
    </div>

  </div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import filters from '~/components/filters.vue'
import postlist from '~/components/postlist.vue'
import getmore from '~/components/getmore.vue'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    // genericcomp,
    filters,
    getmore,
    postlist
  },
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
      featuredPosts: "GET_FEATUREDPOSTS",
      reflectivePosts: "GET_REFLECTIVEPOSTS",
      praticePosts: "GET_PRATICEPOSTS",
      windowsearch: "GET_WINDOWSEARCH"
    }),
  },
  //
  // mounted(){
  //   window.history.replaceState({}, '', this.$store.state.windowsearch.replace(/^\/+/g, ''));
  // },


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

<style lang="scss" scoped>
.library {
    hr {
        background: $black;
        height: 2px;
        border-radius: 2px;
        opacity: 0.8;
    }

    .options-wrapper {
        position: absolute;
        right: 0;
        height: 100%;
    }

    // .librarynav{
    //   background-image: -webkit-gradient( linear, left top, right top, color-stop(0, $white), color-stop(0.5, $white),color-stop(0.5, $white));
    //   background-image: gradient( linear, left top, right top, color-stop(0, $white), color-stop(0.5, $white),color-stop(0.5, $white));
    //   color:transparent;
    //   -webkit-background-clip: text;
    //   background-clip: text;
    // }

    background: linear-gradient(to right, $green 50%,$pink 50%);
}
</style>
