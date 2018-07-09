<template>
<div class="white-background fullHeight">
  <pageheader></pageheader>
  <div  class="columns is-marginless pt-60">
    <div class="column">
      <div class="pr-40 pl-40">
        <div class="columns">
          <div class="column is-6">
            <img :src="authorData.acf.featured_image.sizes.large" />
            <p class="is-size-1" v-html="authorData.title.rendered">
            </p>
          </div>
          <div class="column is-6">
            <div class="is-size-1" v-html="authorData.acf.bio">
            </div>

          </div>
        </div>

        <hr />
        <div class="columns is-marginless">
          <div class="column">
            <p class="is-size-4  has-text-centered ">
              Articles by author
            </p>
          </div>

        </div>
        <hr />

        <div class="columns pt-10">

          <!-- <div class="columns"> -->
            <!-- <hr />
            <p v-for="article in articlesWrittenByAuthor">
              <nuxt-link :to="'/read/'+ article.type +'/'+ article.slug" v-html="article.title.rendered"></nuxt-link>
            </p> -->

            <div v-for="(chunk,index) in articlesWrittenByAuthorChunck" class="column"  v-if="chunk.length>0">
              <div v-for="article in chunk" class="column">
                <div class="columns ignore-mb">
                  <div class="column">
                    <selectpost class="pointer  is-pulled-left mr-5" :posttype="article.type" :postid="article.id"></selectpost>
                    <nuxt-link class=" is-pulled-left mr-5 hover-animate-chilren-right" :to="'/read/'+article.type+'/'+article.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <p class="is-size-4  mr-10" style="text-transform:capitalize" v-html="article.title.rendered">
                    </p>
                  </div>
                </div>
              </div>

            </div>


          <!-- </div> -->

        </div>
      </div>


    </div>

  </div>

</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import pageheader from '~/components/pageheader.vue'
import selectpost from '~/components/selectpost'
import _ from 'lodash'


import axios from 'axios'
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    pageheader,
    selectpost
  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH"
    }),
    articlesWrittenByAuthorChunck: function(){
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
      var divisionRatio = Math.ceil(this.articlesWrittenByAuthor.length/3)
      var firstColumn = this.articlesWrittenByAuthor.slice(0,divisionRatio)
      var secondColumn = this.articlesWrittenByAuthor.slice(divisionRatio,divisionRatio+divisionRatio)
      var thirdColumn = this.articlesWrittenByAuthor.slice(divisionRatio+divisionRatio,this.articlesWrittenByAuthor.length)
      return [firstColumn,secondColumn,thirdColumn]
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

    const results = (await axios.all(
        authorData.map(category => axios.get(`http://194.61.64.171/backend/index.php/wp-json/wp/v2/reflective?raslauthor=${category.id}`))
      ))
      .map(result => result.data)
      .reduce((acc, curr) => {
        acc.push(...curr)
        return acc
      }, [])

    console.log(results)
    return {
      authorData: authorData[0],
      articlesWrittenByAuthor: results
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
