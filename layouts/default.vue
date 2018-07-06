<template>
<div>
  <!-- <loadinginit></loadinginit> -->
  <!-- <transition name="fader"> -->
    <!-- <div v-if="!loading"> -->
      <!-- <nuxt/> -->
    <!-- </div> -->
  <!-- </transition> -->
  <div class="menuToggle">

    <div class="column ">
        <span class="fixedMenu">
          <transition name="slide-fade" mode="out-in">
           <!-- <p v-if="update" key="1">
             hello
           </p>
           <p v-else key="2">
             damng
           </p> -->
           <span key="1" class="pointer" v-if="update" @click="$store.commit('menu/SET_TOGGLE',true); layerMenu($store.state.menu.toggle)">
             <buttoncounter  ></buttoncounter>
           </span>
           <span key="2" v-else>
         <span class="pointer" v-if="!$store.state.menu.toggle" @click="$store.commit('menu/SET_TOGGLE',true); layerMenu($store.state.menu.toggle)"><img class="rasl-icon" :src="'/icons/rasl_menu.svg'" /> </span>
         <span class="pointer" v-else @click=" $store.commit('menu/SET_TOGGLE',false); layerMenu($store.state.menu.toggle)"><img class="rasl-icon" :src="'/icons/rasl_close.svg'" /></span>
         </span>
       </transition>
        </span>
    </div>
  </div>
  <div class="menu" :style="{'z-index':zindexMenu}">
    <menucontent>

    </menucontent>
  </div>
  <div class="main" :class="$store.state.menu.toggle ? 'slideLeft':''">
    <nuxt/>
  </div>

</div>
</template>



<script>
import menucontent from '~/components/menucontent'
import loadinginit from '~/components/loadinginit'
import buttoncounter from '~/components/buttoncounter'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    loadinginit,
    buttoncounter,
    menucontent,
  },
  computed: {
    ...mapGetters({
      loading: "GET_LOADING",
      selected: "GET_SELECTED",

    }),
  },
  data: function(){
    return{
      zindexMenu :-1,
      update: false,
    }
  },
  methods:{
    layerMenu: function(isOpen){
      var vm = this
    if(isOpen){
      setTimeout(function(){
        vm.zindexMenu = 100
      },250)
    }else{
      vm.zindexMenu = -1
    }
    }
  },
  watch:{
    selected: function() {
      console.log('giiiiiii')
      var vm = this
      if(this.selectedLength === this.selected.length){
        this.update = false

      }else{

        this.update = true
      }
      // this.selectedLength = this.selected.length


      setTimeout(function() {
        vm.update = false
      }, 1000)
    },
    '$route':function(){
      this.$store.commit('menu/SET_TOGGLE',false);
      this.layerMenu(this.$store.state.menu.toggle)
    }
  }
}
</script>

<style scoped lang="scss">

.menu{
  width: 50%;
  background: $green;
  float: left;
  position: fixed;
  height: 100%;
  right: 0;
  top: 0;
  z-index: -1;
  &.zindex-reset{
    z-index: 100;
  }
}
.menuToggle{
  position: fixed;
  right: 0;
  top: 0;
  z-index: 101;
  .fixedMenu{
    margin-right: 40px;
  }

}

.main{
  z-index: 100;
  // background: white;
  transition: transform 0.25s;
  overflow-x: hidden;
}
.slideLeft{
  transform: translateX(-50%);
  user-select: none;
  pointer-events: none
  // margin-right: 50%;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .25s ease;
}
.slide-fade-leave-active {
  transition: all .25s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-100px);
  opacity: 0;
}

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
