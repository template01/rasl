<template>
<div class="">
  <div class="columns">
    <div class="column">
      <postlistcomp :display="featuredPosts"></postlistcomp>


    </div>
  </div>
  <div>
    <filters></filters>
    <div class="columns">
      <div class="column">
        <postlistcomp :display="reflectivePosts"></postlistcomp>
      </div>
      <div class="column">
        <postlistcomp :display="praticePosts"></postlistcomp>
      </div>
    </div>
  </div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import filters from '~/components/filters.vue'
import postlistcomp from '~/components/postListComp.vue'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    // genericcomp,
    filters,
    postlistcomp
  },
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
      featuredPosts: "GET_FEATUREDPOSTS",
      reflectivePosts: "GET_REFLECTIVEPOSTS",
      praticePosts: "GET_PRATICEPOSTS",
    }),
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

<style>

</style>
