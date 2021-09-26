const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, options) => {
  const mode = options.mode || 'development';
  return {
    entry: './src/index.ts',
    devtool: 'source-map',
    mode,
    module: {
      rules: [
        { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.html$/, use: 'html-loader' },
        { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
        {
          test: /\.(glsl|vs|fs|vert|frag)$/i,
          exclude: /node_modules/,
          use: ['raw-loader', 'glslify-loader'],
        },
      ],
    },
    optimization: { usedExports: true },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: mode === 'production' ? true : false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Tyler Lindberg',
        template: 'src/index.html',
        hash: true,
      }),
      new MiniCssExtractPlugin(),
    ],
    resolve: { extensions: ['.ts', '.js'] },
  };
};
