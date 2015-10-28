var page = require('webpage').create();
var fs = require('fs');
var init = 'https://simple.wiktionary.org/wiki/Special:AllPages/a';
var filename = 'pages.txt';

var file = fs.open(filename, 'w'); //Open Mode. A string made of 'r', 'w', 'a/+', 'b' characters.
var list = ''


function scrapePage(url) {
    page.open(url, function(status) {
        // list all the a.href links in the hello kitty etsy page

        var links = page.evaluate(function() {
            return [].map.call(document.querySelectorAll('.mw-allpages-chunk a'), function(link) {
                return link.getAttribute('href');
            });
        });
        list += links.join('\n')

        // console.log(list);

        fs.write(filename, list, 'w')

        // var next = page.evaluate(function() {
        //     return document.querySelector(".mw-allpages-nav").innerHtml;
        // });
        // console.log(links[links.length-1])
        console.log(list)
        scrapePage('https://simple.wiktionary.org/w/index.php?title=Special:AllPages&from=' + links[links.length - 1].split('/')[2])
            // phantom.exit();
            // return links[links.length]
    });
}

scrapePage(init)
    // 'https://simple.wiktionary.org/w/index.php?title=Special:AllPages&from='abuses
