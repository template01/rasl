<template>
<div class="">

  <div class="columns">
    <div class="column">
      <printlist :display="selectedPosts"></printlist>
    </div>
  </div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import printlist from '~/components/printlist.vue'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  layout: 'print',
  components: {
    printlist
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
