<template>
<span class="outer"><span :class="scale?'scaleit':''" class="overlay is-size-5" style="padding-left: 7px; padding-top:6px">{{selected.length}}</span><img class=" rasl-icon" :src="'icons/rasl_folder.svg'" /></span>
</template>
<script>
import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  data: function() {
    return {
      genericData: 'generic component text',
      scale: false,
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      selected: "GET_SELECTED",
    }),
  },
  watch:{
    selected:function(){
      var vm = this
      this.scale = true
      setTimeout(function(){
        vm.scale=false
      },250)
    }
  }

}
</script>
<style scoped lang="scss">
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

    &.scaleit{
      transform: scale(1.1);
    }
}

</style>
