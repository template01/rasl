<template>
<div class="">
  <div class="columns">
    <div class="column">
      <p class="has-text-centered is-size-3 mb-80">
        selected
      </p>
      <postlist :display="selectedPosts"></postlist>
      <getprint></getprint>

    </div>
  </div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import postlist from '~/components/postlist.vue'
import getprint from '~/components/getprint.vue'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    // genericcomp,
    postlist,
    getprint
  },
  computed: {
    ...mapGetters({
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

    const results = (await axios.all(
      store.state.selected.map(
        function(selectedPostSingle) {
            return axios.get(store.state.apiRoot + '/wp/v2/' + selectedPostSingle.posttype + '/' + selectedPostSingle.postid);
        }
      )
    )).map(result => result.data)

    return { selectedPosts: results }


  },


}
</script>

<style>

</style>
