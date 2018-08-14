<template>
<div class="readcontent columns">
  <div :class="printversion ? 'is-12':'is-6 is-offset-3'" class="column" v-if="contentlayout === 'simple'">
    <div class="is-size-4-desktop is-size-5=6-touch" v-html="content">
    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'


export default {
  props: ['content', 'contentlayout','printversion'],
  data: function() {
    return {
      genericData: 'generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text generic component text '
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

.readcontent {
    * {
        color: inherit !important;
    }
    p {
        margin-bottom: 20px;
        img {
          margin-left: -20%;
          margin-right: -20%;
          width: 140%;
          max-width: 140%;
        }
    }


}
</style>
