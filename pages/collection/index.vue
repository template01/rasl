<template>
<div class="">
  <div sticky-container class="columns">
    <div class="column">
      <pageheader title="Collection"></pageheader>

      <div class="pr-40 pl-40 pullUp40">
        <div class="columns">
          <div class="column  is-6 has-border-right">
            <p class="is-size-1 pb-20">
              Collection
            </p>
            <div class="pb-20">
              <p class="is-size-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div>
              <p class="is-size-1">
                Details
              </p>
              <code>
                {{selectedPosts}}
              </code>
            </div>
          </div>

          <div class="column is-6 ignore-pt">
            <postlistdraggable :display="selectedPosts"></postlistdraggable>
            <getprint></getprint>
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
import postlistdraggable from '~/components/print/postlistdraggable.vue'
import pageheader from '~/components/pageheader.vue'
import getprint from '~/components/getprint.vue'

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
.pullUp40{
  margin-top: -38px;
}
.ignore-pt{
  padding-top: 0px !important;
}
</style>
