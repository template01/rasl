<template>
<div :class="printversion ? 'printversion':''" class="contenttextphoto columns is-marginless ">
  <div class="column is-marginless">
    <div class="" :class="$mq != 'lg' ? '':' pr-40 pl-40'">
      <div :class="[printversion ? 'is-12':'is-6 is-offset-3',$mq != 'lg' ? 'is-paddingless':'']" class=" column">
        <div class="is-size-4-desktop is-size-6-touch" v-html="content">
          <!-- <div class="is-size-4-desktop is-size-6-touch" style="  border: 2px solid black;" v-html="content"> -->
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'


export default {
  props: ['content', 'printversion'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
<style scoped lang="scss">

</style>

<style lang="scss">
.contenttextphoto {
    * {
        color: inherit !important;
    }
    &:not(.printversion) {

        @media only screen and (min-width: 801px) {

            p {
                margin-bottom: 20px;
                img {
                    margin-left: -20%;
                    margin-right: -20%;
                    width: 140%;
                    max-width: 140%;
                    clear: both;
                    &.alignleft {
                        float: left;
                        max-width: 60%;
                        margin-right: 20px;
                        margin-top: 15px;
                        margin-bottom: 5px;
                    }
                    &.alignright {
                        float: right;
                        max-width: 60%;
                        margin-left: 20px;
                        margin-top: 15px;
                        margin-bottom: 5px;
                    }
                    &.aligncenter {
                        // margin: 0 auto;
                        // margin-top: 20px;
                    }
                }
            }

            .wp-caption {

                margin-left: -20%;
                margin-right: -20%;
                width: 140% !important;
                max-width: 140% !important;
                &.alignleft {
                    float: left;
                    max-width: 60%;
                    margin-right: 20px;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
                &.alignright {
                    float: right;
                    max-width: 60%;
                    margin-left: 20px;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
                &.aligncenter {
                    // margin: 0 auto;
                    // margin-top: 20px;
                }
                img {
                    width: 100%;
                }
            }
        }

        @media only screen and (max-width: 800px) {

            p {
                margin-bottom: 20px;
                img {
                  width: 100%;

                }
            }

            .wp-caption {
                width: 100% !important;
                img {
                    width: 100%;
                }
            }
        }

    }
    &.printversion {

        p {
            img {
                margin: 5mm 0 5mm -5.25cm;
                width: 20cm !important;
                max-width: 20cm !important;

                &.alignleft {
                  clear: both;
                    float: left;
                    margin-left: -5.25cm;
                    width: 8cm !important;
                    max-width: 8cm !important;
                    margin-right: 5mm;
                    margin-top: 10px;
                    margin-bottom: 0;
                }
                &.alignright {
                  clear: both;
                    float: left;
                    margin-left: -5.25cm;
                    width: 8cm !important;
                    max-width: 8cm !important;
                    margin-right: 5mm;
                    margin-top: 10px;
                    margin-bottom: 0;
                }

            }
        }

        .wp-caption {
            clear: both;
            page-break-inside: avoid;

            p {
                margin-left: 0 !important;
            }

            margin: 5mm 0 5mm -0.25cm;
            width: 20cm !important;
            max-width: 20cm !important;

            &.alignleft {
                float: left;
                margin-left: -1cm;
                width: 8cm !important;
                max-width: 8cm !important;
                margin-right: 5mm;
            }
            &.alignright {
                float: left;
                margin-left: -1cm;
                width: 8cm !important;
                max-width: 8cm !important;
                margin-right: 5mm;
            }
            &.aligncenter {
                // margin: 0 auto;
                // margin-top: 20px;
            }
            img {
                width: 100%;
            }
        }

    }

}
</style>
