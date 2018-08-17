<template>
  <div v-show="mounted" class="featuredPostsOuter">

<div class="featuredPosts" :style="{'transform':'translateX('+slidepos+')','width':100*displaydata.length+'vw'}">
  <div class="featuredItem" :class="$mq != 'lg' ? 'featuredItemMobile':''" :style="{'width':slidewidth}" v-for="(postdata, index) in displaydata">
      <div class="contentWrapper column" :class="$mq != 'lg' ? 'contentWrapperMobile':''">
        <div  :class="$mq != 'lg' ? '':' pl-40 pr-40'">

            <div class="pt-20 pb-20">
              <postsingleindexfeatured :postdata="postdata"></postsingleindexfeatured>
            </div>
            <p v-show="postdata.acf.author"  :class="$mq != 'lg' ? 'contentColumnAuthorclass':'contentColumnAuthorclass'" class="is-size-3-desktop is-size-4-touch pb-30">
              <span>By </span>
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
  </div>
  <!-- <ul>
    <li class="" :key="postdata.id" v-for="(postdata, index) in display" >
      <postindex v-if="!featured" :postdata="postdata"></postindex>

    </li>
  </ul> -->
</div>
<div  @click="slideTo('next')" class="is-hidden-touch nav pointer Aligner Aligner-right"  :class="$mq != 'lg' ? 'navMobile':''">
  <p class="is-size-4-desktop is-size-5-touch">
    NEXT
  </p>
</div>

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
  data: function() {
    return {
      genericData: 'generic component text',
      slidepos: '0px',
      slidelocked: false,
      slidewidthDesktop: '80vw',
      slidewidthMobile: '100vw',
      slideindex: 0,
      mounted: false,
    }
  },
  components: {
    postindex,
    postsingleindexfeatured,
    authorlinks
  },
  computed :{
    slidewidth: function(){
      if(this.$mq != 'lg'){
        return this.slidewidthMobile
      }else{
        return this.slidewidthDesktop

      }
    }
  },
  methods: {

    slideTo: function(dir){
      this.removeScrollHandle()
      this.slidelocked = true
      if(dir === 'next'){
        if(this.slideindex === 0){
          this.slidepos = '0vw'
        }
        this.slidepos = (this.slidepos.replace("vw", "") - this.slidewidth.replace("vw", "")) +'vw'
        this.slideindex = this.slideindex+1
        if( this.slideindex >= this.displaydata.length){
          this.slidepos = '0vw'
           this.slideindex = 0
        }
        // if(this.slidepos.includes("px")){
        //   this.slidepos = '-100vw'
        // }else{
        //   this.slidepos = (this.slidepos.replace("vw", "") - 100) +'vw'
        // }
      }
    },

    removeScrollHandle: function(){
        window.removeEventListener('scroll', this.handleWindowScroll)
    },
    handleWindowScroll: _.throttle(function(arg) {
      this.slidepos = -1 * window.scrollY / 4 + 'px'
      //
      // if(!this.menuOpen){
      //
      //   if (window.scrollY > 40) {
      //     this.hideLogo = true
      //     this.widthHeader = this.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
      //     this.widthLogo = this.$el.querySelector('.logoHeader').getBoundingClientRect().width
      //     this.setWidthHr()
      //
      //   } else {
      //     this.hideLogo = false
      //
      //     this.widthHeader = this.widthHeaderInit
      //     this.widthLogo = this.widthLogoInit
      //     this.setWidthHr()
      //     var vm = this
      //     setTimeout(function() {
      //       vm.widthHeaderInit = vm.$el.querySelector('.indexheaderInner').getBoundingClientRect().width
      //       vm.widthLogoInit = vm.$el.querySelector('.logoHeader').getBoundingClientRect().width
      //       vm.widthHeader = vm.widthHeaderInit
      //       vm.widthLogo = vm.widthLogoInit
      //       vm.setWidthHr()
      //     }, 100)
      //   }
      //
      // }

    }, 50)

  },
  beforeDestroy: function() {
  this.removeScrollHandle()
  },
  mounted() {
    // this.slidewidth = document.body.clientWidth * 0.80 + 'px'

    window.addEventListener('scroll', this.handleWindowScroll);
    this.mounted = true
  },

}
</script>
<style scoped lang="scss">
.featuredPostsOuter{
  position: relative;
  background: white;
  overflow-x: hidden;
  &:hover{
    .nav{
      opacity: 1;
    }
  }
}
.nav{
  transition: opacity 0.25s;
  opacity: 0;
  position: absolute;
  left:80vw;
  bottom: 0;
  width: 20vw;
  height: 100%;
   background: linear-gradient(to left, rgba(255,255,255,0.95) 60% , transparent);
   p{
     margin-right: 53px;
     transform: rotate(90deg);
     user-select: none;
   }
}

.navMobile{
  width: 63px;
  opacity: 1;
  background:$lightgrey;
  left:calc(100vw - 63px);
  min-width: 63px;
  p{
    right: 5px;
    position: absolute;
    margin: 0;
  }

}
.featuredPosts {
    transition: transform 0.25s;
}
.contentColumnOuter{
  position: relative;
  .contentColumnAuthor{
    position: absolute;
    bottom: 0;
  }
}
.featuredItem {
    float: left;
    background: white;

    width: 100%;
    min-height: 600px;
    .columnWrapper{

    }
    .contentWrapper{
      width: 50%;
      float: left;
      min-height: 600px;
      position: relative;

      .contentColumnAuthor{
        bottom: 0;
        position: absolute;
      }

    }

    .contentWrapperMobile{
      width: 100%;
      min-height: 300px;

    }
}

.featuredItemMobile{
  min-height: auto;
}
.featuredImageWrapper{
  width: 50%;
  float: left;
  min-height: 600px;
  overflow: hidden;
  height: 100%;

  position: relative;
  // padding: 0.75rem 0 0.75rem 0 ;
}

.featuredImageWrapperMobile{
  width: 100%;
  min-height: 300px;
  // padding: 0.75rem 0 0.75rem 0 ;
}
.featuredImage{
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
</style>
