<template>
<div class="">

  <div class="columns">
    <div class="column">
      <p class="is-size-4-desktop is-size-6-touch">
        tags
      </p>
      <filtersingle :filtertype="tags" :filtername="'tag'"></filtersingle>
    </div>
    <div class="column">
      <p class="is-size-4-desktop is-size-6-touch">
        types
      </p>
      <filtersingle :filtertype="contenttypes" :filtername="'contenttype'"></filtersingle>
    </div>
    <div class="column">
      <p class="is-size-4-desktop is-size-6-touch">
        search
      </p>
      <search></search>

    </div>
  </div>
</div>
</template>
<script>
import filtersingle from '~/components/filtersingle.vue'
import search from '~/components/search.vue'
// import selected from '~/components/selected.vue'

import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  components: {
    filtersingle,
    search,
    // selected
  },
  data: function() {
    return {
      genericData: 'generic component text',
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      tags: "GET_TAGS",
      contenttypes: "GET_CONTENTTYPES",
    }),
  },

}
</script>
<style scoped lang="scss">

</style>
