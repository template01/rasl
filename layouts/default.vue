<template>
<div>
  <main>
    <nuxt/>
  </main>
</div>
</template>



<script>
import {
  mapGetters
} from 'vuex'


export default {
  // transition (to, from) {
  //
  //   if (!from) return 'slide-left'
  //   return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  // }
  transition: 'test',
  methods:{
    beforeLeave:function(){
      alert('befire leave')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
