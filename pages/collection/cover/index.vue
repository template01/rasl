<template>
<div class="">

  <div class="columns">
    <div class="column">
      <!-- {{getRandomTitle}}
      <br />
      {{getTitleArray}} -->
      <p class="coverTitle">
        <span v-for="word in getRandomTitle" v-html="word">
        </span>
      </p>
      <!-- <printlist :display="selectedPosts"></printlist> -->
    </div>
  </div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import printlist from '~/components/print/printlist.vue'

import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  layout: 'print',
  components: {
    printlist
  },
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  computed: {
    ...mapGetters({}),
    getRandomTitle: function() {
      // create a copy of the array
      var vm = this
      var maxWords = 7
      var newArray = []
      for (var i = 0; i < vm.getTitleArray.length && i<maxWords; i++) {
        newArray.push(vm.getTitleArray[i])
      }


      // then, each time pull from that array and remove the one you use
      if (newArray.length > 0) {
        var index = Math.floor(Math.random() * newArray.length)
        var randomImage = newArray[index];
        newArray.splice(index, 1);
      }
      return newArray

    },
    getTitleArray: function() {
      var vm = this
      var names = []
      this.selectedPosts.forEach(function(element) {
        names.push(element.title.rendered.split(" "));
      });

      function flatten(arr) {
        return arr.reduce(function(flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
      }

      return flatten(names)
      // for each(post in this.selectedPosts) {
      //   vm.titles.push(post.title.rendered)
      // }
    }
  },
  methods: {},
  async asyncData({
    params,
    query,
    error,
    store,
    route,
    redirect
  }) {

    const results = (await axios.all(
      store.state.selected.map(
        function(selectedPostSingle) {
          return axios.get(store.state.apiRoot + '/wp/v2/' + selectedPostSingle.posttype + '/' + selectedPostSingle.postid);
        }
      )
    )).map(result => result.data)

    return {
      selectedPosts: results
    }


  },


}
</script>

<style lang="scss">
*{
  font-family: 'Tex Gyre Heros'
}
.coverTitle{
  font-size: 90pt;
  text-transform: uppercase;
  line-height: 1.1;
  word-spacing: 0pt;
  span{
    margin-right: 35pt;
    float: left;
  }
}
</style>
