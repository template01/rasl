<template>
<div class="">
  <div v-for="filteritem in filtertype">
    <label @click="setfilterby(filtername)" v-html="filteritem.name"></label>
    <input @click="setfilterby(filtername)" v-model="selectedItems" :value="filteritem.slug" id="checkBox" type="checkbox">
  </div>
  slected: {{selectedItems}}
</div>
</template>
<script>
var URI = require('urijs');
import {
  mapGetters,
  mapMutations
} from 'vuex'


export default {
  props: ['filtertype', 'filtername'],
  data: function() {
    return {
      genericData: 'generic component text',
      selectedItems: [],
    }
  },
  methods: {
    setfilterby(filtername){
       this.$store.commit('SET_FILTERBY',filtername)

    }
  },
  watch: {
    'filterby':function(){
      if(this.filterby != this.filtername){
        this.selectedItems = []
      }
    },
    'selectedItems': function() {
      // console.log(this.filterby)
      console.log(this.filtername)


      if(this.filterby === this.filtername){
        this.$store.dispatch('TRIGGER_FILTERCONTENTBY',{'items':this.selectedItems,'name':this.filtername})
      }
    }
  },
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
      filterby: "GET_FILTERBY",
    }),
  },

}
</script>
<style scoped lang="scss">
.VueToNuxtLogo {
    display: inline-block;
    animation: turn 2s linear forwards 1s;
    transform: rotateX(180deg);
    position: relative;
    overflow: hidden;
    height: 180px;
    width: 245px;
}

.Triangle {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
}

.Triangle--one {
    border-left: 105px solid transparent;
    border-right: 105px solid transparent;
    border-bottom: 180px solid #41B883;
}

.Triangle--two {
    top: 30px;
    left: 35px;
    animation: goright 0.5s linear forwards 3.5s;
    border-left: 87.5px solid transparent;
    border-right: 87.5px solid transparent;
    border-bottom: 150px solid #3B8070;
}

.Triangle--three {
    top: 60px;
    left: 35px;
    animation: goright 0.5s linear forwards 3.5s;
    border-left: 70px solid transparent;
    border-right: 70px solid transparent;
    border-bottom: 120px solid #35495E;
}

.Triangle--four {
    top: 120px;
    left: 70px;
    animation: godown 0.5s linear forwards 3s;
    border-left: 35px solid transparent;
    border-right: 35px solid transparent;
    border-bottom: 60px solid #fff;
}

@keyframes turn {
    100% {
        transform: rotateX(0deg);
    }
}

@keyframes godown {
    100% {
        top: 180px;
    }
}

@keyframes goright {
    100% {
        left: 70px;
    }
}
</style>
