<template>
  <div class="p-10">

    <div class="columns">
      <!-- <div class="column has-border-right">

      <p class="is-size-4">

      Erasmus University Rotterdam (EUR), Codarts Rotterdam and Willem de Kooning Academy Rotterdam are collaborating more intensively and joined forces in the Rotterdam Arts and Sciences Lab (RASL). The goal of this collaboration is to, firstly, advance the
      exchange of knowledge on education and research. Secondly, to offer students the possibility to develop their skills in accordance with the changing artistic professional practices and societal issues. The three institutes aim to become a central
      player within the arts and sciences sector in Rotterdam in order to facilitate versatile and talented students, develop innovative educational structures and promote multidisciplinary research. RASL reinforces the international artistic profile
      of Rotterdam within arts and sciences by elevating its artistic practices and enriching its artistic networks. As such, RASL provides a creative and innovative impulse to Rotterdam’s networks.


    </p>
  </div> -->
  <div class="column is-size-1  ">
    <div class="pl-10">

      <p>
        <nuxt-link :to="'/authors'+windowsearch">Authors</nuxt-link>
      </p>
      <p>
        <nuxt-link :to="'/'+windowsearch">Library</nuxt-link>
      </p>
      <p>
        <nuxt-link :to="'/collection'+windowsearch">Collection ({{selected.length}})</nuxt-link>
      </p>
      <!-- <nuxt-link :to="'/authors'+windowsearch">Authors</nuxt-link> -->
    </div>

  </div>
</div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  data: function() {
    return {
      genericData: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa'
    }
  },
  methods: {},
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
