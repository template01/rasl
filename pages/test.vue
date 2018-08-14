<template>
<div class="">
  <div class="columns">
    <div class="column">
      <p class="has-text-centered is-size-4-desktop is-size-5-touch mb-80">
        selected
      </p>
      <postlistdraggable :display="selectedPosts"></postlistdraggable>
      <getprint></getprint>

    </div>
  </div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import postlistdraggable from '~/components/print/postlistdraggable.vue'
import getprint from '~/components/getprint.vue'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    // genericcomp,
    postlistdraggable,
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
