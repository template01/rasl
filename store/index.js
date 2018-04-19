import axios from 'axios'
import _ from 'lodash'

export const state = () => ({
  appinitated: true,
  apiRoot: 'http://194.61.64.171/backend/index.php/wp-json',
  posts: [],
  contenttypes: [],
  tags: [],
  praticePosts: [],
  featuredPosts: [],
  reflectivePosts: [],
  previewData: [],
  filterby:'',

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

  GET_FILTERBY(state) {
    return state.filterby
  },

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

  SET_FILTERREFLECTIVEBY(state, filterinput) {
    state.reflectivePosts = filterinput
  },

  SET_PRATICEBY(state, filterinput) {
    state.praticePosts = filterinput
  },

  SET_PREVIEWDATA(state, previewData) {
    state.previewData = previewData;
  },

  SET_POSTS(state, posts) {
    state.posts = posts;
  },

  SET_APPINITIATED(state, toggle) {
    state.appinitated = toggle;
  },

  SET_FILTERBY(state, name) {
    state.filterby = name;
  }

}


export const actions = {



  TRIGGER_SEARCHBYCOLUMNS({
    commit,
    state
  }, query) {

    function getReflectivePosts() {
      return axios.get(state.apiRoot + '/swp_api/search?s='+query.searchquery+'&post_type=reflective');
    }


    function getPraticePosts() {
      return axios.get(state.apiRoot + '/swp_api/search?s='+query.searchquery+'&post_type=pratice');
    }

    axios.all([getReflectivePosts(), getPraticePosts()])
      .then(axios.spread(function(reflective, pratice) {
        commit('SET_FILTERREFLECTIVEBY', reflective.data)
        commit('SET_PRATICEBY', pratice.data)
      }));

  },




  TRIGGER_FILTERCONTENTBY({
    commit,
    state
  }, filter) {

    function getReflectivePosts() {
      return axios.get(state.apiRoot + '/wp/v2/reflective' + '?filter[' + filter.name + ']=' + filter.items);
    }

    function getPraticePosts() {
      return axios.get(state.apiRoot + '/wp/v2/pratice' + '?filter[' + filter.name + ']=' + filter.items);
    }

    axios.all([getReflectivePosts(), getPraticePosts()])
      .then(axios.spread(function(reflective, pratice) {
        commit('SET_FILTERREFLECTIVEBY', reflective.data)
        commit('SET_PRATICEBY', pratice.data)
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

    // FILTER OUT contenttypes WITH NO ATTACHED POSTS (COUNT:0)
    state.contenttypes = _.filter(contenttypes.data, function(v) {
      return v.count > 0
    });

    // FILTER OUT tags WITH NO ATTACHED POSTS (COUNT:0)
    state.tags = _.filter(tags.data, function(v) {
      return v.count > 0
    });

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
