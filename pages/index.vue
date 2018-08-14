<template>
<div class="fullHeight">
  <!-- <nuxt-link :to="'collection'+windowsearch">collection</nuxt-link> -->

  <div>
    <!-- <div sticky-container> -->
    <pageheader></pageheader>
        <indexintro v-once></indexintro>
      <div class="" style="display:flex; margin-bottom:0;margin-top:0;">

        <postlistfeatured :displaydata="featuredPosts"></postlistfeatured>

        <!-- <div class="pl-40 pr-40">
        <div class="columns ">
          <div class="column">
            <postlist :featured="true" :display="featuredPostsUneven"></postlist>
          </div>
          <div class="column mt-40">
            <div class="mt-80 ">
              <postlist :featured="true" :display="featuredPostsEven"></postlist>
            </div>
          </div>
        </div>
      </div> -->
      </div>

  </div>
  <div>
    <div sticky-container class="pt-40" :class="$mq != 'lg' ? 'white-background':''" id="library">
      <div class="backgroundBlockI is-hidden-touch" :style="getBackgroundStyleI">
      </div>
      <div class="backgroundBlockII is-hidden-touch" :style="getBackgroundStyleII">
      </div>

      <div class=" pl-40 pr-40 ">
        <h1 class="huge-letters uppercase ">Library</h1>
      </div>
      <!-- <div class=" pl-40 pr-40 ">
        <hr class="m-0" />
      </div> -->
      <div v-sticky sticky-offset="0" sticky-side="top" class="librarynavwrapper pl-40 pr-40 "  :class="$mq != 'lg' ? 'white-background':''">
        <librarynav class="pt-20"></librarynav>
        <hr class="m-0" />
        <div class="backgroundBlockI is-hidden-touch" :style="getBackgroundStyleI">
        </div>
        <div class="backgroundBlockII is-hidden-touch" :style="getBackgroundStyleII">
        </div>
      </div>
      <div class="pl-40 pr-40 is-hidden-touch">
        <div class="animateWidthColumns columns is-marginless" :style="getColumnStyle">
          <div class="column is-marginless ">
            <p class="has-text-centered is-size-4-desktop is-size-5-touch">
              <span class="pointer">
              <span  @click="hide('practice')" v-if="!practiceHide">
                <img class="rasl-icon" :src="'icons/rasl_arrow_simple_left.svg'" />
                 <span class="valign-middle">Reflective</span>
              <img class="rasl-icon" :src="'icons/rasl_arrow_simple_right.svg'" />
              </span>
              <span @click="showBothColumns()" v-else>
                <img class="rasl-icon" :src="'icons/rasl_arrow_simple_right.svg'" />
                <span class="valign-middle">Reflective</span>
              <img class="rasl-icon" :src="'icons/rasl_arrow_simple_left.svg'" />
              </span>
              </span>


            </p>

          </div>
          <div class="column is-marginless ">
            <p class="has-text-centered is-size-4-desktop is-size-5-touch">
              <span class="pointer">
              <span  @click="hide('reflective')" v-if="!reflectiveHide">
                <img class="rasl-icon" :src="'icons/rasl_arrow_simple_left.svg'" />
                 <span class="valign-middle">Practice</span>
              <img class="rasl-icon" :src="'icons/rasl_arrow_simple_right.svg'" />
              </span>
              <span @click="showBothColumns()" v-else>
                <img class="rasl-icon" :src="'icons/rasl_arrow_simple_right.svg'" />
                <span class="valign-middle">Practice</span>
              <img class="rasl-icon" :src="'icons/rasl_arrow_simple_left.svg'" />
              </span>
              </span>


            </p>

          </div>
        </div>
        <hr class="m-0" />
      </div>

      <div :class="$mq != 'lg' ? '':'pl-40 pr-40'">

        <!-- {{practiceHide}} -->
        <div v-if="$mq === 'lg'" class="animateWidthColumns pb-40 columns is-marginless" :style="getColumnStyle">
          <!-- REFLECTIVE COLUMN -->
          <div class="column is-marginless is-paddingless ">
            <div v-if="!reflectiveHide" class=" ">
              <!-- {{$mq}} -->
              <ul>
                <transition-group name="list-complete">
                  <li class="is-size-4-desktop is-size-5-touch list-complete-item" :key="postdata.id" v-for="postdata in reflectivePosts">
                    <postindex :ignorepadding="ignorepadding" :left="true" :postdata="postdata"></postindex>
                  </li>
                </transition-group>
              </ul>

              <!-- <getmore type="reflective"></getmore> -->
            </div>
          </div>
          <!-- PRACTICE COLUMN -->
          <div class="column is-marginless is-paddingless ">
            <div v-if="!practiceHide" class=" ">
              <ul>
                <transition-group name="list-complete">
                  <li class="is-size-4-desktop is-size-5-touch list-complete-item" :key="postdata.id" v-for="postdata in practicePosts">
                    <postindex :ignorepadding="ignorepadding" :left="false" :postdata="postdata"></postindex>
                  </li>
                </transition-group>
              </ul>

              <!-- <getmore type="practice"></getmore> -->
            </div>
          </div>
        </div>
        <div class="columns is-marginless" v-else>
            <div class="column is-marginless is-paddingless ">
                <ul>
                  <transition-group name="list-complete">
                    <li class="is-size-4-desktop is-size-5-touch list-complete-item" :key="postdata.id" v-for="postdata in mergedOrderedPosts">
                      <postindex :ignorepadding="ignorepadding" :left="true" :postdata="postdata"></postindex>
                    </li>
                  </transition-group>
                </ul>

            </div>

        </div>

        <getmoreall></getmoreall>


      </div>


    </div>

  </div>


