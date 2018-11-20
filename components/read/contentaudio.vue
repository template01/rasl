<template>
<div v-if="content" class="contentaudio">
  <!-- {{content}} -->
  <!-- <av-line
  :line-width="2"
  line-color="lime"
  :audio-src="content"
></av-line> -->


  <div :class="$route.params.type === 'practice' ? 'has-text-danger':'has-text-info'" class="columns pt-40 is-marginless ">
    <div class="column is-10 is-offset-1 ">
      <div :class="$mq != 'lg' ? '':'pr-40 pl-40'">
        <div class="" :class="[$mq != 'lg' ? 'p-20':'p-20', playing ? 'audioBorder audioBorderTransparent':'audioBorder', $route.params.type === 'practice' ? 'red':'',$route.params.type === 'reflective' ? 'green':'',$route.params.type === 'general' ? 'black':'']">
          <div :style="playing ? {'opacity':'0'}:{}" class=" columns is-marginless audioTitle is-size-2-desktop is-size-4-mobile">
            <div class="column is-6 is-paddingless">
              <span>Podcast: {{title}} </span>
            </div>
            <div class="column is-6 is-paddingless " :class="$mq != 'lg' ? '':'has-text-right'">
              <span> {{fancyTimeFormat(currentTime)}} / {{fancyTimeFormat(duration)}}</span>
            </div>

          </div>
          <audio class="audioPodcast is-hidden" crossOrigin="anonymous" ref="foo" :src="content"></audio>
          <div class="Aligner circleWrapper" :class="[$mq != 'lg' ? 'small':'']">

            <div class="circle" :class="[$mq != 'lg' ? 'small':'',$route.params.type === 'practice' ? 'pink-background':'',$route.params.type === 'reflective' ? 'green-background':'',$route.params.type === 'general' ? 'white-background':'']" :style="$mq != 'lg' ? {'width':freqs[0]*1.25+'px','height':freqs[0]*1.25+'px'} : {'width':freqs[0]*2.5+'px','height':freqs[0]*2.5+'px'}">
              <span class="playButton Aligner pointer" @click="playing = !playing; duration = audio.duration">
            <span class="is-size-2-desktop is-size-4-mobile" v-if="!playing">PLAY</span>
              <span class="is-size-2-desktop is-size-4-mobile" v-else>PAUSE</span>
              </span>

            </div>
          </div>

          <div class="timeScrobbler pt-40">
            <!-- {{currentTime}} -->
            <vue-slider :sliderStyle="{'box-shadow':'none','height':'40px','top':'-18px','width':'120px','backgroundColor':routeColor,'borderRadius':'0'}" :processStyle="{'backgroundColor': routeColor}" :bg-style="{'backgroundColor': routeColor, 'height':'2px'}"
              @drag-start="playing = false; dragging = true" @drag-end="audio.currentTime = currentTime; playing = true;  dragging = false" :max="duration" v-model="currentTime">
              <div class="diy-tooltip" slot="tooltip" slot-scope="{ value }">
                <!-- {{ value }} -->
                <span class="is-size-2-desktop is-size-4-mobile" style="line-height:40px">DRAG</span>
              </div>
            </vue-slider>
            <!-- <div class="scrobble" :style="{'left':((currentTime/duration)*100)+'%'}"></div> -->
            <!-- <drag-it-dude :style="!dragging ? {'left':((currentTime/duration)*100)+'%'}:{'left':((currentTime/duration)*100)+'%'}" :width="200" :height="40" :parent-height="40" @activated="handleActivated" @dragging="handleDragging" @dropped="handleDropped"> -->
            <!-- <div class="scrobble"></div> -->
            <!-- </drag-it-dude> -->

          </div>
        </div>
      </div>
    </div>
  </div>
  <!--
  <div class="columns is-marginless pb-40 pt-40 ">
    <div class="is-hidden">
      {{freqs[0]}}
    </div>
    <div class="column is-12 is-marginless">
      <div class=" pr-40 pl-40">
        <div class="pointSetWrapper">
          <div class="pointSet" v-for="(pointSet,index) in freqsSelected">
            <div v-if="index===0" v-for="point in pointSet" class="point pink-background" :style="{'margin-bottom':point*2+'px','width':'10%'}">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <!-- <audio id="myAudio" controls :src="content"></audio> -->

  <!-- <av-bars ref-link="foo" /> -->
  <!-- <av-line ref-link="foo" /> -->
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import colorvariables from '~/assets/scss/variables.scss'

