<template>
<div>
  <loadinginit></loadinginit>
  <transition name="fader">
    <div v-if="!loading">
      <nuxt/>
    </div>
  </transition>
</div>
</template>



<script>
import loadinginit from '~/components/loadinginit'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    loadinginit
  },
  computed: {
    ...mapGetters({
      loading: "GET_LOADING",
    }),
  },
}
</script>

<style scoped lang="scss">
.fader-enter-active,
.fader-leave-active {
    transition: all 1s;
}
.fader-enter-to,.fader-leave-to{
  max-height: 100vh;
  min-height: 100vh;
}
.fader-enter,
.fader-leave-to {
    transform: translate3d(0,100%,0);

}
</style>
