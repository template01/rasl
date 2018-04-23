<template>
<div class="mt-80">
  <div class="">
    <draggable @start="drag=true" v-model="myArray" @end="drag=false">
      <div class="columns is-size-5" :key="postdata.id" v-for="postdata in myArray">
        <div class="column is-1 sort">
          =
        </div>
        <div class="column is-11">

          <postindex :postdata="postdata"></postindex>
        </div>
      </div>
    </draggable>

  </div class="container">
</div>
</template>
<script>
import postindex from '~/components/postIndex'
import draggable from 'vuedraggable'
var URI = require('urijs');


import {
  mapGetters
} from 'vuex'


export default {
  props: ['display'],
  data: function() {
    return {
      myArray: [],
      prepareforstoreselected:[],
      genericData: 'generic component text'
    }
  },
  components: {
    postindex,
    draggable
  },
  created() {
    this.myArray = this.display
  },
  watch: {
    'myArray': function() {
      console.log('change')
      var url = new URI(window.location.search).removeSearch('selected')

      var vm = this
      vm.prepareforstoreselected = []
      this.myArray.forEach(function(element) {
        url.addSearch({
          selected: element.id + ',' + element.type
        })
        vm.prepareforstoreselected.push({'postid':element.id,'posttype':element.type})
      });
      window.history.replaceState({}, '', '?' + url._parts.query);

      this.$store.commit('SET_WINDOWSEARCH', location.search)
      // this.$store.commit('SET_SELECTED',this.prepareforstoreselected)
      this.$store.dispatch('TRIGGER_SELECTED',this.prepareforstoreselected)

      // const results = (await axios.all(
      //   featuredPosts.map(
      //     function(featuredPostSingle) {
      //       // CHECK IF POSTS HAS A LINK
      //       if ('ID' in featuredPostSingle.acf.postlink) {
      //         return axios.get(state.apiRoot + `/wp/v2/${featuredPostSingle.acf.postlink.post_type}/${featuredPostSingle.acf.postlink.ID}`)
      //       } else {
      //         return {}
      //       }
      //     }
      //   )
      // )).map(result => result.data)



    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
    }),
  },

}
</script>
<style scoped lang="scss">
.sort {
    cursor: move;
}
</style>
