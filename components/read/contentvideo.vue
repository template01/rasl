<template>
<div class="contentvideo columns is-marginless ">
  <div class="column is-10 is-offset-1">
    <div class=" pr-40 pl-40">
      <div class='embed-container'>
        <iframe :src="videoUrl" frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
        <transition name="fade">
          <div v-if="!playTriggerHide" @click="playVimeo()" class="playTrigger duotone Aligner pointer" :style="coverimage ? { 'background-image': 'url(' + coverimage.sizes.large + ')' }:{}" :class="$route.params.type === 'practice' ? 'red-background-before':'green-background-before'">
            <span class="playButton Aligner"><div class="arrow-right"></div></span>
          </div>
        </transition>

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
  props: ['content', 'printversion', 'coverimage'],
  data: function() {
    return {
      genericData: 'generic component text',
      videoUrl: '',
      playTriggerHide: false
    }
  },
  methods: {
    playVimeo: function() {
      this.videoUrl = this.autoplayVimeo
      this.playTriggerHide = true
    }
  },
  computed: {
    embedUrl: function() {
      return 'https://player.vimeo.com/video/' + this.content.match(/\/([^\/]+)\/?$/)[1]
    },
    initialVimeo: function() {
      return this.embedUrl + '?autoplay=0&loop=1&autopause=0&background=0'
    },
    autoplayVimeo: function() {
      return this.embedUrl + '?autoplay=1&loop=1&autopause=0&background=0'
    },
    ...mapGetters({
      appinitated: "GET_APP_INITIATED",
    }),
  },
  created() {
    this.videoUrl = this.initialVimeo
  }


}
</script>
<style lang="scss">
.contentvideo {

    .embed-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        max-width: 100%;
    }
    .embed-container .playTrigger,
    .embed-container embed,
    .embed-container iframe,
    .embed-container object {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background: red;

    }

    .playTrigger {
        // background: red;
    }
    .playButton {
        width: 200px;
        height: 200px;
        background: white;
        border-radius: 100%;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
        transition-delay: 0.5s;
    }
    /* .fade-leave-active below version 2.1.8 */
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .arrow-right {
        width: 0;
        height: 0;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;

        border-left: 30px solid green;
        margin-right: -15px;
    }

    .duotone {
        background: no-repeat center center fixed;
        background-size: cover;
        width: 100%;
        height: 100%;
    }

    .green-background-before::before {
        background-color: $green;
    }

    .green-background-before::after {
        background-color: $lightblue;
    }

    .red-background-before::before {
        background-color: $pink;
    }

    .red-background-before::after {
        background-color: $red;
    }

    .duotone::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        mix-blend-mode: color;
        position: absolute;
        top: 0;
        left: 0;
    }

    .duotone::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        mix-blend-mode: lighten;
        position: absolute;
        top: 0;
        left: 0;
    }

}
</style>
