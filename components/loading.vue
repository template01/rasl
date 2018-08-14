<template lang="html">
  <transition name="slidedown">
  <div class="loading-page" v-if="loading">
    <div class="loading-page-inner p-40">
      <div class="columns is-marginless">
        <div class="column">
      <span class="loadingLetters is-size-1-desktop is-size-2-touch-desktop is-size-2-touch">

      </span>
    </div>
    <div class="column">
  <span class="huge-letters loadingLetters">
     LOADING
  </span>
</div>
<div class="column">
<span class="loadingLetters is-size-1-desktop is-size-2-touch-desktop is-size-2-touch">

</span>
</div>
      </div>
      <!-- <div class="columns is-marginless">

        <div class="column animateLoading animateLoading1">
          <p v-for="item in loadingItems" class="is-size-1-desktop is-size-2-touch-desktop is-size-2-touch">
            LOADING
          </p>
        </div>
        <div class="column animateLoading animateLoading2">
          <p v-for="item in loadingItems" class="is-size-1-desktop is-size-2-touch-desktop is-size-2-touch">
            LOADING
          </p>
        </div>
        <div class="column animateLoading animateLoading3">
          <p v-for="item in loadingItems" class="is-size-1-desktop is-size-2-touch-desktop is-size-2-touch">
            LOADING
          </p>
        </div>
        <div class="column animateLoading animateLoading4">
          <p v-for="item in loadingItems" class="is-size-1-desktop is-size-2-touch-desktop is-size-2-touch">
            LOADING
          </p>
        </div>
      </div> -->
    </div>
    <!-- <transition name="fade">
    <div v-if="startanimationI" class="loadingBlock">
    </div>
  </transition>
  <transition name="fade">
    <div v-if="startanimationII" class="loadingBlock">
    </div>
  </transition> -->
  </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    startanimationI: false,
    startanimationII: false,
    loadingItems: 10,
    loadingLetters: [{
      'letter': 'L',
      'animated': false
    }, {
      'letter': 'O',
      'animated': false
    }, {
      'letter': 'A',
      'animated': false
    }, {
      'letter': 'D',
      'animated': false
    }, {
      'letter': 'I',
      'animated': false
    }, {
      'letter': 'N',
      'animated': false
    }, {
      'letter': 'G',
      'animated': false
    }]
  }),
  methods: {
    randDelay: function() {
      return Math.floor(Math.random() * Math.floor(250));
    },


    start() {
      this.loading = true
      this.$store.commit('SET_LOADING', true)

      // setTimeout(function() {
      //   vm.startanimationI =  true
      // }, Math.floor(Math.random() * Math.floor(250)))
      // setTimeout(function() {
      //   vm.startanimationII =  true
      // }, Math.floor(Math.random() * Math.floor(250)))
    },
    finish() {
      var vm = this

      // setTimeout(function() {
      //   setTimeout(function() {
      //     vm.startanimationI = false
      //   }, Math.floor(Math.random() * Math.floor(250)))
      //   setTimeout(function() {
      //     vm.startanimationII = false
      //   }, Math.floor(Math.random() * Math.floor(250)))
      //
      // }, 250)
      setTimeout(function() {
        vm.loading = false
        vm.$store.commit('SET_LOADING', false)
      }, 800)

    }
  }
}
</script>

<style scoped lang="scss">
.slidedown-enter-active {
    transition: transform 0.5s;
    transform: translate3d(0%,0,0);
}
.slidedown-leave-active {
    transition: all 0.5s;
    transform: translate3d(100%,0%,0);

}
,
.slidedown-enter {
    transform: translate3d(-100%,0,0);
    // transform: translate3d(0,-100%,0);
}

//
// .fade-enter-active,
// .fade-leave-active {
//     transition: all 0.25s;
//     transform: translate3d(0%,0,0);
// }
/* .fade-leave-active below version 2.1.8 */
// .fade-enter,
// .fade-leave-to {
//     transform: translate3d(-100%,0,0);
// }

.loadingLetters {
    color: $white;
    display: inline-block;
    align-self: center;
    font-style: italic;
    // transition: 0.25s transform;
    // animation-name: example;
    // animation-duration: 0.5s;
    // animation-iteration-count: infinite;
    // animation-direction: alternate;
    // width: 100%;
    // span {
    //     display: inline-block;
    //     transition: 0.75s transform;
    // }
    // .slant {
    //     transform: skewX(-30deg);
    // }
    //
    // @keyframes example {
    //     0% {
    //         // opacity: 0;
    //
    //         // transform: translate3d(0px,0,0);
    //         transform: skewX(0deg);
    //     }
    //
    //     100% {
    //         // opacity: 1;
    //
    //         // transform: translate3d(0,-5px,0);
    //         transform: skewX(-20deg);
    //     }
    // }
}

.loading-page {
    background: $black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    // padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 99999999999;
    .loadingBlock {

        width: 100%;
        position: absolute;
        height: 50%;
        &:nth-of-type(1) {
            top: 0;
            background: $black;

        }
        &:nth-of-type(2) {
            bottom: 0;
            background: $green;

        }
    }
}

.animateLoading {
    @for $i from 1 through 10 {
        p:nth-child(#{$i}) {
            animation-delay: $i*0.25+s;
        }
    }
    p {
        animation-name: example;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    // @keyframes example {
    //     from {
    //         // transform: translate3d(0px,0,0);
    //         opacity: 0;
    //     }
    //
    //     to {
    //         // transform: translate3d(0,-5px,0);
    //         opacity: 1;
    //     }
    // }
}

.animateLoading4 {
    @for $i from 1 through 10 {
        p:nth-child(#{$i}) {
            animation-delay: ($i*0.25)+1+s;
        }
    }
}

.animateLoading3 {
    @for $i from 1 through 10 {
        p:nth-child(#{$i}) {
            animation-delay: ($i*0.25)+0.75+s;
        }
    }
}

.animateLoading2 {
    @for $i from 1 through 10 {
        p:nth-child(#{$i}) {
            animation-delay: ($i*0.25)+0.5+s;
        }
    }
}

.animateLoading1 {
    @for $i from 1 through 10 {
        p:nth-child(#{$i}) {
            animation-delay: ($i*0.25)+0.25+s;
        }
    }
}

.loading-page-inner {
    height: 100%;
    .columns {
        height: 100%;
        .column {
            display: -webkit-flex;
            display: flex;

            -webkit-flex-direction: column;
            flex-direction: column;

            -webkit-align-content: space-between;
            align-content: space-between;

            -webkit-flex-flow: row wrap;
            flex-flow: row wrap;
        }
    }
}
</style>
