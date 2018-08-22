<template>
<div class="contentwrapper">
  {{footnotes}}
  <div v-for="item in content">
    <contenttextphoto v-if="item.acf_fc_layout === 'textphoto'" :printversion="printversion" :content="item.content"></contenttextphoto>
    <contentvideo :coverimage="item.coverimage" v-if="item.acf_fc_layout === 'video' && !printversion" :printversion="printversion" :content="item.content"></contentvideo>
    <contentaudio v-if="item.acf_fc_layout === 'audiopodcast' && !printversion" :printversion="printversion" :content="item.content"></contentaudio>
    <contentsmalltextcolumn v-if="item.acf_fc_layout === 'smalltextcolumns'" :printversion="printversion" :content="item.content"></contentsmalltextcolumn>
  </div>
  <!-- <div :class="printversion ? 'is-12':'is-6 is-offset-3'">
    <div class="is-size-4-desktop is-size-6-touch" >
      {{content}}
    </div>
  </div> -->
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

export default {
  components:{
    contenttextphoto,
    contentaudio,
    contentvideo,
    contentsmalltextcolumn
  },
  props: ['content','printversion'],
  data: function() {
    return {
      footnotes:'no foot notes'
    }
  },
  mounted(){
    // this.footnotes = 'test'
    // alert()
    // window.status='done'
  },
  methods: {},
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
