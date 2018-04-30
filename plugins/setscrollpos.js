import Vue from 'vue'
export default ({ route, app: { router,store } }) => {
  if (!process.browser) return
  router.afterEach((to, from) => {
    Vue.nextTick(() => {
      function scrollToY(){
        store.commit('SET_VIEWING', to.path)
        var hasSaved = _.filter(store.state.scrollpos, {'path':to.path})
        // console.log( window.location.hash)
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
        if(store.state.scrollpos.length === 0){
          if (route.query.filter != null ||route.query.search != null) {
            var elmnt = document.getElementById("library");
            elmnt.scrollIntoView();
          }
        }
      },100)
    })
  })
}
