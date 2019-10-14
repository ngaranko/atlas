const express = require('express')

const bodyParser = require('body-parser')
const buildXML = require('./buildXML')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/sitemap', async (req, res) => {
  const result = await buildXML()
  res.setHeader('Content-Type', 'text/xml')
  res.write(result)
  res.end()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
