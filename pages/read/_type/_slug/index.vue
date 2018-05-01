<template>
<div class="">
  <div sticky-container class="columns">
    <div class="column">
      <pageheader :title="postdata.title.rendered" ></pageheader>
      <div class=" pr-40 pl-40">
        <div class="columns is-marginless">
          <div class="column">
            <selectpost class="pointer mr-5" :posttype="postdata.type" :postid="postdata.id"></selectpost>
            {{postdata}} {{postdata}} {{postdata}} {{postdata}} {{postdata}} {{postdata}} {{postdata}}
            <br />
            <br />
          </div>
        </div>

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
import pageheader from '~/components/pageheader.vue'


import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    buttoncounter,
    selectpost,
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
    //
    // return axios.get(`https://my-api/posts/${params.id}`)
    //   .then((res) => {
    //     return {
    //       title: res.data.title
    //     }
    //   })

    // const results = (await axios.all(
    //   store.state.selected.map(
    //     function(selectedPostSingle) {
    //         return axios.get(store.state.apiRoot + '/wp/v2/' + selectedPostSingle.posttype + '/' + selectedPostSingle.postid);
    //     }
    //   )
    // )).map(result => result.data)
    //
    // return { selectedPosts: results }


  },


}
</script>

<style>

</style>
