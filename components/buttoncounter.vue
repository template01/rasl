<template>
  <span  class="outer">
    <!-- {{selectedLength}} -->
      <span class="overlay"  :class="$mq != 'lg' ? 'is-size-6':'is-size-5'" :style="[$mq != 'lg' ? {'padding-left': '6px','padding-top':'4px'}:{'padding-left': '7px','padding-top':'6px'}, isinmenu && $mq === 'lg' ? {'line-height':'4.5rem'}:{}, isinmenu && $mq != 'lg' ? {'line-height':'34px'}:{}]"><span>{{selected.length}}</span></span>
      <transition name="bounce">
    <img :style="[isinmenu && $mq === 'lg' ? {'margin-top':'-6px'}:{}, isinmenu && $mq != 'lg' ? {'margin-top':'-4px'}:{}]" v-if="!update" class=" rasl-icon" :src="'/icons/rasl_folder.svg'" />
  </transition>
  </span>
</template>
<script>
import {
  mapGetters
} from 'vuex'


export default {
  props: ['isinmenu'],
  data: function() {
    return {
      genericData: 'generic component text',
      update: false,
      selectedLength: 0
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      selected: "GET_SELECTED",
    }),
  },
  mounted(){
    this.selectedLength = this.selected.length
  },
  watch: {
    // selected: function() {
    //   console.log( this.selected.length)
    //     console.log('giiiiiii')
    //     var vm = this
    //     if(this.selectedLength === this.selected.length){
    //       this.update = false
    //
    //     }else{
    //
    //       this.update = true
    //     }
    //     // this.selectedLength = this.selected.length
    //
    //
    //     setTimeout(function() {
    //       vm.update = false
    //     }, 250)
    // }
  }

}
</script>
<style scoped lang="scss">
.bounce-enter-active {
  // animation: bounce-in 2s;
  animation: blink-animation 0.3s;
-webkit-animation: blink-animation 0.3s
}
.bounce-leave-active {
  animation: blink-animation 0.3s reverse;
-webkit-animation: blink-animation 0.3s reverse
  // animation: bounce-in 2s reverse;
  // animation: blink-animation 0.5s infinite;
// -webkit-animation: blink-animation 0.5s infinite
}

@keyframes blink-animation {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
@-webkit-keyframes blink-animation {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.outer {
    position: relative;
}
.overlay {
    position: absolute;
    // right: 0;
    width: 100%;
    // margin: 0 auto;
    text-align: center;
    transition: all 0.25s;

    &.scaleit {
        transform: scale(1.1);
    }
}
</style>
