<template>
<div class="printpost">
      <p class="is-size-1" v-html="postdata.title.rendered">
      </p>
      <p class="is-size-3" v-html="postdata.type">
      </p>
      <!-- {{postdata}} -->
      <div class="inner-content">
        <readcontent :printversion="true" :contentlayout="postdata.acf.layout_picker" :content="postdata.acf.content"></readcontent>
      </div>

</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import selectpost from '~/components/selectpost'
import readcontent from '~/components/read/readcontent'


export default {
  props: ['postdata'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  methods: {},
  components:{
    selectpost,
    readcontent
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
    max-width: 12cm;
    text-align: left;
  }
}
</style>
