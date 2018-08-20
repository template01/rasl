<template>
  <div  class="">
  {{content}}
  </div>
</template>
<script>

import {
  mapGetters
} from 'vuex'


export default {
  props: ['content','printversion'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  methods:{
  },
  computed: {
    ...mapGetters({
     appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
<style scoped lang="scss">

</style>
