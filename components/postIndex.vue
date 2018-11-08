<template>
<div  :class="[$mq != 'lg' ? 'pl-40 pr-40':'', postBackgroundColor]">
  <div class="column" :class="[$mq != 'lg' ? 'is-paddingless':'',left ? 'mr-30':'ml-30']" :style="$mq != 'lg' ? {'padding-left':0,'padding-right':0} : getPaddingStyle">
    <div class="columns is-hidden-touch" style="margin-bottom:0;">
      <div class="column mt-10">
        <selectpost class="pointer  is-pulled-left mr-0" :posttype="postdata.type" :postid="postdata.id"></selectpost>
        <nuxt-link class=" is-pulled-left mr-5 hover-animate-chilren-right" :to="'/read/'+postdata.type+'/'+postdata.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
      </div>
    </div>
    <div :class="$mq != 'lg' ? 'pt-10':''" class="columns is-marginless is-mobile">
      <div class="column is-12 is-paddingless">

        <h1 class="is-size-1-desktop is-size-4-touch uppercase" ><nuxt-link v-html="postdata.title.rendered" class="" :to="'read/'+postdata.type+'/'+postdata.slug+windowsearch">  </nuxt-link>
        </h1>
      </div>
      <div class="column mt-5 is-4 is-paddingless is-hidden-desktop">
        <nuxt-link class=" is-pulled-right hover-animate-chilren-right" :to="'/read/'+postdata.type+'/'+postdata.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
        <selectpost class="pointer  is-pulled-right mr-5" :posttype="postdata.type" :postid="postdata.id"></selectpost>
      </div>
    </div>
    <p :class="[$mq != 'lg' ? ' mt-5':'mr-30 ml-30  mt-20']" class="is-size-4-desktop is-size-6-touch mb-20" v-if="postdata.acf.abstract">
      <span v-if="postdata.acf.abstract"  v-html="postdata.acf.abstract"></span>
      <!-- <span v-else  v-html="'test'"></span> -->
    </p>
    <p v-show="postdata.acf.author" class="mt-10 is-size-4-desktop is-size-6-touch ">
      <span>By </span>
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
    postBackgroundColor: function(){
      if(this.$mq != 'lg' && this.postdata){
        return this.postdata.type === 'practice' ? 'pink-background':'green-background'
      }
    },
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
