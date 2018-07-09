<template>
    <span class="loadingindicator is-size-4">
      &nbsp;
    </span>
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
  .loadingindicator{
    vertical-align: middle;
    border-radius: 100%;
    background: $black;
    width: 33px;
    color: $white;
    text-align: center;
    display: inline-block;
    animation: pulse 1s infinite;
    opacity: 0;
    animation-direction: forwards;
  }


@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
