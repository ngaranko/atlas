const prodConfig = require('./webpack.prod.js')

module.exports = env => {
  const nodeEnv = env && env.nodeEnv ? env.nodeEnv : 'acceptance'
  const buildId = env && env.buildId ? env.buildId : nodeEnv

  return prodConfig({ nodeEnv, buildId })
}
