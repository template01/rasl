// import Vue from 'vue'

export default function({
  route,
  redirect,
  store
}) {

  if (process.browser) {
    $nuxt.$loading.start()
    return new Promise((resolve) => {
      // Wait 1 second between each route
      setTimeout(resolve, 300);
    })
  }
}
