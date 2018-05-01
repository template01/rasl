<template>
<div class="">
  <div class="pointer hoverselect">
    <input @click="toggleSelected(); $emit('removeprintitem')" id="checkBox" type="checkbox" :value="postid" :id="postid" v-model="isselected">
    <label v-if="isselected.length===0" :for="postid" class=""><img class="rasl-icon pointer" :src="'/icons/rasl_plus.svg'" /></label>
    <label v-else :for="postid"><img class="rasl-icon pointer" :src="'/icons/rasl_minus.svg'" /></label>
    <span v-if="!hidehelpers" :class="isselected.length===0 ? '':'hideit' " class="addtoselection" style=""><span class=" ml-5 pr-10 pl-10" style="padding-top:0px; padding-bottom:5px">add to section </span></span>
  </div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import _ from 'lodash'


export default {
  props: ['postid', 'posttype','hidehelpers'],
  data: function() {
    return {
      genericData: 'generic component text',
      selectedItem: [],
      isselected: [],
    }
  },
  methods: {
    checkIfSelected: function(){
      var item = this.selected.find(item => item.postid === this.postid && item.posttype === this.posttype);
      if (item != null){
        this.isselected = [this.postid]
      }else{
        this.isselected = []
      }
    },
    toggleSelected: function() {
      if (this.isselected.length > 0) {

        this.$store.dispatch('TRIGGER_REMOVESELECTED', {
          'postid': this.postid,
          'posttype': this.posttype
        })
      } else {
        this.$store.dispatch('TRIGGER_ADDSELECTED', {
          'postid': this.postid,
          'posttype': this.posttype
        })

      }
    }
  },
  created(){
    this.checkIfSelected()
  },
  watch: {
    selected: function() {
      this.checkIfSelected()
    }
  },
  computed: {
    ...mapGetters({
      selected: "GET_SELECTED",
    }),
  },

}
</script>
<style scoped lang="scss">
input{
  display: none;
}
.hoverselect{

  &:hover{
    .addtoselection{
      max-width: 200px;
      &.hideit{
        max-width: 0px;
      }
    }

    // display: none;
  }

}
.addtoselection{
  vertical-align: middle;
  max-width: 0px;
  overflow: hidden;
  white-space: nowrap;
  transition: max-width 0.5s ease-in-out;
  display: inline-block;
  height: 40px;
  span{
    border: 2px solid $black;
    border-radius: 20px;
  }
}
</style>
