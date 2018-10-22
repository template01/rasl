<template>
<div class="contentwrapper readcontent">
  <div v-for="(item,index) in content">
    <contenttextphoto v-if="item.acf_fc_layout === 'textphoto'" :printversion="printversion" :content="item.content"></contenttextphoto>
    <contentvideo :coverimage="item.coverimage" v-if="item.acf_fc_layout === 'video' && !printversion" :printversion="printversion" :content="item.content"></contentvideo>
    <contentaudio v-if="item.acf_fc_layout === 'audiopodcast' && !printversion" :printversion="printversion" :content="item.content"></contentaudio>
    <contentsmalltextcolumn v-if="item.acf_fc_layout === 'smalltextcolumns'" :printversion="printversion" :content="item.content"></contentsmalltextcolumn>
  </div>
  <footnotes v-if="footnotes" :printversion="printversion" :content="footnotes"></footnotes>
  <div v-if="printversion" class="endCircle">
  </div>
  <style v-if="type ==='practice'">.readcontent .wp-caption{ color: red !important; }
  </style>
  <style v-if="type ==='reflective'">.readcontent .wp-caption{ color: #44ae7b !important; }
  </style>
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
  components: {
    contenttextphoto,
    contentaudio,
    contentvideo,
    contentsmalltextcolumn,
    footnotes,
  },
  props: ['content', 'printversion', 'footnotes', 'type'],
  data: function() {
    return {}
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
<style lang="scss">
.readcontent {

    a {

        /* These are technically the same, but use both */
        overflow-wrap: break-word;
        word-wrap: break-word;

        -ms-word-break: break-all;
        /* This is the dangerous one in WebKit, as it breaks things wherever */
        word-break: break-all;
        /* Instead use this non-standard one: */
        word-break: break-word;

        /* Adds a hyphen where the word breaks, if supported (No Blink) */
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
        text-decoration: underline;
    }

    * {
        color: inherit !important;
    }

    b,
    bold,
    strong {
        text-transform: uppercase;
        font-weight: normal;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        text-decoration: underline;
        // border-bottom: 2px solid black;
        // width: 100%;
        margin-left: 40px;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
        line-height: 1.4;
        b,
        bold,
        strong {
            text-transform: inherit;
            font-weight: inherit;
        }
        & + * {
            margin-top: 10px;
        }

    }

    h1 + p,
    h2 + p,
    h3 + p,
    h4 + p,
    h5 + p,
    h6 + p,
    blockquote + p {

      text-indent: 0px;

        }

    p {
        text-indent: 40px;
    }

    p:first-of-type{
      text-indent: 0;
    }


    ol,
    p {
        line-height: 1.4;
        letter-spacing: 1 !important;
        word-spacing: 20% !important;
        li {
            margin-bottom: 15px;
        }
    }

    blockquote{
      margin-left: 40px;
      margin-right: 40px;
    }
    .endCircle {
        background: black;
        width: 8mm;
        height: 8mm;
        margin-right: 40px;
        border-radius: 100%;
        float: right;
        page-break-inside: avoid;
        page-break-before: avoid;
        page-break-after: avoid;
    }
}
</style>
