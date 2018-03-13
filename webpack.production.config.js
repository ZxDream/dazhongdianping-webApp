var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app/index.jsx'),
        vendor: [
          'react', 
          'react-dom', 
          'react-redux', 
          'react-router',
          'react-router-dom',
          'redux', 
          'es6-promise', 
          'whatwg-fetch'
        ]
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].[chunkhash:8].js",
        publicPath: './'
    },

    resolve:{
        extensions:['.js','.jsx']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(less|css)?$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            },
            {
                test: /\.(jpg|jpeg|gif|bmp|png|webp)?$/i,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)?$/i,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin("Copyright by zx"),

        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          }
        }),
        
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
        }),

        new ExtractTextPlugin('[name].[chunkhash:8].css'), 
        
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: '[name].[chunkhash:8].js'
        }),

        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ]
}
