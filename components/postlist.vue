<template>
<div class="">
  <ul>
    <li class="" :key="postdata.id" v-for="(postdata, index) in display" >
      <postindex v-if="!featured" :postdata="postdata"></postindex>
      <postindexfeatured :class="index != 0 ? 'pt-40':'pt-20'" v-if="featured" :postdata="postdata"></postindexfeatured>
    </li>
  </ul>
</div>
</template>
<script>
import postindex from '~/components/postIndex'
import postindexfeatured from '~/components/postIndexFeatured'
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
    postindex,
    postindexfeatured
  },
  methods: {},
}
</script>
<style scoped lang="scss">

</style>
