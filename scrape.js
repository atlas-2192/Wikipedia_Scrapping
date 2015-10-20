var wikipedia = require("wikipedia-js");
var _ = require('underscore') //underscore is a functional toolkit.e.g. _.exampleUnderscoreFunction
var cheerio = require('cheerio');
var filename = 'input.txt'
var fs = require('fs')
fs.writeFileSync(filename, '');
console.log("clearing file... \n")

var total = 0;
var current = 0;

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
    total = links.length
        // _.each(links, console.log)

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

        var $ = cheerio.load(htmlWikiText);


        // $('*').each(function() { // iterate over all elements
        // if (!_.isUndefined(this[0]))
        // this[0].removeAttr('href') = {}; // remove all attributes
        // });
        $('a').removeAttr('href')
        $('.reference').remove()
        $('ref').remove()

        var html = $.html();

        fs.appendFileSync(filename, html + " ")

        current++
        console.log(current + "/" + total)

    })
}
