<template>
<div class="contentwrapper">
  <div v-for="item in content">
    <contenttextphoto v-if="item.acf_fc_layout === 'textphoto'" :printversion="printversion" :content="item.content"></contenttextphoto>
    <contentvideo :coverimage="item.coverimage" v-if="item.acf_fc_layout === 'video' && !printversion" :printversion="printversion" :content="item.content"></contentvideo>
    <contentaudio v-if="item.acf_fc_layout === 'audiopodcast' && !printversion" :printversion="printversion" :content="item.content"></contentaudio>
    <contentsmalltextcolumn v-if="item.acf_fc_layout === 'smalltextcolumns'" :printversion="printversion" :content="item.content"></contentsmalltextcolumn>
  </div>
  <footnotes :printversion="printversion" :content="footnotes"></footnotes>

</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'

import contenttextphoto from "~/components/read/contenttextphoto"
import contentaudio from "~/components/read/contentaudio"
import contentvideo from "~/components/read/contentvideo"
import contentsmalltextcolumn from "~/components/read/contentsmalltextcolumn"
import footnotes from "~/components/read/footnotes"

export default {
  components:{
    contenttextphoto,
    contentaudio,
    contentvideo,
    contentsmalltextcolumn,
    footnotes,
  },
  props: ['content','printversion','footnotes'],
  data: function() {
    return {
    }
  },
  mounted(){
  },
  methods: {},
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
