<template>
<div class="readArticle">

  <div :class="[postdata.type === 'practice' ? 'pink-background':'', postdata.type === 'reflective' ? 'green-background':'', postdata.type === 'general' ? 'white-background':'']">
    <pageheader :pagename="postdata.type"  :selectpost="{'type':postdata.type,'id':postdata.id}" :title="postdata.title.rendered"></pageheader>

    <div class="columns is-marginless pt-60" lang="en">
      <div class="column is-marginless">
        <div class="" :class="$mq != 'lg' ? 'pt-40':' pr-40 pl-40'">
          <div class="columns pb-40 is-marginless">
            <div :class="[postdata.type === 'practice' ? 'has-text-danger':'', postdata.type === 'reflective' ? 'has-text-info':'', postdata.type === 'general' ? '':'']">
              <div class="mt-40">
                <h1  class="hyphenate huge-letters pb-40" v-html="postdata.title.rendered"></h1>
                <div v-if="postdata.acf.subtitle" class=" is-size-1-desktop is-size-4-touch pb-80">
                  <p v-html="postdata.acf.subtitle">
                  </p>
                </div>
                <div v-show="postdata.acf.author" class="pt-80 is-size-2-desktop is-size-6-touch">
                  <span>By</span>
                  <authorlinks :authors="postdata.acf.author"></authorlinks>
                </div>
                  <div class="pt-20 is-size-3-desktop is-size-6-touch" v-if="postdata.pure_taxonomies">
                    <span v-for="(item,index) in postdata.pure_taxonomies.tags">
                    {{item.name}}
                    {{index< postdata.pure_taxonomies.tags.length-1 ? '●':''}}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
  <div class="pb-40 white-background">

    <div class=" is-marginless ">
      <readcontent :type="postdata.type" :footnotes="footnotes" :references="postdata.acf.references" :content="postdata.acf.contentbuilder"></readcontent>
    </div>

  </div>
  <relatedposts :excludeid="postdata.id" :tags="tagSlugs"></relatedposts>

</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
// import postlistdraggable from '~/components/print/postlistdraggable.vue'
// import getprint from '~/components/getprint.vue'

import readcontent from '~/components/read/readcontent'
import buttoncounter from '~/components/buttoncounter'
import selectpost from '~/components/selectpost'
import authorlinks from '~/components/authorLinks'
import relatedposts from '~/components/read/relatedposts.vue'
import pageheader from '~/components/pageheader.vue'
import _ from 'lodash'
import axios from 'axios'
import {
  mapGetters
} from 'vuex'
// import footnoteParser from '~/assets/js/footnoteParser.js';

export default {
  components: {
    buttoncounter,
    readcontent,
    selectpost,
    authorlinks,
    relatedposts,
    pageheader
    // genericcomp,
    // postlistdraggable,
    // getprint
  },

  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH"
    }),
    tagSlugs: function() {
      if (this.postdata.pure_taxonomies.tags) {
        var slugs = []
        for (var i = 0, len = this.postdata.pure_taxonomies.tags.length; i < len; i++) {
          slugs.push(this.postdata.pure_taxonomies.tags[i].slug)
        }
        return slugs
      } else {
        return []
      }
    }
  },
  mounted(){
    this.$store.commit('SET_READINGID',this.postdata.id)
    Hyphenator.config({
        minwordlength : 6,
        leftmin: 5,
        rightmin: 5
    });
    Hyphenator.run();


  },

  async asyncData({
    params,
    query,
    error,
    store,
    route,
    redirect,
    app
  }) {

    console.log(app)



    function getPost() {
      return axios.get(store.state.apiRoot + '/wp/v2/' + route.params.type + '?slug=' + route.params.slug);
      // return axios.get(state.apiRoot + '/swp_api/search?s=' + query.searchquery + '&post_type=reflective&posts_per_page=10');
    }


    function getGeneric() {
      return null
      // return axios.get(store.state.apiRoot + '/wp/v2/practice');
    }


    function getReflectivePosts() {
      return axios.get(state.apiRoot + '/wp/v2/reflective' + '?filter[' + state.filterby + ']=' + state.filters + '&per_page=10&page=1');
    }

    function getPraticePosts() {
      return axios.get(state.apiRoot + '/wp/v2/practice' + '?filter[' + state.filterby + ']=' + state.filters + '&per_page=10&page=1');
    }

    var vm = this
    return axios.all([getPost(), getGeneric()])
      .then(axios.spread(function(post, generic) {
        // console.log(app)
        app.myInjectedFunction('async')

        return {
          postdata: post.data[0],
          footnotes:  app.footnotesAll(post.data[0].acf.contentbuilder)
        }

      }));


  },


}
</script>

<style>

</style>
