import Vue from 'vue'

export default ({ app: { router,store } }) => {
  if (!process.browser) return

  router.afterEach((to, from) => {
    Vue.nextTick(() => {
      window.history.replaceState({}, '', store.state.windowsearch);
    })
  })
}
