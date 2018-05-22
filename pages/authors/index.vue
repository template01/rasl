<template>
<div class="">
  <div sticky-container class="columns">
    <div class="column">
      <pageheader title="Authors"></pageheader>
      <div class="pr-40 pl-40">
        <div class="columns ">
          <div class="column">
            <div v-for="(author, index) in raslAuthorsEven" >
              <div class="column">
                <nuxt-link class="is-size-1" :to="'/authors/'+author.slug+windowsearch">
                  <img :src="author.acf.featured_image.sizes.large"/>
                  <p v-html="author.title.rendered"></p>
                </nuxt-link>
              </div>
              <!-- <hr /> -->
            </div>
          </div>
          <div class="column">
            <div v-for="(author, index) in raslAuthorsUneven" >
              <div class="column">
                <nuxt-link class="is-size-1" :to="'/authors/'+author.slug+windowsearch">
                  <img :src="author.acf.featured_image.sizes.large"/>
                  <p v-html="author.title.rendered"></p>
                </nuxt-link>
              </div>
              <!-- <hr /> -->
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
// import genericcomp from '~/components/_genericComp.vue'
import pageheader from '~/components/pageheader.vue'
import _ from 'lodash'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    // genericcomp,
    pageheader,
  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH"
    }),

    raslAuthorsUneven: function() {


      var even = this.raslAuthorsAlpha.filter(function(v, i) {
        return i % 2 == 1;
      });
      return even;
    },
    raslAuthorsEven: function() {
      var uneven = this.raslAuthorsAlpha.filter(function(v, i) {
        return i % 2 == 0;
      });
      return uneven;
    },

    raslAuthorsAlpha: function(){
      // return this.raslAuthors
      const users = [
        { name: 'A', age: 48 },
        { name: 'B', age: 34 },
        { name: 'b', age: 40 },
        { name: 'a', age: 36 }
      ];


      // const sortedUsers = _.orderBy(users, [user => user.name.toLowerCase()], ['asc']);
      // const sortedUsers = _.orderBy(users, [user => this.raslAuthors.acf.surname.toLowerCase()], ['asc']);
      const sortedUsers = _.orderBy(this.raslAuthors, [user => user.acf.surname], ['asc']);
      return sortedUsers;
      // return this.raslAuthors;

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



    function getAuthors() {
      return axios.get(store.state.apiRoot + '/wp/v2/' + 'raslauthor' + '?per_page=100');
      // return axios.get(state.apiRoot + '/swp_api/search?s=' + query.searchquery + '&post_type=reflective&posts_per_page=10');
    }


    function getGeneric() {
      return null
      // return axios.get(store.state.apiRoot + '/wp/v2/practice');
    }



    return axios.all([getAuthors(), getGeneric()])
      .then(axios.spread(function(raslauthors, generic) {
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
          raslAuthors: raslauthors.data
        }

      }));



  },


}
</script>

<style scoped lang="scss">
  hr{
    color: $black;
    margin: 0px !important;
  }
</style>
