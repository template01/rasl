<template>
<div class="mt-80 mb-80 mr-20 ml-20">
  <div v-if="appinitated" class="container">
    <input v-model="sourceUrl" />

    <button @click="getPdf()">get pdf print</button>
    <!-- <span v-if="loadingpdf">making pdf...</span> -->
    <br />
    <br />
    <div class="progress">
      <div class="bar" :style="{'width':+progress+'%'}">

      </div>
    </div>
    <span v-if="error">Ups... Something went wrong!</span>
    <!-- <a v-if="!loadingpdf && pdf" download="my document" :href="'data:application/pdf;base64,'+pdf.result.data" >Download pdf document</a> -->
  </div>
  <div v-else class="container">
    <div>
      <div class="columns">
        <div class="column">
          <p class="is-size-3 has-text-danger">
            Loading
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
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
      sourceUrl: 'rasl.nu',
      pdf: '',
      erros: [],
      error: false,
      loadingpdf: false,
      progress: 0
    }
  },
  computed: {
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
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
        console.log(currentTime-startTime)
        if(currentTime-startTime>3000){
          clearInterval(startFast);
          var startSlow = setInterval(function() {
            vm.progress = vm.progress + 1
          }, 800);
        }
      }, 100);


      axios.post(this.$store.state.printServer+'/v1/convert', {
          headers: {
            'Accept-Encoding': 'application/gzip',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/pdf'
          },
          "to": "pdf",
          "converter": {
            "uri": this.sourceUrl,
            "extend": {
              "image-dpi":"300",
              // "grayscale":"",
              "image-quality":"80",
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
  width: 10px;
  height: 10px;
  position: absolute;
  background: green;
  transition: width 0.4s;
}
</style>
