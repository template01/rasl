// import Vue from 'vue'

export default function ({ route, redirect, store }) {
// export default ({ app: { router,store } }) => {
//   if (!process.browser) return
//
//   router.beforeEach((to, from) => {
//     Vue.nextTick(() => {
      // console.log('hey')
      // window.history.replaceState({}, '', store.state.windowsearch);
//     })
//   })

  //
  //
  if(process.browser){
    store.commit('SET_SCROLLPOS', {'path':store.state.viewing,'posy':window.scrollY})

  }
}
