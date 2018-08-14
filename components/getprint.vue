<template>
<div class="pt-60">
  <!-- <div class="container"> -->
  <div class=" columns is-marginless is-size-5 pb-10  ">
    <div class="column">
      DOWNLOAD:
    </div>
  </div>
  <div class=" columns is-marginless is-size-4-desktop is-size-5-touch pb-10  ">
    <div class="column">
      <div>
        <span class="uppercase underline pointer" @click="getPdf()">Collection (.pdf)</span>
      </div>
      <div class="mt-10">
      <div  v-if="progress<100 && progress > 5" class="bar" :style="{'width':+progress+'%'}">
      </div>
      </div>

    </div>
    <div class="column">
      <div>
        <span class="uppercase underline pointer" @click="getPdf()">Cover (.pdf)</span>
      </div>
      <div class="mt-10">
      <div  v-if="progress<100 && progress > 5"  class="bar" :style="{'width':+progress+'%'}">
      </div>
      </div>
    </div>
  </div>

  <!-- <button @click="getPdf()">get pdf print</button>
    <br />
    <br />
    <div class="progress">
      <div class="bar" :style="{'width':+progress+'%'}">
      </div>
    </div>
    <span v-if="error">Ups... Something went wrong!</span>
  </div> -->

  <!-- </div> -->
</div>
</template>

<script>
import genericcomp from '~/components/_genericComp.vue'
import download from "downloadjs"
// require("downloadjs")(data, strFileName, strMimeType);



import axios from 'axios'
import {
  mapGetters
} from 'vuex'


export default {
  components: {
    genericcomp
  },
  data: function() {
    return {
      sourceUrl: 'http://publications.rasl.nu/collection/print',
      pdf: '',
      erros: [],
      error: false,
      loadingpdf: false,
      progress: 0
    }
  },
  computed: {
    ...mapGetters({
      windowsearch: "GET_WINDOWSEARCH",
    }),

  },
  methods: {
    getPdf: function() {

      this.loadingpdf = true
      this.progress = 0
      var vm = this
      var startSlow
      var startTime = new Date().getTime()
      var startFast = setInterval(function() {
        vm.progress = vm.progress + 1
        var currentTime = new Date().getTime()
        console.log(currentTime - startTime)
        if (currentTime - startTime > 3000) {
          clearInterval(startFast);
          var startSlow = setInterval(function() {
            vm.progress = vm.progress + 1
          }, 800);
        }
      }, 100);


      axios.post(this.$store.state.printServer + '/v1/convert', {
          headers: {
            'Accept-Encoding': 'application/gzip',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/pdf'
          },
          "to": "pdf",
          "converter": {
            "uri": this.sourceUrl + this.windowsearch,
            "extend": {
              "image-dpi": "300",
              // "grayscale":"",
              "image-quality": "80",
              "javascript-delay": "1",
              "margin-top": "5mm",
              "margin-bottom": "5mm",
              "margin-left": "50mm",
              "margin-right": "10mm"
            }
          },
          "template": "render-data"

        })
        .then(response => {

          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
          this.loadingpdf = false
          this.progress = 100
          clearInterval(startFast);
          clearInterval(startSlow);

          download('data:application/pdf;base64,' + response.data.result.data, this.sourceUrl + '.pdf', 'application/pdf');

        })
        .catch(e => {
          // this.errors.push(e)
          clearInterval(startFast);
          clearInterval(startSlow);
          this.loadingpdf = false
          this.error = true
          this.progress = 0

        })
    }
  },


}
</script>

<style>
.progress {
  width: 100px;
  height: 10px;
  background: red;
  position: relative;
}

.bar {
  /* width: 10px; */
  height: 10px;
  /* position: absolute; */
  border-radius: 10px;
  background: green;
  transition: width 0.4s;
}
</style>
