<template>
<div class="printpost">
      <p class="is-size-1" v-html="postdata.title.rendered">
      </p>
      <p class="is-size-3" v-html="postdata.type">
      </p>
      <!-- {{postdata}} -->
      <div class="inner-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import selectpost from '~/components/selectpost'


export default {
  props: ['postdata'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  methods: {},
  components:{
    selectpost
  }
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
.printpost{
  // page-break-after: always;
  .inner-content{
    padding-top: 1cm;
    margin: 0 auto;
    max-width: 10cm;
    text-align: left;
  }
}
</style>
