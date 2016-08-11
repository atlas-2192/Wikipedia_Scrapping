'use strict'
var fs = require('fs')
let cheerio = require('cheerio')
let request = require('request')

const baseUrl = 'http://a-z-animals.com/mobile/'
let output = ''
let c = 0;
const getList = ()=>{
  request(baseUrl+'index.php?l=1', function (err, res, bod) {
      if (err) {
          throw err
      }

      let $ = cheerio.load(bod);

      let pages =$('li a').map(function (i, el) {
        return {name:$(this).text(),loc:el.attribs.href}

      }).get()
      c=pages.length

      pages.forEach(scrapePage)

  })
}
const scrapePage = (info) =>{
      request(baseUrl+info.loc, function (err, res, bod) {
          if (err) {
              throw err
          }

          let $ = cheerio.load(bod);

          let content = $('.p_justify').map(function (i, el) {
              return ($(this).text()+ ' ')
          }).get().join(' ')

          // content = info.name+" "+content
          output += content
          c--;
          console.log(c + "  " + content.slice(0,150))

          if(c <= 0 ){
            fs.writeFile("A-Zoutput.txt",output, (error) => {
                         if (err) throw err
                     })
           }
      })
}

getList()
