<template>
<div  :class="printversion ? 'printversion':''"  class="contenttextphoto columns is-marginless ">
  <div class="column is-marginless">
    <div class=" pr-40 pl-40">
      <div :class="printversion ? 'is-12':'is-6 is-offset-3'" class=" column">
        <div class="is-size-4-desktop is-size-6-touch" v-html="content">
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
    &:not(.printversion){
      p {
        margin-bottom: 20px;
        img {
            margin-left: -20%;
            margin-right: -20%;
            width: 140%;
            max-width: 140%;
            clear: both;
            &.alignleft{
              float: left;
              max-width: 60%;
              margin-right: 20px;
              margin-top: 15px;
              margin-bottom: 5px;
            }
            &.alignright{
              float: right;
              max-width: 60%;
              margin-left: 20px;
              margin-top: 15px;
              margin-bottom: 5px;
            }
            &.aligncenter{
              // margin: 0 auto;
              // margin-top: 20px;
            }
        }
    }

    .wp-caption {
        margin-left: -20%;
        margin-right: -20%;
        width: 140%;
        max-width: 140%;
        &.alignleft{
          float: left;
          max-width: 60%;
          margin-right: 20px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        &.alignright{
          float: right;
          max-width: 60%;
          margin-left: 20px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        &.aligncenter{
          // margin: 0 auto;
          // margin-top: 20px;
        }
        img{
          width: 100%;
        }
    }
  }
    &.printversion{
      p {
          margin-bottom: 20px;
          img {
              margin-right: 0;
              margin-left: -5cm;
              width: calc(100% + 5cm);
              max-width: calc(100% + 5cm);
              
              clear: both;
              &.alignleft{
                float: left;
              }
              &.alignright{
                float: left;
              }
              &.aligncenter{
              }
          }
      }

      .wp-caption {
        clear: both;

          p{
            margin-left: 0px !important;
          }

          margin-left: -10cm;
          width: calc(10cm);
          max-width: calc(10cm);

          margin-right: 5mm;
          &.alignleft{
            float: left;
          }
          &.alignright{
            float: left;
          }
          &.aligncenter{
          }
          img{
            width: 100%;
          }
      }

    }

}
</style>
