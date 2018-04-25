<template>
<div class="">
  <!-- <nuxt-link :to="'collection'+windowsearch">collection</nuxt-link> -->
  <div class="columns">
    <div class="column">
      <p class="has-text-centered is-size-4 mb-80">
        featured
      </p>
      <postlist :display="featuredPosts"></postlist>


    </div>
  </div>
  <div class="library pt-40">
    <div class="pl-40 pr-40 ">
      <librarynav></librarynav>
    </div>
    <div class="pl-40 pr-40">
      <hr class="m-0" />
      <div class="columns is-marginless">
        <div class="column is-marginless green-background">
          <p class="has-text-centered is-size-4">
            reflective
          </p>
        </div>
        <div class="column is-marginless pink-background">
          <p class="has-text-centered is-size-4">
            pratice
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
              <li class="is-size-4" :key="postdata.id" v-for="postdata in praticePosts">
                <postindex :left="false" :postdata="postdata"></postindex>
              </li>
            </ul>

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
import postindex from '~/components/postIndex'
import getmore from '~/components/getmore.vue'
import librarynav from '~/components/librarynav.vue'

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
    librarynav
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

<style lang="scss">
.library {
    hr {
        background: $black !important;
        height: 2px;
        border-radius: 2px;
        opacity: 0.8;
    }

    .options-wrapper {
        position: absolute;
        right: 0;
        height: 100%;
    }



    background: linear-gradient(to right, $green 50%,$pink 50%);
}
</style>
