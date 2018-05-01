<template>
  <div>

    <div class="column" :style="left ? {'padding-left':0}:{'padding-right':0}">
      <div class="columns" style="margin-bottom:0;">
        <div class="column mt-10">
            <selectpost class="pointer  is-pulled-left mr-5" :posttype="postdata.type" :postid="postdata.id"></selectpost>
          <nuxt-link class=" is-pulled-left mr-5" :to="'read/'+postdata.type+'/'+postdata.slug+windowsearch"><img class="rasl-icon" :src="'icons/rasl_arrow_right.svg'" /></nuxt-link>
        </div>
      </div>
      <h1 class="is-size-3" v-html="postdata.title.rendered">
      </h1>
      <p class="is-size-4 mt-20" v-html="postdata.title.rendered">
      </p>
      <p class="is-size-4 mt-20" v-html="'By: ' + author">
      </p>
      <hr class="mb-0" />
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import selectpost from '~/components/selectpost'


export default {
  props: ['postdata','left'],
  data: function() {
    return {
      genericData: 'generic component text',
      author: 'Alain Thompson'
    }
  },
  methods: {},
  components:{
    selectpost
  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
    }),
  },

}
</script>
<style scoped lang="scss">
  .addtoselection{
    max-width: 0px;
    overflow: hidden;
    white-space: nowrap;
    transition: max-width 0.5s ease-in-out;
    display: inline-block;
    height: 40px;
    span{
      border: 2px solid $black;
      border-radius: 20px;
    }
  }
  .hoverselect{

    &:hover{
      .addtoselection{
        max-width: 200px;
      }
      // display: none;
    }

  }
</style>
