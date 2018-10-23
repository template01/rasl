var cheerio = require('cheerio')

export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.myInjectedFunction = function(string){
    console.log('Okay, another xxxxxfunction', string)
  }

  app.footnotesSingleBlockItem = function(input) {
    const $ = cheerio.load(input)
    // var footnoteSelectors = $('.simple-footnote').attr('title')
    var footnotesSingleBlockItem = []
    $('.simple-footnote').each(function() {
      const number = $(this).text()
      const content = $(this).attr('title')
      const returnNote = $(this).attr('id')
      footnotesSingleBlockItem.push({
        'id': number,
        'content': content,
        'returnnote': returnNote
      })
    })
    return footnotesSingleBlockItem

  }

  app.footnotesSingleBlock = function(input) {
    // if array = if content input is GALLERY, FLEX CONTENT, REPEATER etc.. then return empty array
    if(Array.isArray(input)){
      return []
    }else{
      return app.footnotesSingleBlockItem(input)
    }

  }

  app.footnotesAll = function(input) {
    var footnotesAll = []
    console.log('input')
    console.log(input.length)
    for (var i = 0, len = input.length; i < len; i++) {
      footnotesAll.push(app.footnotesSingleBlock(input[i].content))
    }
    return footnotesAll
  }

  app.footnotesAllPosts = function(input) {
    var footnotesAllPosts = []
    for (var i = 0, len = input.length; i < len; i++) {
      // footnotesAllPosts.push(input[i].acf.contentbuilder)

      footnotesAllPosts.push(app.footnotesAll(input[i].acf.contentbuilder))
    }
    return footnotesAllPosts
  }


}
