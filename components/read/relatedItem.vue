<template>
  <div class="column" :class="[itemcontent.type === 'practice' ? 'pink-background':'lightblue-background', itemcontent.type === 'practice' ? 'has-text-danger':'has-text-success']">
    <div class=" p-50">

    <div class="columns ignore-mb">
      <div class="column">
        <selectpost class="pointer  is-pulled-left mr-5" :posttype="itemcontent.type" :postid="itemcontent.id"></selectpost>
        <nuxt-link class=" is-pulled-left mr-5 hover-animate-chilren-right" :to="'/read/'+itemcontent.type+'/'+itemcontent.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p class="is-size-3-desktop is-size-5-touch  uppercase mr-10" v-html="itemcontent.title.rendered">
        </p>
      </div>
    </div>
  </div>

  </div>
</template>
<script>

import {
  mapGetters
} from 'vuex'

import selectpost from '~/components/selectpost'

export default {
  components: {
    selectpost,
  },

  props:['itemcontent'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  methods:{
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
