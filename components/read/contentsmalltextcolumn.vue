<template>
  <div class="contentsmalltextcolumn columns is-marginless ">
    <div class="column is-marginless">
      <div class=" pr-40 pl-40">
        <div :class="printversion ? 'is-12':'is-8 is-offset-2'" class=" column">
          <div class="contentsmalltextcolumn-columns is-size-6-desktop is-size-6-touch" v-html="content">
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
  props: ['content','printversion'],
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  methods:{
  },
  computed: {
    ...mapGetters({
     appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
<style lang="scss">
.contentsmalltextcolumn{
  .contentsmalltextcolumn-columns{
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
</style>
