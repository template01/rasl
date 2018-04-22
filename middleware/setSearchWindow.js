export default function ({ route, redirect, store }) {

  // ON NAVIGATING BACK AND FORTH REMEMBER QUERYIES

  if(process.browser){

    window.history.replaceState({}, '', '?' + store.state.windowsearch.replace(/^\/+/g, ''));
  }

  console.log('chnaggggggggggggggggggggggggggggggggggggggggeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
}
