<template>
  <div class="p-40 indexintro">
    <h1>PUBLICATIONS</h1>
  </div>
</template>
<script>

import {
  mapGetters
} from 'vuex'


export default {
  props:[],
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
  .indexintro{
    background: green;
    h1{
      font-size: 12vw;
      line-height:9vw;
      letter-spacing: -0.5vw;
    }
  }
</style>
