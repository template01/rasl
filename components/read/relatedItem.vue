<template>

  <div class="column" :class="[itemcontent.type === 'practice' ? 'pink-background has-text-danger':'', itemcontent.type === 'reflective' ? 'lightblue-background has-text-success':'', itemcontent.type === 'general' ? 'white-background':'']">
    <div class=" p-50">

    <div class="columns ignore-mb is-hidden-touch">
      <div class="column">
        <selectpost class="pointer  is-pulled-left mr-5" :posttype="itemcontent.type" :postid="itemcontent.id"></selectpost>
        <nuxt-link class=" is-pulled-left mr-5 hover-animate-chilren-right" :to="'/read/'+itemcontent.type+'/'+itemcontent.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column is-8">

          <nuxt-link class="" :to="'/read/'+itemcontent.type+'/'+itemcontent.slug+windowsearch"><p :class="[itemcontent.type === 'practice' ? 'has-text-danger':'', itemcontent.type === 'reflective' ? 'has-text-success':'', itemcontent.type === 'general' ? '':'']" class="is-size-1-desktop is-size-4-touch  uppercase mr-10" v-html="itemcontent.title.rendered"></p></nuxt-link>
          <p v-show="itemcontent.acf.author" class="mt-10 is-size-4-desktop is-size-5-touch ">
            <span>By </span>
             <authorlinks :authors="itemcontent.acf.author"></authorlinks>
          </p>
      </div>
      <div class="column is-hidden-desktop">
        <nuxt-link class=" is-pulled-right hover-animate-chilren-right" :to="'/read/'+itemcontent.type+'/'+itemcontent.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
        <selectpost class="pointer  is-pulled-right mr-5" :posttype="itemcontent.type" :postid="itemcontent.id"></selectpost>
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
import authorlinks from '~/components/authorLinks'


export default {
  components: {
    selectpost,
    authorlinks
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
