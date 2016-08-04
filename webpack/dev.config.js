require('babel-polyfill');
var path = require("path");
var webpack = require("webpack");
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var GetIndexPlugin = require('./plugins/get-index.js');
var MarkdownReader = require('./plugins/markdown-reader.js');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname,'..'),
    entry: {
      main: ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:23456','./app/index.jsx'],
      vendor: ['react']
    },
    output: {
        filename: 'bundle.[hash].js',
        publicPath: 'dist/app'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            },
            __PRODUCTION__: false,
            __DEVELOPMENT__: true
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
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.json/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        modulesDirectories: [
            'app',
            'node_modules'
        ],
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        port: 23456,
        hot: true,
        host:"0.0.0.0",
        historyApiFallback: {
          index: 'index.html'
        }
    }
};
