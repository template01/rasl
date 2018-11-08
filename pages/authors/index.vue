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
    <div class="columns is-marginless" v-for="(author, index) in raslAuthorsAlpha">

      <div class="column is-12 pr-40 pl-40 ">
        <authorListSingle :slug="author.slug" :id="author.id" :title="author.title.rendered"></authorListSingle>
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

      const sortedUsers = _.orderBy(this.raslAuthors, [user => user.acf.surname], ['asc']);
      return sortedUsers;

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
