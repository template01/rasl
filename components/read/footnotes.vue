<template>
<div v-if="contentClean.length>0" class="footnotes pb-0 columns is-marginless">
  <!-- <span v-html="content"></span> -->
  <div class="column is-marginless">
    <div :class="[printversion ? '':'', $mq != 'lg' ? '':' pr-40 pl-40']">
      <div :class="[printversion ? 'is-12':'is-8-desktop is-offset-2-desktop is-6-widescreen is-offset-3-widescreen',$mq != 'lg' ? 'is-paddingless':'']"class="column is-size-6-desktop is-size-6-touch">
        <p class="uppercase">
          footnotes:
        </p>
        <p v-for="(item,index) in contentClean" :key="'note' + index">
          <a class="" :href="'#'+item.returnnote" :id="item.returnnote.replace(/return-/g,'')">
            <span v-html="item.id+':'" class="mr-5"></span>
          </a>
          <a class="ignoreUnderline" :href="'#'+item.returnnote" :id="item.returnnote.replace(/return-/g,'')">
            <span class="" v-html="item.content"></span>
          </a>
        </p>

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
  methods: {},
  computed: {
    contentClean: function() {
      //
      // var arrs = [[{"comments":"asd","movement":"Back Squat","userID":"wDHZv3OL55SIymHkhMUejNleNkx1","weight":"330"}],[{"comments":"asd","movement":"Bench Press","userID":"wDHZv3OL55SIymHkhMUejNleNkx1","weight":"100"}],[{"comments":"Comment","movement":"Clean","userID":"wDHZv3OL55SIymHkhMUejNleNkx1","weight":"195"}],[],[],[{"comments":"Front squat comment alpha","movement":"Front Squat","userID":"wDHZv3OL55SIymHkhMUejNleNkx1","weight":"315"}],[],[],[],[],[],[{"comments":"abc","movement":"Strict Press","userID":"wDHZv3OL55SIymHkhMUejNleNkx1","weight":"155"}]];

      var result = this.content.filter(function(sub) {
        return sub.length;
      });

      var mergedResult = [].concat.apply([], result);
      // console.log(result); // [ 1, 2, 3, 4 ]

      return mergedResult;

    },
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
<style lang="scss">
.footnotes{
  .ignoreUnderline{
    text-decoration: none !important;
  }
}
</style>
