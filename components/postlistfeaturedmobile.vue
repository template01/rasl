<template>
<div class="featuredPostsOuter">

  <div class="">

    <div class="">
      <!-- <div  :class="[inViewClass]" class="transitionOpacity" :style="[slideIn ? {'opacity':'1'}:{'opacity':'0'},{'transition-delay':secondDelay+'ms'}]"> -->
      <!-- <div v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight" :class="[inViewClass]" class="transitionOpacity" :style="[slideIn ? {'opacity':'1'}:{'opacity':'0'},{'transition-delay':secondDelay+'ms'}]"> -->
      <div v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight" class="featuredcaroussel columns is-mobile" :class="{slideInHorizontal: slideInHorizontal, slideOutHorizontal: slideOutHorizontal}">

        <div class="column is-10" style="padding-right:0;">
          <div class="pl-40 pr-40 ">



            <div class=" pb-20">
              <postsingleindexfeatured :postdata="displaydata[selected]"></postsingleindexfeatured>
            </div>
            <p v-show="displaydata[selected].acf.author" :class="$mq != 'lg' ? 'contentColumnAuthorclass':'contentColumnAuthorclass'" class="is-size-4 pb-30">
              <authorlinks :authors="displaydata[selected].acf.author"></authorlinks>
            </p>
          </div>
          <div class="featuredImageWrapperMobile">
            <div v-if="displaydata[selected].acf.featured_image" class="featuredImage" v-bind:style="{ 'background-image': 'url(' + displaydata[selected].acf.featured_image.sizes.medium + ')' }">
            </div>
            <!-- <div v-else class="featuredImage" v-bind:style="{ 'background-image': 'url(' + 'http://placehold.it/400x400' + ')' }"> -->
            <!-- </div> -->
          </div>
        </div>
        <div class="column nav Aligner" @click="swipeLeft()">

          <p class="is-size-5-touch has-text-centered pr-10" @click="swipeLeft()">
            N<br/>E<br/>X<br/>T
          </p>
        </div>
      </div>

      <!-- <div class="columns">
        <div class="column">

          <span @click="swipeLeft()">
            NEXT
          </span>
        </div>
      </div> -->

    </div>


    <!-- <div class="featuredItem" :class="$mq != 'lg' ? 'featuredItemMobile':''" :style="{'width':slidewidth}" v-for="(postdata, index) in displaydata">
        <div class="contentWrapper column" :class="$mq != 'lg' ? 'contentWrapperMobile':''">
          <div  :class="$mq != 'lg' ? '':' pl-40 pr-40'">

              <div class="pt-20 pb-20">
                <postsingleindexfeatured :postdata="postdata"></postsingleindexfeatured>
              </div>
              <p v-show="postdata.acf.author"  :class="$mq != 'lg' ? 'contentColumnAuthorclass':'contentColumnAuthorclass'" class="is-size-2-desktop is-size-4-touch pb-30">
                <authorlinks :authors="postdata.acf.author"></authorlinks>
              </p>
          </div>

        </div>
        <div class="featuredImageWrapper"  :class="$mq != 'lg' ? 'featuredImageWrapperMobile':''">

              <div v-if="postdata.acf.featured_image" class="featuredImage" v-bind:style="{ 'background-image': 'url(' + postdata.acf.featured_image.sizes.large + ')' }">
              </div>
              <div v-else class="featuredImage" v-bind:style="{ 'background-image': 'url(' + 'http://placehold.it/400x400' + ')' }">
              </div>
        </div>
    </div> -->

  </div>
  <!-- <div  @click="slideTo('next')" class=" nav pointer Aligner Aligner-right"  :class="$mq != 'lg' ? 'navMobile':''">
  <p class="is-size-4-desktop is-size-6-touch">
    NEXT
  </p>
</div> -->

</div>
</template>
<script>
import postindex from '~/components/postIndex'
import authorlinks from '~/components/authorLinks'
import postsingleindexfeatured from '~/components/postSingleIndexFeatured'
import {
  mapGetters
} from 'vuex'
import _ from 'lodash'


