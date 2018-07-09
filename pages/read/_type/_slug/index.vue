<template>
<div class="fullHeight white-background">
  <pageheader :selectpost="{'type':postdata.type,'id':postdata.id}" :title="postdata.title.rendered"></pageheader>
  <div class="columns is-marginless pt-60">
    <div class="column">
      <div class=" pr-40 pl-40">
        <div class="columns pb-40 is-marginless">
          <div class="column">
            <!-- <selectpost class="pointer mr-5" :posttype="postdata.type" :postid="postdata.id"></selectpost> -->
            <div class="mt-40 is-size-4">
              <authorlinks :authors="postdata.acf.author"></authorlinks>
              <br />
              Title: {{postdata.title.rendered}}
              <br />
              tags: {{tagSlugs}}
              <br />
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>

        <relatedposts :excludeid="postdata.id" :tags="tagSlugs"></relatedposts>
      </div>


      <!-- <postlistdraggable :display="selectedPosts"></postlistdraggable>
      <getprint></getprint> -->

    </div>

  </div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
// import postlistdraggable from '~/components/print/postlistdraggable.vue'
// import getprint from '~/components/getprint.vue'
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
    tagSlugs: function(){
      if(this.postdata.pure_taxonomies.tags){
        var slugs=[]
        for (var i = 0, len = this.postdata.pure_taxonomies.tags.length; i < len; i++) {
          slugs.push(this.postdata.pure_taxonomies.tags[i].slug)
        }
        return slugs
      }else{
        return []
      }
    }
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
      return axios.get(store.state.apiRoot + '/wp/v2/' + route.params.type + '?slug=' + route.params.slug);
      // return axios.get(state.apiRoot + '/swp_api/search?s=' + query.searchquery + '&post_type=reflective&posts_per_page=10');
    }


    function getGeneric() {
      return null
      // return axios.get(store.state.apiRoot + '/wp/v2/practice');
    }


    function getReflectivePosts() {
      return axios.get(state.apiRoot + '/wp/v2/reflective' + '?filter[' + state.filterby + ']=' + state.filters + '&per_page=10&page=1');
    }

    function getPraticePosts() {
      return axios.get(state.apiRoot + '/wp/v2/practice' + '?filter[' + state.filterby + ']=' + state.filters + '&per_page=10&page=1');
    }

    return axios.all([getPost(), getGeneric()])
      .then(axios.spread(function(post, generic) {
        // commit('SET_FILTERREFLECTIVEBY', reflective.data)
        // commit('SET_FILTERPRATICEBY', practice.data)
        // commit('SET_REFLECTIVETOTALPAGINA',reflective.headers['x-wp-totalpages'])
        // commit('SET_PRATICETOTALPAGINA', practice.headers['x-wp-totalpages'])
        // var url = new URI(window.location.search).removeSearch("filter").removeSearch("filters").removeSearch("search").addSearch({
        //   search: query.searchquery,
        // });
        // window.history.replaceState({}, '', '?' + url._parts.query);
        // commit('SET_WINDOWSEARCH', location.search)

        return {
          postdata: post.data[0]
        }

      }));


  },


}
</script>

<style>

</style>
