<template>
<div class="printpostOuter">
  <div class="metaWrapperSide">
    <div class="metaRotate is-size-6-touch uppercase">
      <span>
      {{'publications.rasl.nu'+ '/' + 'read' + '/' + postdata.type + '/' + postdata.slug}}
    </span>
    </div>
  </div>
  <div class="printpost">
    <p class="is-size-3-desktop is-size-6-touch" v-html="postdata.type">
    </p>
    <p class="is-size-1-desktop is-size-1-touch uppercase" v-html="postdata.title.rendered">
    </p>
    <p class="is-size-1-desktop is-size-1-touch">
      <span>By</span>
      <authorlinks :authors="postdata.acf.author"></authorlinks>
    </p>
    <div class="inner-content">
      <readcontent :printversion="true" :contentlayout="postdata.acf.layout_picker" :content="postdata.acf.content"></readcontent>
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
  props: ['postdata'],
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
.printpostOuter {
    position: relative;
    min-height: 26cm;

    .metaWrapperSide {
        position: absolute;
        left: 0;
        top: 3.5cm;
        text-align: right;
        .metaRotate {

            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            // EQAL HOOGTE VAN WRAPPER
            margin-left: 23px;

            -webkit-transform-origin: top left;
            transform-origin: top left;
        }
    }

    //  ATTAMPT with bottom align

    // position: relative;
    // min-height: 35.2cm;
    //
    // .metaWrapperSide {
    //     position: absolute;
    //     left: 0;
    //     // top: 0cm;
    //     width: 35.2cm;
    // top: 35.2cm;
    //     // width: 37.7cm;
    //     // text-align: right;
    //     .metaRotate {
    //
    //         -webkit-transform: rotate(-90deg);
    //         transform: rotate(-90deg);
    //         // EQAL HOOGTE VAN WRAPPER
    //         // margin-left: 23px;
    //
    //         -webkit-transform-origin: top left;
    //         transform-origin: top left;
    //     }
    // }


    .printpost {

        margin-left: 3.5cm;

        .is-size-6-touch {
            font-size: 14pt !important;
        }
        .inner-content {
            .is-size-6-touch {
                line-height: 1.4;
            }
            p img {
                margin-right: 0;
                margin-left: -5cm;
                width: calc(100% + 5cm);
                max-width: calc(100% + 5cm);
            }
            padding-top: 1cm;
            margin: 0 auto 0 0;
            text-align: left;
            p {
                margin-left: 5cm;
            }

        }

    }
}
</style>