export default {
  props: ['displaydata', 'featured'],

  components: {
    postindex,
    postsingleindexfeatured,
    authorlinks
  },
  computed: {
    // slidewidth: function(){
    //   if(this.$mq != 'lg'){
    //     return this.slidewidthMobile
    //   }else{
    //     return this.slidewidthDesktop
    //
    //   }
    // }
  },
  data: function() {
    return {
      selected: 0,
      slideIn: false,
      inViewClass: 'slideInGallery',
      slideInHorizontal: true,
      slideOutHorizontal: false,
    }
  },
  methods: {

    swipeLeft: function() {
      if (this.displaydata.length > 1) {

        if (this.selected === this.displaydata.length - 1) {

          this.transitionCard(0)

        } else {

          this.transitionCard(this.selected + 1)
        }
      }
    },

    swipeRight: function() {
      if (this.displaydata.length > 1) {

        if (this.selected === 0) {

          this.transitionCard(this.displaydata.length - 1)

        } else {

          this.transitionCard(this.selected - 1)
        }
      }
    },


    transitionCard: function(input) {
      this.slideOutHorizontal = true
      this.slideInHorizontal = false
      var vm = this
      setTimeout(function() {
        vm.selected = input
      }, 400)
      setTimeout(function() {
        vm.slideOutHorizontal = false
        vm.slideInHorizontal = true
      }, 800)
    }
  },
  mounted() {
    // var myElement = this.$el.querySelector("." + this.inViewClass);
    // var elementWatcher = scrollMonitor.create(myElement, this.offset);
    // var vm = this
    //
    // elementWatcher.enterViewport(function() {
    //   vm.slideIn = true
    // });
    //
    // elementWatcher.exitViewport(function() {
    //   // vm.slideIn = false
    // });
  },

}
</script>
<style scoped lang="scss">
.slideOutHorizontal {
    transform: translateX(-20px) !important;
    opacity: 0.0 !important;
}
.slideInHorizontal {
    transform: translateX(0px) !important;
    opacity: 1 !important;
}

.featuredcaroussel {
    transform: translateX(20px);
    opacity: 0.0;
    transition: transform 500ms, opacity 500ms, min-height 500ms;
    // min-height: 300px;
    // margin-bottom: -40px;
    // max-height: 1000px;
    position: relative;
    img {
        // border-radius: 10px;
        // margin: 0 auto;
        // display: block;
        // max-height: 800px;
    }
    .bulletWrapper {
        text-align: center;
        width: 100%;
    }
    .bullet {
        border: 2px solid $brown;
        height: 15px;
        width: 15px;
        border-radius: 100%;
        overflow: hidden;
        display: inline-block;
        cursor: pointer;
        &.active {
            background: $brown;
        }

    }
}

.featuredImageWrapperMobile {
    width: 100%;
    float: left;
    max-height: 300px;
    min-height: 300px;
    overflow: hidden;
    height: 100%;
    position: relative;
    // padding: 0.75rem 0 0.75rem 0 ;
}

.featuredImage {
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    // padding: 0.75rem;
    // margin-left: -0.75rem;
    left: 0;
    top: 0;
}

.nav {
  background: $black;
  color: $white;
    // transition: opacity 0.25s;
    // opacity: 0;
    // position: absolute;
    // left:80vw;
    // bottom: 0;
    // width: 20vw;
    // height: 100%;
    //  background: linear-gradient(to left, rgba(255,255,255,0.95) 60% , transparent);
    p {
        // margin-right: 53px;
        // transform: rotate(90deg);
        user-select: none;
        // margin-left: -8.33vw;
    }
}

// .featuredPostsOuter{
//   position: relative;
//   background: white;
//   overflow-x: hidden;
//   &:hover{
//     .nav{
//       opacity: 1;
//     }
//   }
// }
// .nav{
//   transition: opacity 0.25s;
//   opacity: 0;
//   position: absolute;
//   left:80vw;
//   bottom: 0;
//   width: 20vw;
//   height: 100%;
//    background: linear-gradient(to left, rgba(255,255,255,0.95) 60% , transparent);
//    p{
//      margin-right: 53px;
//      transform: rotate(90deg);
//      user-select: none;
//    }
// }
//
// .navMobile{
//   width: 63px;
//   opacity: 1;
//   background:$lightgrey;
//   left:calc(100vw - 63px);
//   min-width: 63px;
//   p{
//     right: 5px;
//     position: absolute;
//     margin: 0;
//   }
//
// }
// .featuredPosts {
//     transition: transform 0.25s;
// }
// .contentColumnOuter{
//   position: relative;
//   .contentColumnAuthor{
//     position: absolute;
//     bottom: 0;
//   }
// }
// .featuredItem {
//     float: left;
//     background: white;
//
//     width: 100%;
//     min-height: 600px;
//     .columnWrapper{
//
//     }
//     .contentWrapper{
//       width: 50%;
//       float: left;
//       min-height: 600px;
//       position: relative;
//
//       .contentColumnAuthor{
//         bottom: 0;
//         position: absolute;
//       }
//
//     }
//
//     .contentWrapperMobile{
//       width: 100%;
//       min-height: 300px;
//
//     }
// }
//
// .featuredItemMobile{
//   min-height: auto;
// }
// .featuredImageWrapper{
//   width: 50%;
//   float: left;
//   min-height: 600px;
//   overflow: hidden;
//   height: 100%;
//
//   position: relative;
//   // padding: 0.75rem 0 0.75rem 0 ;
// }
//
// .featuredImageWrapperMobile{
//   width: 100%;
//   min-height: 300px;
//   // padding: 0.75rem 0 0.75rem 0 ;
// }
// .featuredImage{
//   position: absolute;
//   height: 100%;
//   width: 100%;
//    background-size: cover;
//    background-position: center center;
//   overflow: hidden;
//   // padding: 0.75rem;
//   // margin-left: -0.75rem;
//   left: 0;
//   top: 0;
// }
</style>
