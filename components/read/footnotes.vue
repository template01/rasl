<template>
<div v-if="contentClean.length>0" class="columns is-marginless">
  <!-- <span v-html="content"></span> -->
  <div class="column is-marginless">
    <div class=" pr-40 pl-40">
      <div :class="printversion ? 'is-12':'is-6 is-offset-3'" class="column is-size-4-desktop is-size-6-touch">
        <p class="uppercase">
          footnotes:
        </p>
        <p v-for="(item,index) in contentClean" :key="'note' + index">
          <a class="" :href="'#'+item.returnnote" :id="item.returnnote.replace(/return-/g,'')">
            <span v-html="item.id" class="mr-5"></span>
            <span v-html="item.content"></span>
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
<style scoped lang="scss">

</style>
