<template>
<div class="">

  <div class="columns">
    <div class="column">
      <printlist :footnotes="selectedPostsFootnotes" :display="selectedPosts"></printlist>
    </div>
  </div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import printlist from '~/components/print/printlist.vue'
import footnoteParser from '~/assets/js/footnoteParser.js';

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

    // function footnotesSingleBlock(input) {
    //   const $ = cheerio.load(input)
    //   // var footnoteSelectors = $('.simple-footnote').attr('title')
    //   var footnotesInBlock = []
    //   $('.simple-footnote').each(function(){
    //     const number = $(this).text()
    //     const content = $(this).attr('title')
    //     const returnNote = $(this).attr('id')
    //     footnotesInBlock.push({'number':number,'content':content,'returnnote':returnNote})
    //   })
    //     return footnotesInBlock
    // }
    //
    // function footnotesAll(input) {
    //   var footnotesAll = []
    //   for (var i = 0, len = input.length; i < len; i++) {
    //     footnotesAll.push(footnotesSingleBlock(input[i].content))
    //   }
    //   return footnotesAll
    // }
    //
    // function footnotesAllPosts(input) {
    //   var footnotesAllPosts = []
    //   for (var i = 0, len = input.length; i < len; i++) {
    //     // footnotesAllPosts.push(input[i].acf.contentbuilder)
    //
    //     footnotesAllPosts.push(footnotesAll(input[i].acf.contentbuilder))
    //   }
    //   return footnotesAllPosts
    // }


    const results = (await axios.all(
      store.state.selected.map(
        function(selectedPostSingle) {
            return axios.get(store.state.apiRoot + '/wp/v2/' + selectedPostSingle.posttype + '/' + selectedPostSingle.postid);

        }
      )
    )).map(result => result.data)


    return {
      selectedPosts: results,
      selectedPostsFootnotes: footnoteParser.footnotesAllPosts(results)
    }



  },


}
</script>

<style>


</style>
