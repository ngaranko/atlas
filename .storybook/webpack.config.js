module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  })
  // config.module.rules.push({
  //   test: /\.jsx?$/,
  //   use: 'babel-loader',
  // })
  // config.resolve.extensions.push('.jsx')

  return config
}
