const buildXML = require('./buildXML')
const fs = require('fs')

buildXML()
  .then(result => {
    fs.writeFile('../public/static/sitemap.xml', result, function(err) {
      if (err) {
        return console.log(err)
      }

      console.log('The file was saved!')
    })
  })
  .catch(e => {
    console.log(e)
  })
