<template>
<div>
  <!-- <loadinginit></loadinginit> -->
  <!-- <transition name="fader"> -->
    <!-- <div v-if="!loading"> -->
      <!-- <nuxt/> -->
    <!-- </div> -->
  <!-- </transition> -->
  <transition name="fade">
  <div v-if="appinitated" class="menuToggle pt-20">
    <div class="column ">
        <span class="fixedMenu">
          <transition name="slide-fade" mode="out-in">
           <span key="1" class="pointer" v-if="update" @click="$store.commit('menu/SET_TOGGLE',true)">
             <buttoncounter  ></buttoncounter>
           </span>
           <span key="2" v-else>
         <span class="pointer" v-if="!$store.state.menu.toggle" @click="$store.commit('menu/SET_TOGGLE',true)"><img class="rasl-icon" :src="'/icons/rasl_menu.svg'" /> </span>
         <span class="pointer" v-else @click=" $store.commit('menu/SET_TOGGLE',false)"><img class="rasl-icon" :src="'/icons/rasl_close.svg'" /></span>
         </span>
       </transition>
        </span>
    </div>
  </div>
  </transition>
    <div class="menu lightgrey-background" :style="{'z-index':zindexMenu}">

    <menucontent>

    </menucontent>
  </div>
  <div class="main" @click=" $store.commit('menu/SET_TOGGLE',false)" :class="$store.state.menu.toggle ? 'slideLeft':''">
    <nuxt/>
    <pagefooter></pagefooter>
  </div>

</div>
</template>



<script>
import menucontent from '~/components/menucontent'
import loadinginit from '~/components/loadinginit'
import buttoncounter from '~/components/buttoncounter'
import pagefooter from '~/components/pagefooter'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    loadinginit,
    buttoncounter,
    pagefooter,
    menucontent,
  },
  computed: {
    ...mapGetters({
      loading: "GET_LOADING",
      selected: "GET_SELECTED",
      appinitated: "GET_APP_INITIATED",
      menuOpen: "menu/GET_TOGGLE"
    }),
  },
  data: function(){
    return{
      zindexMenu :-1,
      update: false,
      opacity:0
    }
  },
  methods:{
    layerMenu: function(isOpen){
      var vm = this
    if(isOpen){

      this.opacity=1
      setTimeout(function(){
        vm.zindexMenu = 100
      },250)
    }else{
      this.opacity=0
      vm.zindexMenu = -1
    }
    }
  },
  created(){
    if(this.$route.path != '/'){
      this.$store.commit('SET_APPINITIATED', true)
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
      // console.log(this.$route.query)
      if(this.$route.query.library){
        setTimeout(function(){
          window.scroll({ top: document.querySelector('#library').offsetTop, left: 0, behavior: 'smooth' });
        },1500)
      }
    },
    menuOpen:function(state){
      this.layerMenu(this.$store.state.menu.toggle)
    }
  }
}
</script>

<style scoped lang="scss">

.menu{
  width: 800px;
  // background: $green;
  float: left;
  position: fixed;
  height: 100%;
  right: 0;
  top: 0;
  z-index: -1;
  &.zindex-reset{
    // z-index: 100;
  }
// box-shadow: inset 10px 0px 20px -10px rgba(0,0,0,1);
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
  // box-shadow: 10px 0px 20px -10px rgba(0,0,0,1);
  z-index: 100;
  min-height: 100vh;
  // background: white;
  transition: transform 0.25s;
  overflow-x: hidden;
  overflow-y: hidden;
}
.slideLeft{
  transform: translateX(-800px);
  // user-select: none;
  // pointer-events: none;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
