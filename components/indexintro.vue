<template>
<div class="p-40 indexintro">
  <div class="backgroundBlockI">
  </div>
  <div class="backgroundBlockII">
  </div>
  <div class="contentWrapperIntro pb-20 pt-40">
    <h1 class="" :class="!appinitated ? 'animateHeight':''">
      <span  v-if="readyPos" :class="runspantransition ? 'resetSpan':''" :style="{'transform':'translateY('+randomPositions[index]+')'}" v-for="(letter,index) in introword">{{letter}}</span>
    </h1>
    <!-- <img class="" src="/rasllogow.svg"/> -->
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
      genericData: 'generic component text'
    }
  },
  methods: {
    randomPos: function() {
    }
  },
  created() {
    var vm = this
    this.introword.forEach((num, index) => {
      var positions = [-200, -100, 0, 100, 200]
      var rand = positions[Math.floor(Math.random() * positions.length)];
      // return rand + '%';
      // return arr[index] = num * 2;
      vm.randomPositions.push(rand+'%')

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
      vm.runspantransition = true
    }, 1500)
    setTimeout(function() {
      vm.$store.commit('SET_APPINITIATED', true)
    }, 3500)
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
                line-height: 1;
                display: inline-block;
                transition: transform 1s;
            }
        }
        img {
            float: left;
            width: 10vw;
            margin-left: 1.5vw;
            margin-bottom: -1.3vw;
            padding-top: 1.3vw;
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
        font-size: 12vw;
        line-height: 9vw;
        letter-spacing: -0.5vw;
    }
    .animateHeight {
        line-height: 90vh;
        animation-name: example;
        animation-duration: 1s;
        animation-delay: 3s;
        animation-fill-mode: forwards;

    }

    .resetSpan {
        transform: translateY(0) !important;
    }
    @keyframes example {
        from {
            line-height: 90vh;

        }
        to {
            line-height: 9vw;

        }
    }

}
</style>
