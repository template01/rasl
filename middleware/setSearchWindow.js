var URI = require('urijs');

export default function ({ route, redirect, store }) {

  // ON NAVIGATING BACK AND FORTH REMEMBER QUERYIES

  if(process.browser){

    // var url = new URI(window.location.search).removeSearch('selected')
    //
    // var vm = this
    // this.myArray.forEach(function(element) {
    //   url.addSearch({
    //     selected: element.id + ',' + element.type
    //   })
    // });
    console.log(store.state.windowsearch)

    window.history.replaceState({}, '', '?' + store.state.windowsearch.replace(/^\/+/g, ''));
  }

}
