<template>
<div class="fullHeight white-background">
  <pageheader title="Collection"></pageheader>
  <div class="columns is-marginless  pt-60">
    <div class="column">

      <div class="pr-40 pl-40">
        <div class="columns pb-40 is-marginless">
          <div class="">
            <div class="mt-40">
              <h1 class="huge-letters pb-80">Print Collection</h1>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="columns">
        <div class="column  is-6 has-border-right">
          <p class="is-size-1-desktop is-size-2-touch-desktop is-size-2-touch pb-20">

          </p>
          <div class="pb-20">
            <p class="is-size-4-desktop is-size-5-touch">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div>
            <p class="is-size-1-desktop is-size-2-touch-desktop is-size-2-touch">
              Tags:
              <br />
              <span v-for="tag in detailsTags" v-html="' '+ tag.name"></span>
            </p>

          </div>
        </div>

        <div class="column is-6 ignore-pt">
          <postlistdraggable :display="selectedPosts"></postlistdraggable>
          <getprint></getprint>
        </div>
      </div> -->
    </div>

  </div>
  <div class="columns is-marginless pb-80">
      <div class="column is-offset-3 is-6 ignore-pt">
        <!-- <hr /> -->
        <postlistdraggable :display="selectedPosts"></postlistdraggable>
        <hr />
        <getprint v-if="$store.state.selected.length>0"></getprint>
        <!-- <hr v-if="$store.state.selected.length>0"/> -->

      </div>
  </div>
</div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import postlistdraggable from '~/components/print/postlistdraggable.vue'
import pageheader from '~/components/pageheader.vue'
import getprint from '~/components/getprint.vue'
import _ from 'lodash'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    // genericcomp,
    postlistdraggable,
    pageheader,
    getprint
  },
  computed: {
    ...mapGetters({}),
    detailsTags: function() {
      var tagsNice = []
      for (var i = 0, len = this.selectedPosts.length; i < len; i++) {
        console.log(this.selectedPosts[i].pure_taxonomies)
        if (this.selectedPosts[i].pure_taxonomies.tags != null) {
          tagsNice.push(this.selectedPosts[i].pure_taxonomies.tags)
        }
      }
      var arrayOfObjAfter = _.map(
        _.uniq(
          _.map(_.flatten(tagsNice), function(obj) {
            return JSON.stringify(obj);
          })
        ),
        function(obj) {
          return JSON.parse(obj);
        }
      );
      return arrayOfObjAfter
    },
    detailsContentTypes: function() {
      var contentTypesNice = []
      for (var i = 0, len = this.selectedPosts.length; i < len; i++) {
        console.log(this.selectedPosts[i].pure_taxonomies)
        if (this.selectedPosts[i].pure_taxonomies.contenttype != null) {
          contentTypesNice.push(this.selectedPosts[i].pure_taxonomies.contenttype)
        }
      }
      var arrayOfObjAfter = _.map(
        _.uniq(
          _.map(_.flatten(contentTypesNice), function(obj) {
            return JSON.stringify(obj);
          })
        ),
        function(obj) {
          return JSON.parse(obj);
        }
      );
      return arrayOfObjAfter
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

    const results = (await axios.all(
      store.state.selected.map(
        function(selectedPostSingle) {
          return axios.get(store.state.apiRoot + '/wp/v2/' + selectedPostSingle.posttype + '/' + selectedPostSingle.postid);
        }
      )
    )).map(result => result.data)

    return {
      selectedPosts: results
    }


  },


}
</script>

<style lang="scss" scoped>
.pullUp40 {
    margin-top: -38px;
}
.ignore-pt {
    padding-top: 0 !important;
}
hr{
  margin:  0 !important;
}
</style>