export default {

  props: ['content', 'printversion','title'],
  data: function() {
    return {
      genericData: 'generic component text',
      audio: '',
      playing: false,
      freqs: [],
      freqsSelected: [],
      dataPoints: 10,
      currentTime: 0,
      duration: 0,
      value: 0,
      dragging: false
    }
  },
  methods: {

    fancyTimeFormat: function(d) {
      d = Number(d);

      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    },

  },
  watch: {

    playing: function() {
      if (this.playing) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    currentTime: function() {
      // this.audio.currentTime = this.currentTime
      // this.audio.play()
    }
  },
  mounted() {

    if (this.content) {

      var vm = this
      var emptyArrays = []

      for (var i = 0, len = vm.dataPoints; i < len; i++) {
        // someFn(arr[i]);
        vm.freqsSelected.push([])
      }
      // vm.freqsSelected = emptyArrays;

      var AudioContext = (window.AudioContext || window.webkitAudioContext),
        audioContext, audioProcess, audioSource, didConnect;
      vm.audio = vm.$el.querySelectorAll('.audioPodcast')[0]


      function connect() {



        if (didConnect) {
          return false;
        }

        if (!AudioContext) {
          console.log('No AudioContext / webkitAudioContext detected.');
          return false;
        }

        var audioContext,
          audioSource,
          audioAnalyser;
        // console.log('Audio fired canplay, connecting...');
        // console.log('Creating audio context');
        audioContext = new AudioContext();
        // console.log('Creating mediaElementSource');
        audioSource = audioContext.createMediaElementSource(vm.audio);
        // console.log('Creating analyser');
        audioAnalyser = audioContext.createAnalyser();
        // console.log('Connecting...');
        audioSource.connect(audioAnalyser);
        audioAnalyser.connect(audioContext.destination);
        // console.log('Connect OK');
        // console.log('Adding getByteFrequencyData() interval...');
        window.setInterval(function() {
          var freqByteData = new Uint8Array(audioAnalyser.frequencyBinCount);
          audioAnalyser.getByteFrequencyData(freqByteData);
          vm.freqs = freqByteData
          // console.log(freqByteData[5])
          for (var i = 0, len = vm.dataPoints; i < len; i++) {
            // someFn(arr[i]);
            vm.freqsSelected[i].push(freqByteData[i])
            vm.freqsSelected[i] = vm.freqsSelected[i].slice(-1 * vm.dataPoints)
            if (!vm.dragging) {
              vm.currentTime = vm.audio.currentTime
            }
          }
        }, 50);
        didConnect = true;
        vm.duration = vm.audio.duration
      }

      window.setTimeout(function() {
        connect();
      }, 2000);

    }
  },

  computed: {
    routeColor: function() {
      if (this.$route.params.type === 'practice' || this.$route.params.type === 'reflective' || this.$route.params.type === 'general') {

        if (this.$route.params.type === 'practice') {
          return colorvariables.red

        }
        if (this.$route.params.type === 'reflective') {
          return colorvariables.green
        }
        if (this.$route.params.type === 'general') {
          return colorvariables.black

        }
      } else {
        return colorvariables.black

      }
    },
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },

}
</script>
<style  lang="scss">
audio {
    padding-top: 60px;
}
.audioBorder {
    &.green {
        border: 2px solid $green;
    }
    &.red {
        border: 2px solid red;
    }
    &.black {
        border: 2px solid black;
    }
}

.audioBorderTransparent {
    border-color: transparent !important;
}

.audioTitle {
    line-height: 1;
}

.circleWrapper {
    height: 540px;
    &.small {
        height: 340px;

    }
}
.circle {
    user-select: none;
    border-radius: 100%;
    min-width: 200px;
    min-height: 200px;
    max-width: 500px;
    max-height: 500px;
    transition: all 0.04s;
    position: relative;
    .playButton {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    &.small {
        min-width: 100px;
        min-height: 100px;
        max-width: 300px;
        max-height: 300px;
    }
}

.pointSetWrapper {

    height: 600px;
    position: relative;
}
.pointSet {
    display: inline-block;
    width: 100%;
    position: absolute;
    bottom: 0;
    .point {
        display: inline-block;
        border-radius: 10vw;
        transition: all 0.04s;
        height: 10vw;

        // float: left;
        // position: absolute;
        // bottom: 0;
    }
}

.timeScrobbler {
    // background: beige;
    // height: 40px;
    width: 100%;
    position: relative;
    .scrobble {
        position: absolute;
        // width: 40px;
        // height: 40px;
        color: black;
        // background: red;
        // margin-top: 80px;
        // margin-bottom: 80px;
        // margin-left: 80px;
        // margin-right: 80px;
        // top: -80px !important;
        // transform: translateY(-80px);
    }

    .vue-slider-tooltip-wrap {
        top: 0 !important;
        left: 0 !important;
        transform: translate(0%,0%) !important;
        width: 100% !important;

    }
    .diy-tooltip {
        line-height: 1 !important;
        text-align: center;
        color: $white;
        width: 100%;
        margin-top: -2px;
        margin-left: -1px;

    }
}
</style>
