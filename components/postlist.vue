<template>
<div class="">
  <ul>
    <li class="is-size-4" :key="postdata.id" v-for="postdata in display">
      <postindex :postdata="postdata"></postindex>
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
  props: ['display','left'],
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
