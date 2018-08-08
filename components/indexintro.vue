<template>
<div class="p-40 indexintro">
  <div class="backgroundBlockI">
  </div>
  <div class="backgroundBlockII">
  </div>
  <div class="contentWrapperIntro pb-20 pt-40">
    <h1 class="" :class="!appinitated ? 'animateHeight':''">
        <!-- <transition name="fade"> -->
        <span>PUBLICATIONS</span>
          <span class="">
            <img class="" src="/rasllogow.svg"/>
          </span>
            <!-- <span v-bind:key="index" :class="runspantransition ? 'resetSpan':''" :style="{'opacity':opacityItem,'transform':'translateY('+randomPositions[index]+')'}" v-for="(letter,index) in introword">{{letter}}</span>
            <span class="imageSpan" :class="runspantransition ? 'resetSpan':''"  :style="{'opacity':opacityItem,'transform':'translateY('+randomPositions[1]+')'}">
              <img class="" src="/rasllogow.svg"/>
            </span> -->
          </h1>

  </div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  data: function() {
    return {
      runspantransition: false,
      introword: ['P', 'U', 'B', 'L', 'I', 'C', 'A', 'T', 'I', 'O', 'N', 'S'],
      randomPositions: [],
      readyPos: false,
      opacityItem: 0,
      genericData: 'generic component text'
    }
  },
  methods: {
    randomPos: function() {}
  },
  created() {
    var vm = this
    this.introword.forEach((num, index) => {
      var positions = [-200, -100, 0, 100, 200]
      var rand = positions[Math.floor(Math.random() * positions.length)];
      // return rand + '%';
      // return arr[index] = num * 2;
      vm.randomPositions.push(rand + '%')

    });
    // this.readyPos = true
  },
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },
  mounted() {
    var vm = this
    this.readyPos = true
    setTimeout(function() {
      vm.opacityItem=1
    }, 300)
    setTimeout(function() {
      vm.runspantransition = true
    }, 1000)
    setTimeout(function() {
      vm.$store.commit('SET_APPINITIATED', true)
    }, 2500)
  }

}
</script>
<style scoped lang="scss">
.indexintro {

    .contentWrapperIntro {
        display: inline-block;
        h1 {
            float: left;
            span {
              // float: left;
                line-height: 1;
                display: inline-block;
                transition: transform 1s,opacity 0.5s;

                img {
                  width: 8.6vw;
                  margin-left: 0vw;
                  // margin-bottom: -1.3vw;
                  padding-top: 1vw;
                }
            }
        }
    }
    position: relative;
    .backgroundBlockI,
    .backgroundBlockII {
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
        z-index: -1;
    }
    .backgroundBlockI {
        left: 0;
        background: $green;
    }

    .backgroundBlockII {
        left: 50%;
        background: $pink;
    }

    h1 {
        font-size: 10vw;
        line-height: 9vw;
        letter-spacing: -0.5vw;
    }
    .animateHeight {
        line-height: 80vh;
        padding-bottom: 20vh;
        animation-name: example;
        animation-duration: .5s;
        animation-delay: 2.5s;
        animation-fill-mode: forwards;

    }

    @keyframes example {
        from {
            line-height: 80vh;
            padding-bottom: 20vh;

        }
        to {
            line-height: 9vw;
            padding-bottom: 0;

        }
    }
    .resetSpan {
        transform: translateY(0) !important;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 5s;
    }
    /* .fade-leave-active below version 2.1.8 */
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

}
</style>
