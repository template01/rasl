var cheerio = require('cheerio')

var self = module.exports = {
  logIn: function(username, password) {
    return 'la lala '
  },

  footnotesSingleBlock: function(input) {
    const $ = cheerio.load(input)
    // var footnoteSelectors = $('.simple-footnote').attr('title')
    var footnotesInBlock = []
    $('.simple-footnote').each(function(){
      const number = $(this).text()
      const content = $(this).attr('title')
      const returnNote = $(this).attr('id')
      footnotesInBlock.push({'id':number,'content':content,'returnnote':returnNote})
    })
      return footnotesInBlock
  },

  footnotesAll: function(input) {
    var footnotesAll = []
    for (var i = 0, len = input.length; i < len; i++) {
      footnotesAll.push(self.footnotesSingleBlock(input[i].content))
    }
    return footnotesAll
  },

  footnotesAllPosts: function(input) {
    var footnotesAllPosts = []
    for (var i = 0, len = input.length; i < len; i++) {
      // footnotesAllPosts.push(input[i].acf.contentbuilder)

      footnotesAllPosts.push(self.footnotesAll(input[i].acf.contentbuilder))
    }
    return footnotesAllPosts
  }

};
