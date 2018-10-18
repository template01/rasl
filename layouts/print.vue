<template>
<div class="printlayout">
      <nuxt/>

</div>
</template>



<script>
import {
  mapGetters
} from 'vuex'


export default {
  // mounted(){
  //   var css = 'html { display: none; }',
  //       head = document.head || document.getElementsByTagName('head')[0],
  //       style = document.createElement('style');
  //
  //   style.type = 'text/css';
  //   if (style.styleSheet){
  //     // This is required for IE8 and below.
  //     style.styleSheet.cssText = css;
  //   } else {
  //     style.appendChild(document.createTextNode(css));
  //   }
  //
  //   head.appendChild(style);
  // }
}
</script>

<style scoped lang="scss">
*{
   // background-color: white;
   overflow: hidden;
}

</style>
