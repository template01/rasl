import axios from 'axios'

export const state = () => ({
  appinitated: true,
  apiRoot: 'http://194.61.64.171/backend/?rest_route=',
  posts: [],
  contenttypes: [],
  tags: [],
  praticePosts: [],
  featuredPosts: [],
  reflectivePosts: [],
  previewData: [],
})

//
// function checkReadmore(){
//   if (window.location.hash === '#read') {
//     return true;
//   }else{
//     return false;
//   }
// }
// this.$store.commit('SET_READMORE', true)


export const getters = {

  GET_APP_INITIATED(state) {
    return state.appinitated
  },

  GET_PRATICEPOSTS(state) {
    return state.praticePosts
  },

  GET_REFLECTIVEPOSTS(state) {
    return state.reflectivePosts
  },

  GET_FEATUREDPOSTS(state) {
    return state.featuredPosts
  },

  GET_POSTS(state) {
    return state.posts
  },

  GET_PREVIEWDATA(state) {
    return state.previewData
  },

  GET_TAGS(state) {
    return state.tags
  },

  GET_CONTENTTYPES(state) {
    return state.contenttypes
  }
}

export const mutations = {

  //
  //
  // SET_FILTERCONTENTBYTAG(state, taginput) {
  //   //
  //   // axios.get('/user?ID=12345')
  //   //   .then(function (response) {
  //   //     console.log(response);
  //   //   })
  //   //
  //   // const [reflective, pratice ] = await Promise.all([getPraticePosts(), getReflectivePosts()])
  //   // state.reflectivePosts = reflective.data
  //   // state.praticePosts = pratice.data
  //
  //   function getReflectivePosts() {
  //     return axios.get(state.apiRoot + '/wp/v2/reflective' + '&filter[tag]=future');
  //   }
  //
  //   function getPraticePosts() {
  //     return axios.get(state.apiRoot + '/wp/v2/pratice' + '&filter[tag]=future');
  //   }
  //
  //   axios.all([getReflectivePosts(), getPraticePosts()])
  //     .then(axios.spread(function(reflective, pratice) {
  //       // Both requests are now complete
  //       state.reflectivePosts = reflective.data
  //       state.praticePosts = pratice.data
  //     }));
  //
  //
  //
  // },

  // async SET_FILTERCONTENTBYTAG(state,taginput) {
  //   function getReflectivePosts() {
  //     return axios.get(state.apiRoot + '/wp/v2/reflective'+'&filter[tag]=future');
  //   }
  //
  //   function getPraticePosts() {
  //     return axios.get(state.apiRoot + '/wp/v2/pratice'+'&filter[tag]=future');
  //   }
  //
  //   const [reflective, pratice ] = await Promise.all([getPraticePosts(), getReflectivePosts()])
  //   state.reflectivePosts = reflective.data
  //   state.praticePosts = pratice.data
  // },
  //

  SET_FILTERREFLECTIVEBYTAG(state, taginput) {
    state.reflectivePosts = taginput
  },

  SET_PRATICEBYTAG(state, taginput) {
    state.praticePosts = taginput
  },



  SET_PREVIEWDATA(state, previewData) {
    state.previewData = previewData;
  },

  SET_POSTS(state, posts) {
    state.posts = posts;
  },

  SET_APPINITIATED(state, toggle) {
    state.appinitated = toggle;
  }

}


export const actions = {


  TRIGGER_FILTERCONTENTBYTAG({
    commit,
    state
  }, input) {

    function getReflectivePosts() {
      return axios.get(state.apiRoot + '/wp/v2/reflective' + '&filter[tag]=' + input);
    }

    function getPraticePosts() {
      return axios.get(state.apiRoot + '/wp/v2/pratice' + '&filter[tag]=' + input);
    }

    axios.all([getReflectivePosts(), getPraticePosts()])
      .then(axios.spread(function(reflective, pratice) {
        // Both requests are now complete
        // state.reflectivePosts = reflective.data
        // state.praticePosts = pratice.data
        commit('SET_FILTERREFLECTIVEBYTAG', reflective.data)
        commit('SET_PRATICEBYTAG', pratice.data)
      }));

  },


  // LOAD INITIAL DATA (SSR)
  async nuxtServerInit({
    commit,
    state
  }, {
    req
  }) {

    // GET ALL FEATURED POSTS
    const featuredPostsRes = await axios.get(state.apiRoot + '/wp/v2/featured');
    const featuredPosts = featuredPostsRes.data
    // FOR EACH FEATURED POST RETURN id AND post_type
    // FETCH CONTENT FROM POST ENDPOINT
    // MAP THE DATA-KEY
    const results = (await axios.all(
      featuredPosts.map(
        function(featuredPostSingle) {
          // CHECK IF POSTS HAS A LINK
          if ('ID' in featuredPostSingle.acf.postlink) {
            return axios.get(state.apiRoot + `/wp/v2/${featuredPostSingle.acf.postlink.post_type}/${featuredPostSingle.acf.postlink.ID}`)
          } else {
            return {}
          }
        }
      )
    )).map(result => result.data)

    // RETURN RESULT AN FILTER OUT EMPTY OBJECTS

    state.featuredPosts = results.filter(function(n) {
      return n != undefined
    });


    function getReflectivePosts() {
      return axios.get(state.apiRoot + '/wp/v2/reflective');
    }

    function getPraticePosts() {
      return axios.get(state.apiRoot + '/wp/v2/pratice');
    }

    function getContentTypes() {
      return axios.get(state.apiRoot + '/wp/v2/contenttype');
    }

    function getTags() {
      return axios.get(state.apiRoot + '/wp/v2/tags');
    }


    const [reflective, pratice, contenttypes, tags] = await Promise.all([getPraticePosts(), getReflectivePosts(), getContentTypes(), getTags()])
    state.reflectivePosts = reflective.data
    state.praticePosts = pratice.data
    state.contenttypes = contenttypes.data
    state.tags = tags.data

  },

  // LOAD INITIAL DATA (SPA)
  // async nuxtClientInit({
  //   commit,
  //   state
  // }, {
  //   req
  // }) {
  //
  //   const postsRes = await axios.get(state.apiRoot + '/posts')
  //   state.posts = postsRes.data
  //
  // }



}
