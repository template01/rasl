<template>
<div class="coverPage">
  <div class="centerLine">
    <div class="dashedLine">
    </div>
    <div class="foldHereOuter">
    <!-- <div class="foldHere"> -->
      <div class="foldHereTypo uppercase is-size-6"><span class="white-background p-5">fold Here</span></div>

    <!-- </div> -->
    </div>
    <div class="staples">
      <div class="stapleA uppercase is-size-6"><span>STAPLE</span></div>
      <div class="stapleB uppercase is-size-6"><span>STAPLE</span></div>
    </div>
  </div>
  <div class="topTitle">

    <div class="columns is-marginless is-mobile">
      <div class="column is-paddingless">
        <p class="is-size-3 uppercase">
          publications.rasl.nu
        </p>
        {{getTitleArray}}
        {{getRandomTitle}}
        <p class="coverTitle">
          <span v-for="word in getRandomTitle" v-html="word">
        </span>
        </p>

      </div>
    </div>
  </div>

  <div class="belowTitle">

    <div class="columnCustom is-size-4">
      <div>
        <p class="uppercase">
          Tags:
        </p>
        <p>
          <span class=" is-capitalized" v-for="(tag, index) in detailsTags" v-html="tag.name + (index!=detailsTags.length-1 ? ';&nbsp;' : '')"></span>
        </p>
      </div>
    </div>
    <div class="columnCustom is-size-4 pl-15mm">
      <div>
        <p class="uppercase">
          Contents:
        </p>
        <p>
          <span v-for="(post, index) in selectedPosts" v-html="post.title.rendered + (index!=selectedPosts.length-1 ? ';&nbsp;' : '')">
            </span>
        </p>
      </div>
    </div>
    <!-- </div> -->
    <div class="rasllogo">
      <img src="/rasllogow.svg" />
    </div>
  </div>

</div>
</div>
</template>

<script>
// import genericcomp from '~/components/_genericComp.vue'
import printlist from '~/components/print/printlist.vue'
import axios from 'axios'
import _ from 'lodash'
import {
  mapGetters
} from 'vuex'


export default {
  layout: 'print',
  components: {
    printlist
  },
  data: function() {
    return {
      genericData: 'generic component text'
    }
  },
  computed: {
    ...mapGetters({}),

    detailsTags: function() {
      var tagsNice = []
      for (var i = 0, len = this.selectedPosts.length; i < len; i++) {
        console.log(this.selectedPosts[i].pure_taxonomies)
        if (this.selectedPosts[i].pure_taxonomies.tags != null) {
          tagsNice.push(this.selectedPosts[i].pure_taxonomies.tags)
        }
      }
      var arrayOfObjAfter = _.map(
        _.uniq(
          _.map(_.flatten(tagsNice), function(obj) {
            return JSON.stringify(obj);
          })
        ),
        function(obj) {
          return JSON.parse(obj);
        }
      );
      return arrayOfObjAfter
    },

    getRandomTitle: function() {
      // // create a copy of the array
      // var newArray = []
      // for (var i = 0; i <= vm.getTitleArray.length && i < maxWords; i++) {
      //   newArray.push([vm.getTitleArray[i],i])
      // }
      //
      //
      // // then, each time pull from that array and remove the one you use
      // if (newArray.length > 0) {
      //   var index = Math.floor(Math.random() * newArray.length)
      //   var randomImage = newArray[index];
      //   newArray.splice(index, 1);
      // }
      // return newArray
      var maxWords = 7
      var vm = this
      var shuffled = _.shuffle(vm.getTitleArray).slice(0, maxWords)
      // if sentence ends on THE, slice it off
      if(shuffled[shuffled.length-1].toLowerCase() === 'the'){
        shuffled = shuffled.slice(0,shuffled.length-1)
      }

      // if shuffled is longer than 30 characters (in total) get rid of excess
      shuffled = shuffled.join(" ").replace(/^(.{10}[^\s]*).*/, "$1").split(" ");

      return shuffled;

    },
    getTitleArray: function() {
      var vm = this
      var names = []
      this.selectedPosts.forEach(function(element) {
        names.push(element.title.rendered.split(" "));
      });

      function flatten(arr) {
        return arr.reduce(function(flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
      }

      return flatten(names)
      // for each(post in this.selectedPosts) {
      //   vm.titles.push(post.title.rendered)
      // }
    }
  },
  methods: {},
  async asyncData({
    params,
    query,
    error,
    store,
    route,
    redirect
  }) {

    const results = (await axios.all(
      store.state.selected.map(
        function(selectedPostSingle) {
          return axios.get(store.state.apiRoot + '/wp/v2/' + selectedPostSingle.posttype + '/' + selectedPostSingle.postid);
        }
      )
    )).map(result => result.data)

    return {
      selectedPosts: results
    }


  },


}
</script>

<style lang="scss">
* {
    font-family: 'Tex Gyre Heros';
}
.is-size-6{
    font-size: 10pt !important;
}
.columnCustom {
    width: 50%;
    float: left;
}
.pl-5mm {
    padding-left: 5mm;
}
.pl-10mm {
    padding-left: 10mm;
}
.pl-15mm {
    padding-left: 15mm;
}
.coverPage {
    min-height: 19.95cm;
    max-height: 19.95cm;
    overflow: hidden;
    // position: absolute;
    // height: 100%;
    // width: 100%;
}
.belowTitle,
.topTitle {
    width: 100% !important;
    display: inline-block;
}
.topTitle{
  min-height: 6cm
}
.belowTitle {
    padding-top: 5mm;
}
.coverTitle {
    font-size: 90pt;
    text-transform: uppercase;
    line-height: 0.9;
    word-spacing: 0;
    span {
        margin-right: 35pt;
        float: left;
    }
}

.rasllogo {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2cm;
}

.centerLine {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .dashedLine {
        width: 50%;
        height: 100%;
        position: absolute;
        border-right: 2px solid black;
    }
    // .metaWrapperSide {
    //     position: absolute;
    //     left: 0;
    //     top: 3.5cm;
    //     text-align: right;
    .foldHereOuter{
      width: 100%;
      height: 100%;
      left: 50%;
      position: absolute;
    // .foldHere {

        .foldHereTypo{
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
          // EQAL HOOGTE VAN WRAPPER
          margin-left: 10px;

          -webkit-transform-origin: top left;
          transform-origin: top left;
          position: absolute;
          top: 9.4cm;

        }
    // }
  }

    .staples {
        left: 50%;
        position: absolute;
        height: 100%;
        .stapleA,
        .stapleB {
            left: 4mm;
            position: absolute;
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            // EQAL HOOGTE VAN WRAPPER
            margin-left: 23px;

            -webkit-transform-origin: top left;
            transform-origin: top left;
        }
        .stapleB {
            top: 18.6cm;
        }
    }
    // }

}
</style>
