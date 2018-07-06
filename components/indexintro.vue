<template>
<div class="p-40 indexintro">
  <div class="backgroundBlockI">
  </div>
  <div class="backgroundBlockII">
  </div>
  <div class="contentWrapperIntro pb-20 pt-40">
    <h1 class="">PUBLICATIONS</h1>
    <img class="" src="/rasllogow.svg"/>
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
      genericData: 'generic component text'
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
<style scoped lang="scss">
.indexintro {
  .contentWrapperIntro{
    display: inline-block;
    h1{
      float: left;
    }
    img{
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
        // line-height: 9vw;
          line-height: 90vh;
        letter-spacing: -0.5vw;
         animation-name: example;
         animation-duration: 2s;
         animation-delay: 3s;
         animation-fill-mode: forwards;
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
