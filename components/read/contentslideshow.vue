<template>
<!-- You can find this swiper instance object in current component by the "mySwiper"  -->
<div class="slideshow">

  <div v-if="!printversion" v-swiper:mySwiper="swiperOption">
    <style v-if="type ==='practice'">
      .swiper-pagination-bullet-active { background: red !important} .swiper-container{ background: red !important}
    </style>
    <style v-if="type ==='reflective'">
      .swiper-pagination-bullet-active { background: #44ae7b !important} .swiper-container{ background: #44ae7b !important}
    </style>
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img in content">
        <img :src="img.sizes.large">
      </div>
    </div>
    <div class="mb-20 swiper-pagination swiper-pagination-bullets is-size-5-desktop is-size-6-touch pointer"></div>
  </div>
  <div v-else>
    <div class="printwrapper">
      <img :src="img.sizes.medium"  v-for="img in content">
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['printversion', 'content', 'type'],
  data() {
    return {

      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        autoHeight: true,
        // spaceBetween: 40,
        effect: 'fade',
        autoplay: {
          delay: 3000,
        },
        pagination: {
          clickable: true,
          el: '.swiper-pagination',
          // dynamicBullets: true
          renderBullet: function(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          }

        },

        on: {
          slideChange() {
            console.log('onSlideChangeEnd', this);
          },
          tap() {
            console.log('onTap', this);
          }
        }
      }
    }
  },
  mounted() {
    // console.log('app init', this)
    // setTimeout(() => {
    //   this.banners.push('/5.jpg')
    //   console.log('banners update')
    // }, 3000)
    // console.log(
    //   'This is current swiper instance object', this.mySwiper,
    //   'I will slideTo banners 3')
    //  this.mySwiper.slideTo(3)
  }
}
</script>

<style lang="scss">
.slideshow{
  width: 100%;
  display: block;
}
.swiper-container {
    .swiper-pagination-bullet {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: black;
        opacity: 1;
        background: white;
        border: 2px solid black;
        box-sizing: content-box;
    }
    .swiper-pagination-bullet-active {
        color: #fff;
    }
}
</style>

<style lang="scss" scoped>
.swiper-slide {
    opacity: 1 !important;
    &:not(.swiper-slide-active) {
        opacity: 0 !important;
    }
    img {
        width: auto;
        max-height: 80vh;
        margin: 0 auto;
        display: block;
    }
}

.printwrapper{
  display: inline-block;
  img{
    float: left !important;
    width: 8cm !important;
    margin-top: 10px;
    margin-right: 10px;
  }
}

// .my-swiper {
// height: 300px;
// width: 100%;
// .swiper-slide {
//   text-align: center;
//   font-size: 38px;
//   font-weight: 700;
//   background-color: #eee;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// .swiper-pagination {
//   > .swiper-pagination-bullet {
//     background-color: red;
//   }
// }
// }
</style>
