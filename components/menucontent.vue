<template>
  <div class="p-10">

    <div class="columns">

  <div class="column is-size-1-desktop  is-size-4-touch uppercase ">
    <div :class="$mq != 'lg' ? 'pl-0':'pl-20'" >
      <p  :class="$mq != 'lg' ? 'pt-0':'pt-20'">
        <span class="pointer" v-if="$route.path==='/'" @click="scrollToIndex()">Home</span>
        <nuxt-link v-else :to="'/'+windowsearch">Home</nuxt-link>
      </p>
      <p :class="$mq != 'lg' ? 'pt-5':'pt-10'">
        <span class="pointer" v-if="$route.path==='/'" @click="scrollToLibrary()">Library</span>
        <nuxt-link v-else :to="windowsearch.length>0 ?'/'+windowsearch+'&library=true' : '/?library=true'">Library</nuxt-link>

      </p>
      <p :class="$mq != 'lg' ? 'pt-5':'pt-10'">
        <nuxt-link :to="'/authors'+windowsearch">Authors</nuxt-link>
      </p>
      <p v-if="$mq === 'lg'" class="pt-10">
        <nuxt-link :to="'/collection'+windowsearch">Collection <span class=""><buttoncounter :isinmenu="true"></buttoncounter></span></nuxt-link>
      </p>
      <p :class="$mq != 'lg' ? 'pt-5':'pt-10'">
        <nuxt-link :to="'/about'+windowsearch">About</nuxt-link>
      </p>

      <!-- <nuxt-link :to="'/authors'+windowsearch">Authors</nuxt-link> -->
    </div>

  </div>
</div>
  </div>
</template>
<script>
import buttoncounter from '~/components/buttoncounter'
import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  data: function() {
    return {

    }
  },
  components:{
    buttoncounter
  },
  methods: {
    scrollToIndex: function(){
      // window.scroll({ top: 2500, left: 0, behavior: 'smooth' });
      this.$store.commit('menu/SET_TOGGLE',false);
      setTimeout(function(){
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      },250)
    },
    scrollToLibrary: function(){
      // window.scroll({ top: 2500, left: 0, behavior: 'smooth' });
      this.$store.commit('menu/SET_TOGGLE',false);
      setTimeout(function(){
        window.scroll({ top: document.querySelector('#library').offsetTop, left: 0, behavior: 'smooth' });
      },250)

    }
  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
      selected: "GET_SELECTED"
    }),
  },

}
</script>
<style scoped lang="scss">

a{
  display: block;
  overflow: hidden;
}
</style>
