import axios from 'axios'
var URI = require('urijs');
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
  filterby: '',
  filters: [],
  selected: []
  // MOCK SELECTED
  // selected: [{'postid': 1801,'posttype': 'pratice'}]
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

  GET_FILTERS(state) {
    return state.filters
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
  },

  GET_SELECTED(state) {
    return state.selected
  },
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
  },

  SET_FILTERS(state, input) {
    state.filters = input;
  },

  SET_ADDSELECTED(state, input) {
    state.selected.push(input);
    state.selected = _.uniqBy(state.selected, 'postid', 'posttype');

    // _.union(state.selected, [input]);
    // state.selected = _.union(state.selected,[input]);
  },

  SET_REMOVESELECTED(state, input) {
    state.selected = _.remove(state.selected, function(e) {
      return e.postid != input.postid && e.posttype != input.posttype;
    });
  }

}


export const actions = {



  TRIGGER_ADDSELECTED({
    commit,
    state
  }, selectedItems) {

    commit('SET_ADDSELECTED', {
      'postid': selectedItems.postid,
      'posttype': selectedItems.posttype
    })
    var url = new URI(window.location.search).addSearch({
      selected: selectedItems.postid + ',' + selectedItems.posttype
    })
    window.history.replaceState({}, '', '?' + url._parts.query);
  },

  TRIGGER_REMOVESELECTED({
    commit,
    state
  }, selectedItems) {

    commit('SET_REMOVESELECTED', {
      'postid': selectedItems.postid,
      'posttype': selectedItems.posttype
    })

    var url = new URI(window.location.search).removeSearch({
      selected: selectedItems.postid + ',' + selectedItems.posttype
    })
    window.history.replaceState({}, '', '?' + url._parts.query);

    // var url = new URI(window.location.search).removeSearch("selected").addSearch({
    //   selected: state.selected[0].id
    // })
    // window.history.replaceState({}, '', '?' + url._parts.query);
  },




  TRIGGER_SEARCHBYCOLUMNS({
    commit,
    state
  }, query) {

    function getReflectivePosts() {
      return axios.get(state.apiRoot + '/swp_api/search?s=' + query.searchquery + '&post_type=reflective');
    }


    function getPraticePosts() {
      return axios.get(state.apiRoot + '/swp_api/search?s=' + query.searchquery + '&post_type=pratice');
    }

    axios.all([getReflectivePosts(), getPraticePosts()])
      .then(axios.spread(function(reflective, pratice) {
        commit('SET_FILTERREFLECTIVEBY', reflective.data)
        commit('SET_PRATICEBY', pratice.data)

        var url = new URI(window.location.search).removeSearch("filter").removeSearch("filters").removeSearch("search").addSearch({
          search: query.searchquery,
        });
        window.history.replaceState({}, '', '?' + url._parts.query);


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
        commit('SET_FILTERS',filter.items)


        var url = new URI(window.location.search).removeSearch("filter").removeSearch("filters").removeSearch("search").addSearch({
          filter: filter.name,
          filters: filter.items
        })
        window.history.replaceState({}, '', '?' + url._parts.query);

      }));

  },


  // LOAD INITIAL DATA (SSR)
  async nuxtServerInit({
    commit,
    state,

  }, {
    req,
    route
  }) {

    // GET ALL QUERIES
    const querys = URI(route.fullPath).query(true)

    // SET ACTIVE SELECTED POSTS
    var selected = ''
    if (Array.isArray(querys['selected'])) {
      selected = querys['selected']
    } else {
      selected = [querys['selected']]
    }

    if (querys['selected']) {
      const tmpArray = []
      for (var i in selected) {
        const id = parseInt(selected[i].split(',')[0])
        const type = selected[i].split(',')[1]
        tmpArray.push({
          'postid': id,
          'posttype': type
        })
      }
      state.selected = tmpArray
    }

    // SET ACTIVE FILTERS

    var filterby = selected = querys['filter']
    console.log(filterby)
    var filters = selected = querys['filters']
    console.log(filters)


    if (filters != null) {
      state.filters = filters
    }

    if (filterby != null) {
      state.filterby = filterby
    }

    // TO DO

    // SET ACTIVE SEARCH

    // TO DO



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
      // console.log(state.apiRoot + '/wp/v2/reflective' + '?filter[' + state.filterby + ']=' + state.filters)
      return axios.get(state.apiRoot + '/wp/v2/reflective' + '?filter[' + state.filterby + ']=' + state.filters);
      // return axios.get(state.apiRoot + '/wp/v2/reflective');
      // return axios.get(state.apiRoot + '/wp/v2/reflective' + '?filter[' + filterby + ']=' + filters);
      // return axios.get(state.apiRoot + '/wp/v2/reflective' + '?filter[' + 'tag' + ']=' + 'ai');
    }

    function getPraticePosts() {
      // console.log(state.apiRoot + '/wp/v2/pratice' + '?filter[' + state.filterby + ']=' + state.filters)
      return axios.get(state.apiRoot + '/wp/v2/pratice' + '?filter[' + state.filterby + ']=' + state.filters);
      // return axios.get(state.apiRoot + '/wp/v2/pratice');
      // return axios.get(state.apiRoot + '/wp/v2/pratice' + '?filter[' + filterby + ']=' + filters);
      // return axios.get(state.apiRoot + '/wp/v2/pratice' + '?filter[' + 'tag' + ']=' + 'ai');
    }

    function getContentTypes() {
      return axios.get(state.apiRoot + '/wp/v2/contenttype');
    }

    function getTags() {
      return axios.get(state.apiRoot + '/wp/v2/tags');
    }


    const [reflective, pratice, contenttypes, tags] = await Promise.all([getReflectivePosts(), getPraticePosts(), getContentTypes(), getTags()])
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
