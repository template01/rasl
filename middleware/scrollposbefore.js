// import Vue from 'vue'

export default function({
  route,
  redirect,
  store
}) {

  if (process.browser) {
    store.commit('SET_SCROLLPOS', {
      'path': store.state.viewing,
      'posy': window.scrollY
    })

  }
}
