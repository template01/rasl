<template>
    <transition name="fade">
<div v-show="appinitated" class="pagefooter pr-40 pl-40 pt-20 pb-20">

  <div class="">

    <div>
      <div class="columns is-marginless">
        <div class="column is-8  ">
          <nuxt-link :to="'/'+windowsearch">
            <p class="is-size-3 logoText">
              <span class="">
              PUBLICATIONS.RASL.NU
            </span>
            </p>
          </nuxt-link>
        </div>


      </div>


    </div>


  </div>
</div>
</transition>
</template>
<script>
// import _ from 'lodash'

// import selectpost from '~/components/selectpost'

// import buttoncounter from '~/components/buttoncounter'
// import menucontent from '~/components/menucontent'
import {
  mapGetters
} from 'vuex'


export default {
  // props: ['title', 'selectpost','initload'],
  components: {
    // buttoncounter,
    // selectpost,
    // menucontent
  },
  directives: {
  },

  data: function() {
    return {

    }
  },
  watch: {

  },

  beforeDestroy: function() {

  },
  mounted() {

  },
  methods: {


  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
      appinitated: "GET_APP_INITIATED",
    }),
  },


}
</script>
<style scoped lang="scss">

</style>
