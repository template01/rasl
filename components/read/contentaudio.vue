<template>
<div class="">
  <!-- {{content}} -->
  <!-- <av-line
  :line-width="2"
  line-color="lime"
  :audio-src="content"
></av-line> -->


  <div class="columns pb-40 pt-40">
    <div class="column is-8 is-offset-2">
      <button @click="audio.pause()">pause</button>
      <button @click="audio.play()">play</button>
      <audio class="audioPodcast is-hidden" controls autoplay crossOrigin="anonymous" ref="foo" :src="content">
      </audio>
      <!-- <div class="pb-40 pt-40"> -->
        <!-- <div class="is-inline-block" v-for="freq in freqs">{{freq}}&nbsp;</div> -->
      <!-- </div> -->
      <div class="Aligner" style="height: 600px;">

        <div class="circle pink-background" :style="{'width':freqs[0]*2.5+'px','height':freqs[0]*2.5+'px'}">

        </div>
      </div>
    </div>
  </div>
  <!-- <audio id="myAudio" controls :src="content"></audio> -->

  <!-- <av-bars ref-link="foo" /> -->
  <!-- <av-line ref-link="foo" /> -->
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'

export default {

  props: ['content', 'printversion'],
  components: {
    // avBars
  },
  data: function() {
    return {
      genericData: 'generic component text',
      audio: '',
      freqs: [],
    }
  },
  methods: {},
  mounted() {


    /**
     * The following demo should work in Chrome, Safari 7 (and iOS 7?) and Firefox 25+, but seems to work only in Chrome at present.
     * This demo is based on code posted to http://stackoverflow.com/questions/13958158/why-arent-safari-or-firefox-able-to-process-audio-data-from-mediaelementsource
     *
     * Earlier variant of visualization demo that works in Chrome 18+:
     * http://updates.html5rocks.com/2012/02/HTML5-audio-and-the-Web-Audio-API-are-BFFs
     */

    // wait for window onload, otherwise may fail under Chrome. See http://crbug.com/112368

    console.log('window.onload()');

    var vm = this

    var AudioContext = (window.AudioContext || window.webkitAudioContext),
      audioContext, audioProcess, audioSource, didConnect,
      result = document.createElement('p'),
      output = document.createElement('span'),
      mp3 = vm.content,
      ogg = vm.content;
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
        // vm.freqs = freqByteData[0]
        // console.log(freqByteData)
        // console.log(freqByteData[0] + ', ' + freqByteData[1] + ', ' + freqByteData[2] + freqByteData[3] + ', ' + freqByteData[4] + ', ' + freqByteData[5] + freqByteData[6] + ', ' + freqByteData[7] + ', ' + freqByteData[8] + '...')
      }, 50);
      didConnect = true;
    }

    window.setTimeout(function() {
      connect();
    }, 20);


  },

  computed: {
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
.circle{
  border-radius: 100%;
  max-width: 600px;
  max-height: 600px;
  transition: all 0.04s;
}
</style>
