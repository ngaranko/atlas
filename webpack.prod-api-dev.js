const devConfig = require('./webpack.dev.js')

module.exports = env => {
  const nodeEnv = env && env.nodeEnv ? env.nodeEnv : 'production'
  const buildId = env && env.buildId ? env.buildId : nodeEnv

  return devConfig({ nodeEnv, buildId })
}
