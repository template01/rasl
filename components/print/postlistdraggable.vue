<template>
<div class="">
  <draggable @start="drag=true" v-model="myArray" @end="drag=false">
    <transition-group name="list-complete">
      <div class="singleitem list-complete-item" :key="postdata.id" v-for="(postdata, index) in myArray">
        <hr v-if="index === 0"/>
        <div class="singleitemInner columns is-marginless is-size-5   ">
          <div class="column is-1 sort">
            <img class="rasl-icon" :src="'/icons/rasl_drag.svg'" />
          </div>
          <div class="column is-10 Aligner Aligner-left">
            <p class="is-size-4">
              {{postdata.title.rendered}}
            </p>
          </div>
          <div class="column is-1">
            <selectpost class="is-pulled-right" :hidehelpers="true" v-on:removeprintitem="removethis(index)" :posttype="postdata.type" :postid="postdata.id"></selectpost>
          </div>
        </div>
        <hr />
      </div>

    </transition-group>
  </draggable>

</div>
</template>
<script>
import postindex from '~/components/postIndex'
import draggable from 'vuedraggable'
import selectpost from '~/components/selectpost'

var URI = require('urijs');


import {
  mapGetters
} from 'vuex'


export default {
  props: ['display'],
  data: function() {
    return {
      myArray: [],
      prepareforstoreselected: [],
      genericData: 'generic component text'
    }
  },
  components: {
    postindex,
    draggable,
    selectpost
  },
  created() {
    this.myArray = this.display
  },
  methods: {

    removethis: function(index) {
      this.myArray.splice(index, 1);
    }
  },
  watch: {
    'myArray': function() {
      this.$store.dispatch('TRIGGER_SELECTED', this.myArray)
    }
  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
      selectedStore: "GET_SELECTED"
    }),
  },

}
</script>
<style scoped lang="scss">
.sort {
    cursor: move;
}
.list-complete-item {
    transition: all 0.25s;
}

.list-complete-enter,
.list-complete-leave-active {
    opacity: 0;
}
.sortable-chosen{
 background: wheat !important;
}
.singleitem{
  background: $white;
  hr{
    margin:  0 !important;
  }
  .singleitemInner{
    margin-bottom: 0 !important;
  }
}

</style>
