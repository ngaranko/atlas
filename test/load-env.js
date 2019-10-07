const dotenv = require('dotenv')

module.exports = dotenv.config({
  path: './.env.acceptance',
}).parsed
