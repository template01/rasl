<template>
<div>

  <div class="column" :style="getPaddingStyle">
    <div class="columns" style="margin-bottom:0;">
      <div class="column mt-10">
        <selectpost class="pointer  is-pulled-left mr-5" :posttype="postdata.type" :postid="postdata.id"></selectpost>
        <nuxt-link class=" is-pulled-left mr-5 hover-animate-chilren-right" :to="'/read/'+postdata.type+'/'+postdata.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
      </div>
    </div>
    <h1 class="is-size-3 uppercase" ><nuxt-link v-html="postdata.title.rendered" class="" :to="'read/'+postdata.type+'/'+postdata.slug+windowsearch">  </nuxt-link>
    </h1>
    <p class="ml-30 is-size-4 mt-20" v-html="postdata.title.rendered">
    </p>
    <p v-show="postdata.acf.author" class="mt-10 is-size-4 ">
       <authorlinks :authors="postdata.acf.author"></authorlinks>
    </p>

    <hr class="mb-0" />
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
  props: ['postdata', 'left', 'ignorepadding'],
  data: function() {
    return {
      genericData: 'generic component text',
      author: 'Alain Thompson'
    }
  },
  methods: {},
  components: {
    selectpost,
    authorlinks
  },
  computed: {
    getPaddingStyle: function() {
      if (this.left) {
        if (this.ignorepadding) {
          return {
            'padding-left': 0,
            'padding-right': 0
          }
        } else {
          return {
            'padding-left': 0
          }
        }
      } else {
        if (this.ignorepadding) {
          return {
            'padding-left': 0,
            'padding-right': 0
          }
        } else {
          return {
            'padding-right': 0
          }
        }
      }
    },
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
    }),
  },

}
</script>
<style scoped lang="scss">
.addtoselection {
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
    transition: max-width 0.5s ease-in-out;
    display: inline-block;
    height: 40px;
    span {
        border: 2px solid $black;
        border-radius: 20px;
    }
}
.hoverselect {

    &:hover {
        .addtoselection {
            max-width: 200px;
        }
        // display: none;
    }

}
</style>
