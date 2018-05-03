<template>
<div class="circles">
  <div v-for="circle in circles" :style="{'top':circle.p1.y+parallax+'px','left':circle.p1.x+'px', 'width':radius+'px', 'height':radius+'px'}" class="circle">
  </div>
</div>
</template>
<script>
import _ from 'lodash'

import {
  mapGetters
} from 'vuex'


export default {
  props: [],
  data: function() {
    return {
      genericData: 'generic component text',
      circles: [],
      parallax: 0,
      radius: 0,
      paddingradius: 0,
      lastScrollTop: 0
    }
  },
  methods: {
    randomPositions: function() {

      var totalradius = window.innerWidth/3
      this.radius = (totalradius/5)*3
      this.paddingradius = (totalradius/5)*2
      var vm = this

      function Point(x, y) {
        this.x = x;
        this.y = y;
      }

      function Rectangle(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
      }

      Rectangle.prototype.isInside = function(r) {
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
        function p() {
          return Math.random() * window.innerWidth | 0;
        }

        function py() {
          return Math.random() * window.innerHeight | 0;
        }

        function s() {
          return vm.radius + vm.paddingradius | 0;
        }
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
            isInside = rectangles.some(function(a) {
              return a.isInside(r);
            });
          } while (isInside && counter < 1000);
          counter < 1000 && rectangles.push(r);
        }
        return rectangles;
      }

      var circles = generateRectangles();
      this.circles = circles
    },

    handleScrollParallax: _.throttle(function() {

      var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > this.lastScrollTop) {
        this.parallax = this.parallax + 2
      } else {
        this.parallax = this.parallax - 2
      }
      this.lastScrollTop = st;
    }, 150)
  },
  beforeDestroy: function() {
    window.removeEventListener('scroll', this.handleScrollParallax)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScrollParallax);
    this.randomPositions()
  },
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
<style scoped lang="scss">
.circles {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background: $white;
    .circle {
        transition: top 0.1s ease-in-out;
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
