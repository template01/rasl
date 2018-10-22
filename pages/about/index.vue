<template>
<div class="readArticle">

  <div  class="white-background">
    <pageheader :pagename="'about'"  ></pageheader>

    <div class="columns is-marginless pt-60" lang="en">
      <div class="column is-marginless">
        <div class="" :class="$mq != 'lg' ? 'pt-40':' pr-40 pl-40'">
          <div class="columns pb-40 is-marginless">
            <div>
              <div class="mt-40">
                <h1  class="hyphenate huge-letters pb-40" v-html="postdata.title.rendered"></h1>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
  <div class="pb-40 pt-40 white-background">
    <div class=" is-marginless ">
      <readcontent :type="'about'" :content="postdata.acf.contentbuilder"></readcontent>
    </div>

  </div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
// import postlistdraggable from '~/components/print/postlistdraggable.vue'
// import getprint from '~/components/getprint.vue'
import readcontent from '~/components/read/readcontent'
import buttoncounter from '~/components/buttoncounter'
import selectpost from '~/components/selectpost'
import authorlinks from '~/components/authorLinks'
import relatedposts from '~/components/read/relatedposts.vue'
import pageheader from '~/components/pageheader.vue'
import _ from 'lodash'
import axios from 'axios'
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    buttoncounter,
    readcontent,
    selectpost,
    authorlinks,
    relatedposts,
    pageheader
    // genericcomp,
    // postlistdraggable,
    // getprint
  },

  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH"
    }),

  },
  mounted(){
  },

  async asyncData({
    params,
    query,
    error,
    store,
    route,
    redirect
  }) {


    function getPost() {
      return axios.get(store.state.apiRoot + '/wp/v2/' + 'pages' + '?slug=' + route.name);
      // return axios.get(state.apiRoot + '/swp_api/search?s=' + query.searchquery + '&post_type=reflective&posts_per_page=10');
    }


    function getGeneric() {
      return null
      // return axios.get(store.state.apiRoot + '/wp/v2/practice');
    }


    return axios.all([getPost()])
      .then(axios.spread(function(post, generic) {
        return {
          postdata: post.data[0],
        }

      }));


  },


}
</script>

<style>

</style>
