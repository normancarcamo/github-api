var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var dir = (src) => path.resolve(__dirname, src);

module.exports = {
  devtool: "cheap-module-eval-source-map",
  name: 'frontend',
  entry: {frontend: dir('./src/frontend/entry.js')},
  output: {
    filename: '[name].js',
    path: dir('./src/bundles/'),
    publicPath: 'app/',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  node: {fs: "empty"},
  cache: false,
  debug: true,
  target: 'web',
  resolve: {
    alias: {
      // dictionary: dir('./src/frontend/assets/js/dictionary.js'),
      // helpers: dir('./src/frontend/assets/js/methods.js')
    },
    extensions: ['', '.js', '.jsx', '.styl', '.css'],
    root: [
      dir('./node_modules'),
      dir('./src'),
      dir('./src/backend'),
      dir('./src/backend/models'),
      dir('./src/backend/controllers'),
      dir('./src/backend/views'),
      dir('./src/backend/utils'),
      dir('./src/bundles'),
      dir('./src/commons'),
      dir('./src/frontend'),
      dir('./src/frontend/actions'),
      dir('./src/frontend/assets'),
      dir('./src/frontend/components'),
      dir('./src/frontend/constants'),
      dir('./src/frontend/dispatcher'),
      dir('./src/frontend/stores')
    ]
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
      { test: /\.scss$/, loaders: ["style", "css"] },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader','css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!stylus-loader'), exclude: './node_modules' },
      { test: /\.json?$/, loader: 'json'},
      { test: /\.(js|jsx)$/, loader: 'babel', include: dir('./src'), exclude: './node_modules', query: { presets: ["es2015", "es2016", "es2017", "stage-0", "stage-1", "stage-2", "stage-3","react"], compact: false } },
      { test: /.*\.(woff|woff2|ttf|eot|svg|otf|jpe?g|jpg|png|gif|svg)$/i, loader: "url-loader?limit=1048576&name=img/img-[hash:6].[ext]" },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {NODE_ENV: JSON.stringify("production"), BROWSER: JSON.stringify(true)},
      "global.GENTLY": false,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }, output: {comments: false}}),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('frontend', null, false)
  ]
};
