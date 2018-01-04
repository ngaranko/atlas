const path = require('path');

module.exports = (baseConfig, configType) => {
  baseConfig.resolve.modules.push('src');

  baseConfig.module.rules.push(
    {
      test: /\.(css|scss)$/,
      loaders: [
        'style-loader?singleton',
        'css-loader',
        'sass-loader'
      ],
      include: path.resolve(__dirname, '../')
    },
    {
      test: /\.(png|jpg|gif)$/,
      exclude: /__diff_output__/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    },
    {
      test: /\.svg$/,
      exclude: /node_modules/,
      loader: 'svg-react-loader'
    }
  );

  return baseConfig;
};
