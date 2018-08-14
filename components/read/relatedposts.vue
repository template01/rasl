<template>
<div>
  <!-- <hr />
  <div class="columns is-marginless">
    <div class="column">
      <p class="is-size-4-desktop is-size-5-touch  has-text-centered ">
        Related Articles
      </p>
    </div>

  </div>
  <hr /> -->
  <div class="columns">
    <template v-if="!nofound">
      <template v-if="loaded" >
      <relatedItem  v-for="item in mergedExclude" :itemcontent="item" ></relatedItem>
      </template>
    </template>
  </div>
</div>
</template>
<script>
import relatedItem from '~/components/read/relatedItem'

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
    relatedItem,
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
