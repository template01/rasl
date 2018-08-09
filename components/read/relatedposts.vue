<template>
<div>
  <!-- <hr />
  <div class="columns is-marginless">
    <div class="column">
      <p class="is-size-4  has-text-centered ">
        Related Articles
      </p>
    </div>

  </div>
  <hr /> -->
  <div class="columns">
    <template v-if="!nofound">
        <div v-if="loaded" v-for="item in mergedExclude" class="column" :class="[item.type === 'practice' ? 'pink-background':'lightblue-background', item.type === 'practice' ? 'has-text-danger':'has-text-success']">
          <div class=" p-50">

          <div class="columns ignore-mb">
            <div class="column">
              <selectpost class="pointer  is-pulled-left mr-5" :posttype="item.type" :postid="item.id"></selectpost>
              <nuxt-link class=" is-pulled-left mr-5 hover-animate-chilren-right" :to="'/read/'+item.type+'/'+item.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <p class="is-size-4  mr-10" style="text-transform:capitalize" v-html="item.title.rendered">
              </p>
            </div>
          </div>
        </div>

        </div>
        <!-- <div v-if="!loaded" class="column">
          <p class="has-text-centered is-size-4">
            Loading
          </p>
        </div> -->
      </template>
    <!-- <template v-else>
        <div class="column">
          <p class="has-text-centered is-size-4">
            No related articles found
          </p>
        </div>
      </template> -->
  </div>
</div>
</template>
<script>
import selectpost from '~/components/selectpost'

import axios from 'axios'
import _ from 'lodash'
import {
  mapGetters
} from 'vuex'

export default {
  props: ['tags', 'excludeid'],
  data: function() {
    return {
      genericData: 'generic component text',
      practicePosts: [],
      reflectivePosts: [],
      loaded: false,
      nofound: false
    }
  },
  components: {
    selectpost,
  },

  methods: {
    getRelated: function() {

      // alert(this.apiRoot)
      //
      if (this.tags.length > 0) {

        var vm = this
        axios.all([
            // axios.get('http://google.com'),
            // axios.get('http://apple.com')
            axios.get(this.apiRoot + '/wp/v2/reflective' + '?filter[tag]=' + vm.tags + '&per_page=10&page=1'),
            axios.get(this.apiRoot + '/wp/v2/practice' + '?filter[tag]=' + vm.tags + '&per_page=10&page=1')
          ])
          .then(axios.spread((reflectiveRes, practiceRes) => {
            this.reflectivePosts = reflectiveRes.data
            this.practicePosts = practiceRes.data
            this.loaded = true
          }))

      } else {
        this.nofound = true
      }
    }
  },
  mounted() {
    this.getRelated()
  },
  computed: {
    mergedExclude: function() {
      var concatArrays = this.reflectivePosts.concat(this.practicePosts)

      var excludeCurrent = concatArrays
      _.remove(concatArrays, {
        id: this.excludeid
      });

      if (excludeCurrent.length === 0) {
        excludeCurrent.push({}, {}, {})
      }

      if (excludeCurrent.length === 1) {
        excludeCurrent.push({}, {})
      }
      if (excludeCurrent.length === 2) {
        excludeCurrent.push({})
      }

      function getRandom(arr, n) {
        var result = new Array(n),
          len = arr.length,
          taken = new Array(len);
        if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
      }


      var removeempty = getRandom(excludeCurrent, 3).filter(value => Object.keys(value).length !== 0);

      //
      //  getRandom(excludeCurrent, 3).filter(function(n) {
      //   return n != undefined
      // });

      return removeempty

    },
    ...mapGetters({
      apiRoot: "GET_APIROOT",
      windowsearch: "GET_WINDOWSEARCH"
    }),
  },

}
</script>
<style scoped lang="scss">
hr {
    margin: 0;
}
</style>
