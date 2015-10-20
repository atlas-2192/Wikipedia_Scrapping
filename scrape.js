var wikipedia = require("wikipedia-js");
var _ = require('underscore') //underscore is a functional toolkit.e.g. _.exampleUnderscoreFunction
var cheerio = require('cheerio');
var filename = 'input.txt'
var fs = require('fs')
fs.writeFileSync(filename, '');

// var query = "Napoleon Bonaparte";


var query = "List_of_animals_by_common_name";

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
    parseList(htmlWikiText)
        // console.log("Query successful[query=%s, html-formatted-wiki-text=%s]", query, htmlWikiText);
})

function parseList(data) {
    $ = cheerio.load(data);
    var links = []
    $('a').each(function(i, elem) {
        links[i] = $(this).text() //$(this).attr("href")
    });

    _.each(links, getArticle)
}

function getArticle(link) {
    // console.log(link)
    var options = {
        query: link,
        format: "html",
        summaryOnly: false
    };
    wikipedia.searchArticle(options, function(err, htmlWikiText) {
        if (err) {
            console.log("An error occurred[query=%s, error=%s]", query, err);
            return;
        }
        if (_.isNull(htmlWikiText))
            return

        $ = cheerio.load(htmlWikiText);

        $('h1,h2,h3,h4,h5,p').each(function() {
            var content = $(this).text();
            fs.appendFileSync(filename, content + "\n")
                // console.log(content)
        })

    })
}
