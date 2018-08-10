<template>
<div class="">

  <div>
    <!-- {{display}} -->
    <div class="outerprintpost is-size-5" :key="postdata.id" v-for="postdata in display">
      <printpost :postdata="postdata"></printpost>
    </div>
  </div>
</div>
</template>
<script>
import printpost from '~/components/print/printpost'
import {
  mapGetters
} from 'vuex'


export default {
  props: ['display'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  components: {
    printpost
  },
  methods: {},
  // computed: {
  //   ...mapGetters({
  //     featuredPosts: "GET_FEATUREDPOSTS",
  //     reflectivePosts: "GET_REFLECTIVEPOSTS",
  //     practicePosts: "GET_PRATICEPOSTS",
  //   }),
  // },

}
</script>
<style scoped lang="scss">
.outerprintpost:not(:last-child) {
    page-break-after: always;
}
</style>
