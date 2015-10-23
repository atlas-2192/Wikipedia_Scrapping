  var wikipedia = require("wikipedia-js");
  var query = "List_of_religions";
  // if you want to retrieve a full article set summaryOnly to false. 
  // Full article retrieval and parsing is still beta 
  var options = {
      query: query,
      format: "html",
      summaryOnly: false
  };
  wikipedia.searchArticle(options, function(err, htmlWikiText) {
      if (err) {
          console.log("An error occurred[query=%s, error=%s]", query, err);
          return;
      }
      console.log("Query successful[query=%s, html-formatted-wiki-text=%s]", query, htmlWikiText);

  })
