<template>
<div class="">
  <div sticky-container class="columns">
    <div class="column">
      <pageheader title="Author Page"></pageheader>
      <div class="pr-40 pl-40">
        <div class="columns pt-80">
          <div class="column is-6">
            <p class="is-size-4" v-html="authorData.title.rendered">
            </p>
            <p class="is-size-4" v-html="authorData.acf.bio">
            </p>
          </div>
          <div class="column is-6">
            <p v-for="article in articlesWrittenByAuthor">
            <nuxt-link :to="'/read/'+ article.type +'/'+ article.slug" v-html="article.title.rendered"></nuxt-link>
            </p>
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
import pageheader from '~/components/pageheader.vue'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    pageheader,
  },
  computed: {
    ...mapGetters({}),
  },



  async asyncData({    params,
      query,
      error,
      store,
      route,
      redirect}) {
    const res = await axios.get(store.state.apiRoot + '/wp/v2/raslauthor' + '?slug=' + route.params.author);
    const authorData = res.data

    const results = (await axios.all(
        authorData.map(category => axios.get(`http://194.61.64.171/backend/index.php/wp-json/wp/v2/reflective?raslauthor=${category.id}`))
      ))
      .map(result => result.data)
      .reduce((acc, curr) => {
        acc.push(...curr)
        return acc
      }, [])

    console.log(results)
    return {
      authorData: authorData[0],
      articlesWrittenByAuthor: results
    }
  }

  // async asyncData({
  //   params,
  //   query,
  //   error,
  //   store,
  //   route,
  //   redirect
  // }) {
  //
  //   console.log(route.params)
  //
  //
  //   function getPost() {
  //     return axios.get(store.state.apiRoot + '/wp/v2/raslauthor' + '?slug=' + route.params.author);
  //     // return axios.get(state.apiRoot + '/swp_api/search?s=' + query.searchquery + '&post_type=reflective&posts_per_page=10');
  //   }
  //
  //
  //   function getGeneric() {
  //     return null
  //     // return axios.get(store.state.apiRoot + '/wp/v2/practice');
  //   }
  //
  //
  //   function getAuthorReflectivePosts(id) {
  //     return axios.get(state.apiRoot + '/wp/v2/reflective' + 'raslauthor=' + id + '&per_page=10&page=1');
  //   }
  //
  //   function getAuthorPraticePosts(id) {
  //     return axios.get(state.apiRoot + '/wp/v2/practice' + 'raslauthor=' + id + '&per_page=10&page=1');
  //   }
  //
  //   return axios.all([getPost(), getGeneric()])
  //     .then(axios.spread(function(post, generic) {
  //       // getPraticePosts()
  //       getAuthorPraticePosts(post.data[0].id)
  //       getAuthorReflectivePosts(post.data[0].id)
  //       // commit('SET_FILTERREFLECTIVEBY', reflective.data)
  //       // commit('SET_FILTERPRATICEBY', practice.data)
  //       // commit('SET_REFLECTIVETOTALPAGINA',reflective.headers['x-wp-totalpages'])
  //       // commit('SET_PRATICETOTALPAGINA', practice.headers['x-wp-totalpages'])
  //       // var url = new URI(window.location.search).removeSearch("filter").removeSearch("filters").removeSearch("search").addSearch({
  //       //   search: query.searchquery,
  //       // });
  //       // window.history.replaceState({}, '', '?' + url._parts.query);
  //       // commit('SET_WINDOWSEARCH', location.search)
  //
  //       return {
  //         postdata: post.data[0]
  //       }
  //
  //     }));
  //
  //
  // },


}
</script>

<style>

</style>
