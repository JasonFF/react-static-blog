require('babel-polyfill');
var path = require("path");
var webpack = require("webpack");
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var GetIndexPlugin = require('./plugins/get-index.js');
var MarkdownReader = require('./plugins/markdown-reader.js');

module.exports = {
    context: path.resolve(__dirname,'..'),
    entry: {
      main: './app/index.jsx',
      vendor:['react']
    },
    output: {
        path:"./dist/app",
        filename: 'bundle.[hash].js'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
      new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
      new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
          },
          __PRODUCTION__: true,
          __DEVELOPMENT__: false
      }),
      new GetIndexPlugin({
        from: path.join('./static', 'index.html'),
        to: path.join('./', 'index.html')
      }),
      new MarkdownReader({
        from: path.join('./static/markdowns'),
        context: path.join('./')
      })
    ],
    module: {
        loaders: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style','css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!less?outputStyle=expanded&sourceMap')
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                loader: ExtractTextPlugin.extract('style','css!less')
            },
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    plugins: ['transform-runtime', 'add-module-exports', "transform-decorators-legacy", ['antd', {'style':true}]],
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    resolve: {
        modulesDirectories: [
            'app',
            'node_modules'
        ],
        extensions: ['', '.js', '.jsx']
    }
};
