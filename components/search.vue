<template>
<span class="">
  <input type="text" class="is-size-4 valign-middle" placeholder="..." v-debounce="400" v-model.lazy="searchquery" >
  <!-- <loadingindicator ></loadingindicator> -->
  <loadingindicator v-if="loadingContent"></loadingindicator>
</span>
</template>
<script>
import debounce from 'v-debounce'
import loadingindicator from '~/components/loadingindicator'
import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  data: function() {
    return {
      searchquery: '',
      loadingContent: false
    }
  },
  components:{
    loadingindicator
  },
  methods: {},
  directives: {
    debounce
  },
  watch: {
      'windowsearch': function(){
        this.loadingContent=false
      },

    'searchquery': function() {
      this.loadingContent = true
      this.$store.commit('SET_FILTERBY', 'search')
      this.$store.commit('SET_SEARCHQUERY', this.searchquery)
      this.$store.dispatch('TRIGGER_SEARCHBYCOLUMNS', {
        'searchquery': this.searchquery
      })

    }
  },
  created() {
    console.log(this.searchquerystate)
    if (this.searchquerystate.length > 0) {
      this.searchquery = this.searchquerystate
    }
  },

  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
      appinitated: "GET_APP_INITIATED",
      searchquerystate: "GET_SEARCHQUERY",
    }),
  },

}
</script>
<style scoped lang="scss">
input{
  background: transparent;
  border: 0;
  border-bottom: 2px solid $black;
  outline: none;
  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: $black;
      opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: $black;
  }

  &::-ms-input-placeholder { /* Microsoft Edge */
      color: $black;
  }
  max-width: 200px;
 //  width: 130px;
 // box-sizing: border-box;
 // border: 2px solid #ccc;
 // border-radius: 4px;
 // font-size: 16px;
 // background-color: white;
 // // background-image: url('searchicon.png');
 // background-position: 10px 10px;
 // background-repeat: no-repeat;
 // padding: 12px 20px 12px 40px;
 // -webkit-transition: width 0.4s ease-in-out;
 // transition: width 0.4s ease-in-out;
}
</style>
