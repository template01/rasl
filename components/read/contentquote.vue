<template>
<div  class="contentquote columns is-marginless ">
  <div class="column is-8 is-offset-2">
    <div class=" pr-40 pl-40 pt-40 pb-40">
      <div class="content is-size-2-desktop is-size-4-touch" v-html="content">
        <!-- <div class="is-size-4-desktop is-size-6-touch" style="  border: 2px solid black;" v-html="content"> -->
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'


export default {
  props: ['content', 'printversion'],
  data: function() {
    return {
    }
  },


}
</script>
<style lang="scss">
.contentquote {

}
</style>
