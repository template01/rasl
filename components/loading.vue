<template lang="html">
  <div class="loading-page" v-if="loading">
    <transition name="fade">
    <div v-if="startanimationI" class="loadingBlock">
    </div>
  </transition>
  <transition name="fade">
    <div v-if="startanimationII" class="loadingBlock">
    </div>
  </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    startanimationI: false,
    startanimationII: false
  }),
  methods: {
    randDelay: function(){
      return Math.floor(Math.random() * Math.floor(250));
    },
    start() {
      this.loading = true
      var vm = this

      setTimeout(function() {
        vm.startanimationI =  true
      }, Math.floor(Math.random() * Math.floor(250)))
      setTimeout(function() {
        vm.startanimationII =  true
      }, Math.floor(Math.random() * Math.floor(250)))
    },
    finish() {
      var vm = this
      setTimeout(function() {
        setTimeout(function() {
          vm.startanimationI = false
        }, Math.floor(Math.random() * Math.floor(250)))
        setTimeout(function() {
          vm.startanimationII = false
        }, Math.floor(Math.random() * Math.floor(250)))

      }, 250)
      setTimeout(function() {
        vm.loading = false
      }, 800)
    }
  }
}
</script>

<style scoped lang="scss">

.fade-enter-active {
    transition: transform 0.4s;
    transform: translate3d(0%,0,0);
}
.fade-leave-active{
  transition: all 0.5s;
  transform: translate3d(100%,0,0);

}
.fade-enter,
{
    transform: translate3d(-100%,0,0);
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

.loading-page {
  // background: wheat;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 200px;
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
</style>
