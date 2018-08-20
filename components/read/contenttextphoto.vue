<template>
<div class="contenttextphoto columns is-marginless ">
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
