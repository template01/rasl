<template>
  <div>

    <div class="column" :style="left ? {'padding-left':0}:{'padding-right':0}">
      <div class="columns">
        <div class="column">
          <div class="hoverselect">

            <selectpost class="pointer  is-pulled-left mr-5" :posttype="postdata.type" :postid="postdata.id"></selectpost>
            
          </div>
          <nuxt-link class=" is-pulled-left mr-5" :to="'collection'+windowsearch"><img class="rasl-icon" :src="'icons/rasl_arrow_right.svg'" /></nuxt-link>
        </div>
      </div>
      <h1 class="is-size-3" v-html="postdata.title.rendered">
      </h1>
      <p class="is-size-4" v-html="postdata.title.rendered">
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
      genericData: 'generic component text'
    }
  },
  methods: {},
  components:{
    selectpost
  }
  // computed: {
  //   ...mapGetters({
  //     featuredPosts: "GET_FEATUREDPOSTS",
  //     reflectivePosts: "GET_REFLECTIVEPOSTS",
  //     praticePosts: "GET_PRATICEPOSTS",
  //   }),
  // },

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
