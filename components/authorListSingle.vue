<template>
<nuxt-link class="" :to="'/authors/'+slug+windowsearch">
  <p class="is-size-2-desktop is-size-4-touch has-text-centered">
    <span  v-html="title"></span>
    <!-- <template v-if="articlesWritten>0">(<span  v-html="articlesWritten"></span>)</template> -->
  </p>

</nuxt-link>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import axios from 'axios'



export default {
  props: ['slug', 'id', 'title'],
  data: function() {
    return {
      genericData: 'generic component text',
      articlesWritten: '...'
    }
  },

  methods: {
    getArticles: function(id) {
      // return id

      var vm = this
      //
      //
      //       function axiosTest() {
      //   return axios.get(vm.$store.state.apiRoot + '/wp/v2/practice' + '?raslauthor='+id).then(response => {
      //     // returning the data here allows the caller to get it through another .then(...)
      //     return response.data
      //   })
      // }
      //
      // axiosTest().then(data => {
      //   response.json({ message: 'Request received!', data })
      // })


      function getPracticeArticles() {
        return axios.get(vm.$store.state.apiRoot + '/wp/v2/practice' + '?raslauthor=' + id +'&per_page=100');
      }

      function getReflectiveArticles() {
        return axios.get(vm.$store.state.apiRoot + '/wp/v2/reflective' + '?raslauthor=' + id +'&per_page=100');
      }

      axios.all([getPracticeArticles(), getReflectiveArticles()])
        .then(axios.spread(function(practice, reflective) {
          vm.articlesWritten = practice.data.length + reflective.data.length
          // Both requests are now complete
        }));

      // return this.$store.state.apiRoot



  }
},
mounted(){
  this.getArticles(this.id)
},
computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
      windowsearch: "GET_WINDOWSEARCH"

    }),
  },

}
</script>
<style scoped lang="scss">

</style>
