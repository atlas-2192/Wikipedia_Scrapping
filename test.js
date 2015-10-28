  var wikipedia = require("wikipedia-js");
  var _ = require("underscore");

  var query = "pluto";
  // if you want to retrieve a full article set summaryOnly to false. 
  // Full article retrieval and parsing is still beta 
  var options = {
      query: query,
      format: "json",
      summaryOnly: false,
      lang: "simple"
  };

  wikipedia.searchArticle(options, function(err, htmlWikiText) {
      if (err) {
          console.log("An error occurred[query=%s, error=%s]", query, err);
          return;
      }
      // console.log()
      console.log(JSON.parse(htmlWikiText).query.pages[Object.keys(JSON.parse(htmlWikiText).query.pages)[0]].revisions[0]["*"])

  })

