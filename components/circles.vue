<template>
  <div class="circles">
    <div v-show="positioned" v-for="circle in circles" :style="{'top':circle.p1.y+'px','left':circle.p1.x+'px', 'width':300+'px', 'height':300+'px'}"class="circle">
    </div>
  </div>
</template>
<script>

import {
  mapGetters
} from 'vuex'


export default {
  props:[],
  data: function() {
    return {
      genericData: 'generic component text',
      circles: [],
      positioned: false
    }
  },
  methods:{
    randomPositions: function(){

      function Point(x, y) {
          this.x = x;
          this.y = y;
      }

      function Rectangle(p1, p2) {
          this.p1 = p1;
          this.p2 = p2;
      }

      Rectangle.prototype.isInside = function (r) {
          function check(a, b) {
              return (
                  a.p1.x <= b.p1.x && b.p1.x <= a.p2.x && a.p1.y <= b.p1.y && b.p1.y <= a.p2.y ||
                  a.p1.x <= b.p2.x && b.p2.x <= a.p2.x && a.p1.y <= b.p2.y && b.p2.y <= a.p2.y ||
                  a.p1.x <= b.p2.x && b.p2.x <= a.p2.x && a.p1.y <= b.p1.y && b.p1.y <= a.p2.y ||
                  a.p1.x <= b.p1.x && b.p1.x <= a.p2.x && a.p1.y <= b.p2.y && b.p2.y <= a.p2.y
              );
          }
          return check(this, r) || check(r, this);
      }

      function generateRectangles() {
          function p() { return Math.random() * window.innerWidth | 0; }
          function py() { return Math.random() * window.innerHeight | 0; }
          function s() { return 300| 0; }
          // function s() { return 50 + Math.random() * 150 | 0; }

          var rectangles = [],
              r, size, x, y, isInside, i, counter = 0;

          for (i = 0; i < 5; i++) {
              counter = 0;
              do {
                  counter++;
                  x = p();
                  y = py();
                  size = s();
                  r = new Rectangle(new Point(x, y), new Point(x + size, y + size));
                  isInside = rectangles.some(function (a) {
                      return a.isInside(r);
                  });
              } while (isInside && counter < 1000);
              counter < 1000 && rectangles.push(r);
          }
          return rectangles;
      }

      function drawRectangles(rectangles) {
          // var canvas = document.getElementById("canvas"),
          //     ctx = canvas.getContext("2d");

          rectangles.forEach(function (a) {
            console.log(a)
              // ctx.lineWidth = 1;
              // ctx.strokeRect(a.p1.x + 0.5, a.p1.y + 0.5, a.p2.x - a.p1.x - 1, a.p2.y - a.p1.y - 1);
              // ctx.fillStyle = getRandomColor();
              // ctx.fillRect(a.p1.x + 0.5, a.p1.y + 0.5, a.p2.x - a.p1.x - 1, a.p2.y - a.p1.y - 1);
          });
      }

      var rectangles = generateRectangles();
      this.circles =  rectangles
      drawRectangles(rectangles);

    },
    randPos: function(){
      var top =  Math.floor(Math.random() * Math.floor(85));
      var left =  Math.floor(Math.random() * Math.floor(85));
      return {'top':top+'%','left':left+'%'}
    }
  },
  mounted(){
    this.randomPositions()
    this.positioned = true
  },
  computed: {
    ...mapGetters({
     appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
<style scoped lang="scss">
.circles{
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  z-index: -1;
  background: $white;
  .circle{
    background: $brown;
    width: 20vw;
    height: 20vw;
    border-radius: 100%;
    top: 20%;
    left: 20%;
    position: absolute;
  }
}
</style>
