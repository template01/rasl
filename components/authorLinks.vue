<template>
<span class="authorLinks">
    <!-- By: -->
    <!-- <nuxt-link v-for="(author, index) in authors" :to="'/authors/'+author.post_name+windowsearch">
      <span v-if="index===authors.length-1 && authors.length>1"> and </span>
      <span v-html="author.post_title"></span>
      <span v-if="index>0 && index<authors.length-1">, </span>
    </nuxt-link> -->


    <span v-for="(author, index) in authors" :to="'/authors/'+author.post_name+windowsearch">
      <span v-if="index===authors.length-1 && authors.length>1"> and </span>
      <nuxt-link :to="'/authors/'+author.post_name+windowsearch">
        <span ><span v-html="author.post_title"></span><span v-if="index>0 && index<authors.length-1">,</span></span>

      </nuxt-link>


    </span>

</span>
</template>
<script>
import {
  mapGetters
} from 'vuex'


export default {
  props: ['authors'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
    }),
  },

}
</script>
<style scoped lang="scss">
.authorLinks{
  a{
    display: inline-block;
  }
}
*{
  color: inherit;
}
</style>
