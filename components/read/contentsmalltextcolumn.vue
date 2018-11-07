<template>
<div class="contentsmalltextcolumn columns is-marginless " :class="printversion ? 'is-printversion':''" >
  <div class="column is-marginless">
    <div :class="printversion ? '':'pr-40 pl-40'">
      <div :class="printversion ? 'is-12 is-paddingless':'is-8 is-offset-2'" class=" column">
        <div  class="contentsmalltextcolumn-columns is-size-6-desktop is-size-6-touch" v-html="content">
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
<style lang="scss">
.contentsmalltextcolumn {

  &.is-printversion{

    p{
      // mar
      margin-left: 0cm !important;
      margin-right: 5cm !important;

    }
    .contentsmalltextcolumn-columns {
        column-count: 0;

    }
  }

  &:not(.is-printversion){
    * {
        text-indent: 0 !important;
    }
    .contentsmalltextcolumn-columns {
        column-count: 3;

    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {

        & + * {
            margin-top: 6px;
        }

    }

  }
}
</style>
