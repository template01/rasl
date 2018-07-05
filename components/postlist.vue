<template>
<div class="">
  <ul>
    <li class="" :key="postdata.id" v-for="(postdata, index) in display" >
      <postindex v-if="!featured" :postdata="postdata"></postindex>

    </li>
  </ul>
</div>
</template>
<script>
import postindex from '~/components/postIndex'
import {
  mapGetters
} from 'vuex'


export default {
  props: ['display','featured'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  components:{
    postindex
  },
  methods: {},
}
</script>
<style scoped lang="scss">

</style>
