const buildXML = require('./buildXML')
const fs = require('fs')
const path = require('path')

const src = path.join(__dirname, '../public/static')

buildXML()
  .then(result => {
    fs.writeFile(path.join(src, 'sitemap.xml'), result, function(err) {
      if (err) {
        return console.log(err)
      }

      console.log('The file was saved!')
    })
  })
  .catch(e => {
    console.log(e)
  })
