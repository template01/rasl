<template>
<div class="mt-80">
  <div class="">
    <draggable @start="drag=true" v-model="myArray" @end="drag=false">
      <transition-group name="list-complete">
        <div class="columns is-size-5 list-complete-item" :key="postdata.id" v-for="postdata in myArray">
          <div class="column is-1 sort">
            =
          </div>
          <div class="column is-10">
            {{postdata.title.rendered}}
            <!-- <postindex :postdata="postdata"></postindex> -->
          </div>
          <div class="column is-1">
            <selectpost :posttype="postdata.type" :postid="postdata.id"></selectpost>
          </div>
        </div>
      </transition-group>
    </draggable>

  </div class="container">
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
  watch: {
    'myArray': function() {
      this.$store.dispatch('TRIGGER_SELECTED', this.myArray)
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
    }),
  },

}
</script>
<style scoped lang="scss">
.sort {
    cursor: move;
}
.list-complete-item {
  padding: 4px;
  margin-top: 4px;
  border: solid 1px;
  transition: all 0.25s;
}

.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
}

</style>
