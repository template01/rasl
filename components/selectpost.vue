<template>
<div class="">
  <div @click="toggleSelected(); $emit('removeprintitem')"   class="pointer hoverselect is-size-4-desktop is-size-6-touch">
    <input  id="checkBox" type="checkbox" :value="postid" :id="postid" v-model="isselected">
    <label v-if="isselected.length===0" :for="postid" class=""><img class="rasl-icon pointer" :src="'/icons/rasl_plus.svg'" /></label>
    <label v-else :for="postid"><img class="rasl-icon pointer" :src="'/icons/rasl_minus.svg'" /></label>
    <span v-if="!hidehelpers" :class="isselected.length===0 ? '':'hideit' " class="addtoselection is-hidden-touch" style=""><span class="hinter mr-5 pr-10 pl-10 is-size-5" style=""><span class="inner">Collect Article</span></span>
    </span>
  </div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import _ from 'lodash'


export default {
  props: ['postid', 'posttype', 'hidehelpers'],
  data: function() {
    return {
      genericData: 'generic component text',
      selectedItem: [],
      isselected: [],
    }
  },
  methods: {
    test: function(){
      console.log('clicked')
    },
    checkIfSelected: function() {
      var item = this.selected.find(item => item.postid === this.postid && item.posttype === this.posttype);
      if (item != null) {
        this.isselected = [this.postid]
      } else {
        this.isselected = []
      }
    },
    toggleSelected: function() {
      console.log('toggle ')
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
  created() {
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
*{
  color: $black;
}
input {
    display: none;
}
.hoverselect {

    &:hover {

        .addtoselection {
            max-width: 200px;

            // transition-delay: 2s;

            &.hideit {
                max-width: 0px;
            }
        }

        // display: none;
    }

}
.addtoselection {
    max-width: 0;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    display: inline-flex;
    transition: max-width 0.5s ease-in-out;
    transition-delay: 0.5s;
    height: 40px;

    @media only screen and (max-width: 1024px) {
      height: 30px;
    }
    .hinter {
        border: 2px solid $black;
        border-radius: 20px;
        .inner {
            vertical-align: top;
            line-height: 34px;
        }
    }
}
</style>
