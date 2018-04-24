<template>
<div class="pt-20">
  <div  class="wrapper" v-for="filteritem in filtertype">
    <div class="p-20 mb-10">
    <label class="">
        <input @click="setfilterby(filtername)" v-model="selectedItems" :value="filteritem.slug" id="checkBox" type="checkbox">
        <span  class="p-20 outer-filter" v-html="filteritem.name"></span>

    </label>
  </div>
  </div>
  <!-- slected: {{selectedItems}} -->
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
      active: false
    }
  },
  methods: {
    setfilterby(filtername) {
      this.active = true
      this.$store.commit('SET_FILTERBY', filtername)
    },
    checkIfSelected: function() {
      if (this.filterby === this.filtername) {
        var selected = ''
        if (Array.isArray(this.filters)) {
          selected = this.filters
        } else {
          selected = [this.filters]
        }
        this.selectedItems = selected
      }
    },
  },
  watch: {
    'filterby': function() {
      if (this.filterby != this.filtername) {
        this.selectedItems = []
      }
    },
    'selectedItems': function() {
      if (this.filterby === this.filtername && this.active) {
        this.$store.dispatch('TRIGGER_FILTERCONTENTBY', {
          'items': this.selectedItems,
          'name': this.filtername
        })
      }
    }
  },
  created() {
    this.checkIfSelected()
  },
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
      filterby: "GET_FILTERBY",
      filters: "GET_FILTERS"
    }),
  },

}
</script>
<style scoped lang="scss">
.wrapper{
  float: left;
}
input{
  display: none;
}
input[type=checkbox]:checked + .outer-filter {
  background: $white;
  border: 2px solid $white;

}
.outer-filter{
  min-width: 50px;
  border: 2px solid $black;
  border-radius: 100px;

}
</style>
