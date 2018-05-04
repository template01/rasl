<template>
<div>
  <loadinginit ></loadinginit>
    <nuxt/>
</div>
</template>



<script>
import loadinginit from '~/components/loadinginit'
import {
  mapGetters
} from 'vuex'


export default {
  components:{
    loadinginit
  },

}
</script>

<style scoped lang="scss">


</style>
