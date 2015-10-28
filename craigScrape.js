var request = require("request");
var cl = require("craigslist-utils");

console.log(cl.lookup_discussion_forum(575))

cl.get_posts(console.log, "seattle", cat_code, sub_area_code, options)
// var url = "https://forums.craigslist.org/?areaID=25&forumID=575"

// request('https://forums.craigslist.org/?areaID=25&forumID=575', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage. 
//   }
// })
