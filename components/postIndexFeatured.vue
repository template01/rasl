<template>
  <div class="pb-80">

      <div class="columns is-size-4" style="margin-bottom:0;">
        <!-- <div class="column mt-10 ">
        </div> -->
        <div class="column mt-10 ">
          <selectpost class="pointer  is-pulled-left mr-5" :posttype="postdata.type" :postid="postdata.id"></selectpost>
          <nuxt-link class=" is-pulled-left mr-5  hover-animate-chilren-right" :to="'read/'+postdata.type+'/'+postdata.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
        </div>
        <!-- <div class="column mt-10 ">
          <p class="is-size-4  mr-10" style="text-transform:capitalize"v-html="postdata.type">
          </p>
        </div> -->
      </div>


        <h1 class="is-size-1 hover-animate-skew  uppercase" ><nuxt-link v-html="postdata.title.rendered" class="" :to="'read/'+postdata.type+'/'+postdata.slug+windowsearch">  </nuxt-link>
        </h1>

        <p class="is-size-4  mt-20" style="text-transform:capitalize"v-html="postdata.type">
        </p>
      <p class="is-size-4 " v-html="'By: ' + author">
      </p>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import selectpost from '~/components/selectpost'


export default {
  props: ['postdata'],
  data: function() {
    return {
      genericData: 'generic component text',
      author: 'Alain Thompson'
    }
  },
  methods: {},
  components:{
    selectpost
  },
  computed: {

    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
    }),
  },

}
</script>
<style scoped lang="scss">
  .addtoselection{
    max-width: 0px;
    overflow: hidden;
    white-space: nowrap;
    transition: max-width 0.5s ease-in-out;
    display: inline-block;
    height: 40px;
    span{
      border: 2px solid $black;
      border-radius: 20px;
    }
  }
  .hoverselect{

    &:hover{
      .addtoselection{
        max-width: 200px;
      }
      // display: none;
    }

  }
</style>
