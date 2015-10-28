var MediaWiki = require("mediawiki");
var fs = require('fs');
var bot = new MediaWiki.Bot();
var _ = require('underscore')
bot.settings.endpoint = "https://simple.wiktionary.org/w/api.php";

fs.writeFileSync('output.txt', '');
console.log("clearing file... \n")

data = fs.readFileSync('pages.txt').toString();


_.map(data.split('\n'), (page) => {
    scrape(page.split('/')[2])
})


function scrape(page) {

    bot.page(page).complete(function(title, text, date) {
        console.log(title);
        console.log(text);
        fs.appendFileSync('output.txt', text + "\n\n")

        // console.log(date);
    });
}

// "Special:AllPages/a"
// bot.page("abandon").complete(function(title, text, date) {
//     console.log(title);
//     console.log(text);
//     // console.log(date);
// });