</div>
</div>
</template>

<script>
// if (process.browser) {
// import Sticky from 'vue-sticky-directive'
// };
// var URI = require('urijs');


if (process.browser) {
  var Sticky = require('vue-sticky-directive')
}

// import genericcomp from '~/components/_genericComp.vue'
import indexintro from '~/components/indexintro.vue'
import filters from '~/components/filters.vue'
import postlist from '~/components/postlist.vue'
import postlistfeatured from '~/components/postlistfeatured.vue'
import postindex from '~/components/postIndex'
import getmore from '~/components/getmore.vue'
import getmoreall from '~/components/getmoreall.vue'
import librarynav from '~/components/librarynav.vue'
import pageheader from '~/components/pageheader.vue'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    // genericcomp,
    indexintro,
    filters,
    getmore,
    getmoreall,
    postlist,
    postlistfeatured,
    postindex,
    librarynav,
    pageheader
  },
  computed: {
    mergedOrderedPosts: function(){
        const concatinated = _.concat(this.reflectivePosts, this.practicePosts);
        return _.orderBy(concatinated, ['date'], ['desc']);

    },
    featuredPostsEven: function() {


      var even = this.featuredPosts.filter(function(v, i) {
        return i % 2 == 1;
      });
      return even;
    },
    featuredPostsUneven: function() {
      var uneven = this.featuredPosts.filter(function(v, i) {
        return i % 2 == 0;
      });
      return uneven;
    },
    featuredPostsFirst: function() {

    },
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
      featuredPosts: "GET_FEATUREDPOSTS",
      reflectivePosts: "GET_REFLECTIVEPOSTS",
      practicePosts: "GET_PRATICEPOSTS",
      windowsearch: "GET_WINDOWSEARCH",
      loadingPage: "GET_LOADING",
    }),

    getBackgroundStyleI: function() {

      if (this.reflectiveHide) {
        return {
          'width': '0%'
        }
      }
      if (this.practiceHide) {
        return {
          'width': '100%'
        }
      }
    },

    getBackgroundStyleII: function() {
      if (this.reflectiveHide) {
        return {
          'width': '100%',
          'left': '0%'
        }
      }
      if (this.practiceHide) {
        return {
          'width': '0%',
          'left': '100%'
        }
      }
    },

    getColumnStyle: function() {
      if (this.reflectiveHide) {
        return this.reflectiveHideStyle
      }
      if (this.practiceHide) {
        return this.practiceHideStyle
      }
    }
  },
  directives: {
    Sticky
  },

  //

  data: function() {
    return {
      reflectiveHide: false,
      practiceHide: false,
      ignorepadding: false,
      reflectiveHideStyle: {
        'width': '200%',
        // 'transform':'translate3d(0%,0,0)'
        'transform': 'translate3d(-50%,0,0)'


      },
      practiceHideStyle: {
        'width': '200%',
        // 'transform':'translate3d(-50%,0,0)'
      }
    }
  },

  methods: {
    hide: function(input) {
      if (input === 'reflective') {
        this.reflectiveHide = true
        this.practiceHide = false

      }
      if (input === 'practice') {
        this.reflectiveHide = false
        this.practiceHide = true
      }
      this.ignorepadding = true
    },
    showBothColumns: function() {
      this.reflectiveHide = false
      this.practiceHide = false
      this.ignorepadding = false

    }
  },
  mounted() {


  },


  async asyncData({
    params,
    query,
    error,
    store,
    route,
    redirect
  }) {


    // GET POSTS START
    // if (store.state.posts.length == 0) {
    //   const postsRes = await axios.get(store.state.apiRoot + '/posts')
    //   store.commit('SET_POSTS', postsRes.data)
    // }

    // RETURN DATA DIRECTLY
    // return { title: 'blah blah blah' }


  },


}
</script>

<style lang="scss">
.fader-enter-active,
.fader-leave-active {
    transition: opacity 0.5s;
}
/* .fade-leave-active below version 2.1.8 */
.fader-enter,
.fader-leave-to {
    opacity: 0;
}

.list-complete-item {
    transition: all 0.25s;
}

.list-complete-enter,
.list-complete-leave-active {
    opacity: 0;
}

#library {

    position: relative;
    // min-height: 110vh;
    .backgroundBlockI,
    .backgroundBlockII {
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
        z-index: -1;
        -webkit-transition: left 0.5s ease-in-out, width 0.5s ease-in-out;
        -moz-transition: left 0.5s ease-in-out, width 0.5s ease-in-out;
        -o-transition: left 0.5s ease-in-out, width 0.5s ease-in-out;
        transition: left 0.5s ease-in-out, width 0.5s ease-in-out;
    }
    .backgroundBlockI {
        left: 0;
        background: $green;
    }

    .backgroundBlockII {
        left: 50%;
        background: $pink;
    }

    .librarynavwrapper {}

    .animateWidthColumns {
        -webkit-transition: transform 0.5s ease-in-out, width 0.5s ease-in-out;
        -moz-transition: transform 0.5s ease-in-out, width 0.5s ease-in-out;
        -o-transition: transform 0.5s ease-in-out, width 0.5s ease-in-out;
        transition: transform 0.5s ease-in-out, width 0.5s ease-in-out;
        width: 100%;

    }

    .options-wrapper {
        position: absolute;
        right: 0;
        height: 100%;
    }

}
</style>
