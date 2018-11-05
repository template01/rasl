<template>
<div class="">

  <div class="columns is-hidden-touch" style="margin-bottom:0;">
    <div class="column mt-10">
      <selectpost class="pointer  is-pulled-left mr-0" :posttype="postdata.type" :postid="postdata.id"></selectpost>
      <nuxt-link class=" is-pulled-left mr-5 hover-animate-chilren-right" :to="'/read/'+postdata.type+'/'+postdata.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
    </div>
  </div>
  <div class="columns is-marginless is-mobile">
    <div class="column is-12 is-paddingless">

      <h1 class="is-size-1-desktop is-size-4-touch uppercase" ><nuxt-link v-html="postdata.title.rendered" class="" :to="'read/'+postdata.type+'/'+postdata.slug+windowsearch">  </nuxt-link>
      </h1>
    </div>
    <div class="column mt-5 is-5 is-paddingless is-hidden-desktop">
      <nuxt-link class=" is-pulled-right hover-animate-chilren-right" :to="'/read/'+postdata.type+'/'+postdata.slug+windowsearch"><img class="rasl-icon" :src="'/icons/rasl_arrow_right.svg'" /></nuxt-link>
      <selectpost class="pointer  is-pulled-right mr-5" :posttype="postdata.type" :postid="postdata.id"></selectpost>
    </div>
  </div>
  <!--
  <h1 class="is-size-1-desktop is-size-2-touch-desktop is-size-2-touch hover-animate-skew dont-break-out uppercase"><nuxt-link v-html="postdata.title.rendered" class="" :to="'read/'+postdata.type+'/'+postdata.slug+windowsearch">  </nuxt-link>
        </h1> -->
  <!-- <p class="is-size-4-desktop is-size-6-touch  mt-20" style="text-transform:capitalize" v-html="postdata.type">
  </p>
  <p v-show="postdata.acf.author" class="is-size-4-desktop is-size-6-touch ">
    <authorlinks :authors="postdata.acf.author"></authorlinks>
  </p> -->
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import selectpost from '~/components/selectpost'
import authorlinks from '~/components/authorLinks'


export default {
  props: ['postdata'],
  data: function() {
    return {
      genericData: 'generic component text',
    }
  },
  methods: {},
  components: {
    selectpost,
    authorlinks
  },
  computed: {

    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
    }),
  },

}
</script>
<style scoped lang="scss">
.dont-break-out {

    /* These are technically the same, but use both */
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;

    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;

}

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
