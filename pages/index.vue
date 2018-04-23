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
  <div>
    <filters></filters>
    <div class="columns">
      <div class="column">
        <p class="has-text-centered is-size-3 mb-80">
          reflective
        </p>
        <postlist :display="reflectivePosts"></postlist>
        <getmore type="reflective"></getmore>
      </div>
      <div class="column">
        <p class="has-text-centered is-size-3 mb-80">
          pratice
        </p>
        <postlist :display="praticePosts"></postlist>
        <getmore type="pratice"></getmore>
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

<style>

</style>
