<template>
<div class="printpostOuter">
  <div class="metaWrapperSide">
    <div class="metaRotate is-size-3-desktop is-size-6-touch uppercase">
      <span>
      {{'publications.rasl.nu'+ '/' + 'read' + '/' + postdata.type + '/' + postdata.slug}}
    </span>
    </div>
  </div>
  <div class="printpost">
    <p class="is-size-3-desktop is-size-6-touch uppercase" v-html="postdata.type">
    </p>
    <p class="pt-10 pb-10 margin-left-compensation is-size-1-desktop is-size-1-touch uppercase" v-html="postdata.title.rendered">
    </p>
    <p v-show="postdata.acf.author" class="margin-left-compensation is-size-3-desktop is-size-4-touch">
      <span>By</span>
      <authorlinks :authors="postdata.acf.author"></authorlinks>
      <div class="pt-20 is-size-3-desktop is-size-6-touch" v-if="postdata.pure_taxonomies">
        <span v-for="(item,index) in postdata.pure_taxonomies.tags">
        {{item.name}}
        {{index< postdata.pure_taxonomies.tags.length-1 ? '●':''}}
      </span>
    </div>
    </p>
    <div class="inner-content">
      <readcontent  :references="postdata.acf.references" :footnotes="footnoteSingle" :printversion="true" :content="postdata.acf.contentbuilder"></readcontent>

    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import selectpost from '~/components/selectpost'
import readcontent from '~/components/read/readcontent'
import authorlinks from '~/components/authorLinks'


export default {
  props: ['postdata', 'footnoteSingle'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  methods: {

  },

  components: {
    selectpost,
    readcontent,
    authorlinks
  },
  updated() {},
  mounted() {

  },
  computed: {
    ...mapGetters({
      featuredPosts: "GET_FEATUREDPOSTS",
      reflectivePosts: "GET_REFLECTIVEPOSTS",
      practicePosts: "GET_PRATICEPOSTS",
    }),
  },

}
</script>
<style lang="scss">
.margin-left-compensation {
    margin-left: -1mm;
}

.printpostOuter {
    position: relative;
    min-height: 26cm;

    .metaWrapperSide {
        position: absolute;
        left: 0;
        top: 3.5cm;
        min-width: 33cm;
        text-align: left;
        .metaRotate {

            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            // EQAL HOOGTE VAN WRAPPER
            margin-left: 48px;

            -webkit-transform-origin: top left;
            transform-origin: top left;
        }
    }


    .is-size-6,
    .is-size-6-touch {
        font-size: 14pt !important;
    }

    .is-size-1-desktop,
    .is-size-1-touch {
        line-height: 0.9;
    }

    .printpost {

        margin-left: 3.5cm;

        .inner-content {

            padding-top: 2cm;
            margin: 0 auto 0 0;
            text-align: left;

            p {
                // display: none !important;
                margin-left: 5cm;
                line-height: 1.3 !important;
                letter-spacing: 0 !important;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                margin-left: 5.5cm;
                margin-top: 5mm;
                // text-indent: 6cm;

            }
            pre {
                margin-left: 5cm;
            }

            h1 + p,
            h2 + p,
            h3 + p,
            h4 + p,
            h5 + p,
            h6 + p {

                text-indent: 0;

            }
            p:first-of-type{
              text-indent: 0;
            }

            p {
              text-indent: 0.5cm !important;
            }

        }

    }

}
</style>
