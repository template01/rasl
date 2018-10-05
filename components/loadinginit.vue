<template>
<transition name="fade">
  <div v-if="!appinitated" class="loadinginit huge-letters">
    <div class="columns is-mobile halfHeight is-marginless">
      <transition name="slide-fade-vertical">
        <div v-if="top" class="column  pink-background">
          <div>
            PUBLICATIONS
          </div>
        </div>
      </transition>
    </div>
    <div class="columns is-mobile halfHeight is-marginless">
      <transition name="slide-fade-horizontal-left">
        <div v-if="bottomLeft" class="column is-8 lightblue-background">
          <div>
            RASL
          </div>
        </div>
      </transition>
      <transition name="slide-fade-horizontal-right">
        <div v-if="bottomRight" class="column is-4 green-background">
          <div>
            .NU
          </div>
        </div>
      </transition>
    </div>
  </div>
</transition>
</template>
<script>
import pageheader from '~/components/pageheader'
import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  components: {
    pageheader
  },
  data: function() {
    return {
      genericData: 'generic component text',
      top: true,
      bottomLeft: true,
      bottomRight: true,
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },
  mounted() {
    var vm = this
    setTimeout(function() {
      vm.bottomRight = false
    }, 1400)
    setTimeout(function() {
      vm.top = false
    }, 1500)
    setTimeout(function() {
      vm.bottomLeft = false
    }, 1700)
    setTimeout(function() {
      vm.$store.commit('SET_APPINITIATED', true)
    }, 2000)
  }

}
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}
/* .fade-leave-active below version 2.1.8 */
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.loadinginit {
    background: transparent;
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.halfHeight {
    height: 50%;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-horizontal-right-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-horizontal-right-leave-active {
    transition: all 0.3s ease-in-out;
}
/* .slide-fade-horizontal-right-leave-active below version 2.1.8 */
.slide-fade-horizontal-right-enter,
.slide-fade-horizontal-right-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.slide-fade-horizontal-left-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-horizontal-left-leave-active {
    transition: all 0.3s ease-in-out;
}
/* .slide-fade-horizontal-right-leave-active below version 2.1.8 */
.slide-fade-horizontal-left-enter,
.slide-fade-horizontal-left-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}


/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-vertical-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-vertical-leave-active {
    transition: all 0.3s ease-in-out;
}
/* .slide-fade-horizontal-right-leave-active below version 2.1.8 */
.slide-fade-vertical-enter,
.slide-fade-vertical-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

</style>
