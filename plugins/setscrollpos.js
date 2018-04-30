import Vue from 'vue'
export default ({ app: { router,store } }) => {
  if (!process.browser) return
  router.afterEach((to, from) => {
    Vue.nextTick(() => {
      function scrollToY(){
        store.commit('SET_VIEWING', to.path)
        var hasSaved = _.filter(store.state.scrollpos, {'path':to.path})
        console.log(hasSaved)
        if(hasSaved.length>0){
          console.log(hasSaved[0].posy)
           window.scroll(0, hasSaved[0].posy)
        }
      }
      window.setTimeout(function(){
        scrollToY()
      },20)
      window.setTimeout(function(){
        scrollToY()
      },50)
      window.setTimeout(function(){
        scrollToY()
      },100)
    })
  })
}
