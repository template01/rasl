<template>
<div class="white-background fullHeight">
  <pageheader :pagename="'Authors'"></pageheader>
  <div class="columns is-marginless  pt-60">
    <div class="column">

      <div class="" :class="$mq != 'lg' ? 'pt-40':' pr-40 pl-40'">
        <div class="columns pb-40 is-marginless">
          <div class="">
            <div class="mt-40">
              <h1 class="huge-letters pb-80">Authors</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pb-80">
    <div class="columns is-marginless" v-for="(author, index) in raslAuthors">

      <div class="column is-12 pr-40 pl-40 ">
        <authorListSingle :slug="author.slug" :id="author.id" :title="author.title.rendered"></authorListSingle>
        <!-- <nuxt-link class="" :to="'/authors/'+author.slug+windowsearch">
          <p class="is-size-3-desktop is-size-5-touch has-text-centered" v-html="author.title.rendered">

          </p>
          {{getArticles(author.id)}}
        </nuxt-link> -->
        <!-- <div class="column">
            <div v-for="(author, index) in raslAuthorsEven">
              <div class="column">
                  <img :src="author.acf.featured_image.sizes.large" />
                  <p v-html="author.title.rendered"></p>
              </div>
            </div>
          </div>
          <div class="column">
            <div v-for="(author, index) in raslAuthorsUneven">
              <div class="column">
                <nuxt-link class="is-size-1-desktop is-size-2-touch-desktop is-size-2-touch" :to="'/authors/'+author.slug+windowsearch">
                  <img :src="author.acf.featured_image.sizes.large" />
                  <p v-html="author.title.rendered"></p>
                </nuxt-link>
              </div>
            </div> -->
        <!-- </div> -->
      </div>
    </div>

  </div>

</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import pageheader from '~/components/pageheader.vue'
import authorListSingle from '~/components/authorListSingle.vue'
import _ from 'lodash'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    // genericcomp,
    pageheader,
    authorListSingle
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

    raslAuthorsAlpha: function() {
      // return this.raslAuthors
      const users = [{
          name: 'A',
          age: 48
        },
        {
          name: 'B',
          age: 34
        },
        {
          name: 'b',
          age: 40
        },
        {
          name: 'a',
          age: 36
        }
      ];


      // const sortedUsers = _.orderBy(users, [user => user.name.toLowerCase()], ['asc']);
      // const sortedUsers = _.orderBy(users, [user => this.raslAuthors.acf.surname.toLowerCase()], ['asc']);
      const sortedUsers = _.orderBy(this.raslAuthors, [user => user.acf.surname], ['asc']);
      return sortedUsers;
      // return this.raslAuthors;

    }
  },

  methods: {

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
hr {
    color: $black;
    margin: 0 !important;
}
</style>
