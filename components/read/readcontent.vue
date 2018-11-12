<template>
<div class="contentwrapper readcontent container is-fullhd" :class="printversion?'printversion':''">
  <div class="readcontentItem" v-for="(item,index) in content">
    <contentslideshow :type="type" v-if="item.acf_fc_layout === 'slideshow'"  :printversion="printversion" :captioncredit="item.captioncredit" :content="item.content"></contentslideshow>
    <contentquote :type="type" v-if="item.acf_fc_layout === 'largequote'"  :printversion="printversion" :content="item.content"></contentquote>
    <contenttextphoto class="pt-40" v-if="item.acf_fc_layout === 'textphoto'" :printversion="printversion" :content="item.content"></contenttextphoto>
    <contentvideo class="pt-40" :coverimage="item.coverimage" v-if="item.acf_fc_layout === 'video' && !printversion" :printversion="printversion" :content="item.content"></contentvideo>
    <contentaudio class="pt-40" v-if="item.acf_fc_layout === 'audiopodcast' && !printversion" :printversion="printversion" :content="item.content"></contentaudio>
    <contentsmalltextcolumn class="pt-40" v-if="item.acf_fc_layout === 'smalltextcolumns'" :printversion="printversion" :content="item.content"></contentsmalltextcolumn>
  </div>
  <footnotes v-if="footnotes" :printversion="printversion" :content="footnotes"></footnotes>
  <references v-if="references" :type="type" :printversion="printversion" :content="references"></references>
  <div v-if="printversion" class="endCircle">
  </div>
  <style v-if="type ==='practice'">.readcontent .wp-caption, .readcontent .contentquote, .readcontent .largecolorblock, .readcontent .colorblock{ color: red !important; }
  </style>
  <style v-if="type ==='reflective'">.readcontent .wp-caption, .readcontent .contentquote, .readcontent .largecolorblock, .readcontent .colorblock{ color: #44ae7b !important; }
  </style>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'

import contenttextphoto from "~/components/read/contenttextphoto"
import contentquote from "~/components/read/contentquote"
import contentslideshow from "~/components/read/contentslideshow"
import contentaudio from "~/components/read/contentaudio"
import contentvideo from "~/components/read/contentvideo"
import contentsmalltextcolumn from "~/components/read/contentsmalltextcolumn"
import footnotes from "~/components/read/footnotes"
import references from "~/components/read/references"

export default {
  components: {
    contentslideshow,
    contenttextphoto,
    contentquote,
    contentaudio,
    contentvideo,
    contentsmalltextcolumn,
    footnotes,
    references,
  },
  props: ['content', 'printversion', 'footnotes','references', 'type'],
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

.printversion{
  blockquote{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  // .readcontentItem{
  //   display: inline-block;
  // }
}
.readcontent {

    .simple-footnote{
      margin-left: -5px;
    }

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
        font-size: 27.2px;
        text-decoration: none;
        // border-bottom: 2px solid black;
        // width: 100%;
        margin-left: 20px;
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

    @media screen and (max-width: 1023px){

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
          font-size: 16px;
          text-transform: uppercase;
          margin-left: 0px;

      }

      p {
          text-indent: 0px !important;
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
        text-indent: 20px;
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
      margin-left: 20px;
      margin-right: 20px;
    }
    .endCircle {
        background: black;
        width: 8mm;
        height: 8mm;
        margin-right: 20px;
        border-radius: 100%;
        float: right;
        page-break-inside: avoid;
        page-break-before: avoid;
        page-break-after: avoid;
    }
}
</style>
