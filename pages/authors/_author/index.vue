<template>
<div class="white-background">
  <pageheader  :pagename="'Author'"></pageheader>

  <div class="columns is-marginless  pt-60">
    <div class="column">

      <div class="" :class="$mq != 'lg' ? 'pt-40':' pr-40 pl-40'">
        <div class="columns pb-40 is-marginless">
          <div class="">
            <div class="mt-40">
              <h1 class="huge-letters pb-80" v-html="authorData.title.rendered"></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="columns is-marginless">
    <div class="pr-40 pb-40  pl-40">
      <div class="column is-12">
        <div class="is-size-3-desktop is-size-6-touch" v-html="authorData.acf.bio">
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <relatedItem v-for="item in articlesWrittenByAuthorMerged" :itemcontent="item"></relatedItem>
  </div>

</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import pageheader from '~/components/pageheader.vue'
import selectpost from '~/components/selectpost'
import relatedItem from '~/components/read/relatedItem'
import _ from 'lodash'


import axios from 'axios'
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    pageheader,
    selectpost,
    relatedItem
  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH"
    }),
    articlesWrittenByAuthorMerged: function() {
      const concatinated = _.concat(this.practiceArticlesWrittenByAuthor, this.reflectiveArticlesWrittenByAuthor);
      return _.orderBy(concatinated, ['date'], ['desc']);

    },
    articlesWrittenByAuthorChunck: function() {
      // Object.defineProperty(Array.prototype, 'chunk_inefficient', {
      //     value: function(chunkSize) {
      //         var array=this;
      //         return [].concat.apply([],
      //             array.map(function(elem,i) {
      //                 return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
      //             })
      //         );
      //     }
      // });
      // return [1,2,3,4,5,6,7,8,9,10,11,12,13].chunk_inefficient(3)
      // return splitIntoSubArray(this.articlesWrittenByAuthor, 3)
      var divisionRatio = Math.ceil(this.articlesWrittenByAuthor.length / 3)
      var firstColumn = this.articlesWrittenByAuthor.slice(0, divisionRatio)
      var secondColumn = this.articlesWrittenByAuthor.slice(divisionRatio, divisionRatio + divisionRatio)
      var thirdColumn = this.articlesWrittenByAuthor.slice(divisionRatio + divisionRatio, this.articlesWrittenByAuthor.length)
      return [firstColumn, secondColumn, thirdColumn]
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
    const res = await axios.get(store.state.apiRoot + '/wp/v2/raslauthor' + '?slug=' + route.params.author);
    const authorData = res.data

    const reflectiveResults = (await axios.all(
        authorData.map(category => axios.get(store.state.apiRoot + `/wp/v2/reflective?raslauthor=${category.id}`))
      ))
      .map(result => result.data)
      .reduce((acc, curr) => {
        acc.push(...curr)
        return acc
      }, [])

    const practiceResults = (await axios.all(
        authorData.map(category => axios.get(store.state.apiRoot + `/wp/v2/practice?raslauthor=${category.id}`))
      ))
      .map(result => result.data)
      .reduce((acc, curr) => {
        acc.push(...curr)
        return acc
      }, [])


    return {
      authorData: authorData[0],
      reflectiveArticlesWrittenByAuthor: reflectiveResults,
      practiceArticlesWrittenByAuthor: practiceResults
      // articlesWrittenByAuthor: [1,2,3,4]

    }
  }



}
</script>

<style lang="scss" scoped>
hr {
    color: $black;
    margin: 0;
}
</style>
