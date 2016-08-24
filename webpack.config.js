'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack')

module.exports = {
  context: __dirname + '/dev',

  // here should be all /dev/*.js files
  entry: {
    // home: './home',
    // about: './about'
  },

  // output file(s)
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
    //library: 'app'
  },

  // apply watcher only for development
  watch: NODE_ENV === 'development',

  // make watcher a bit faster
  watchOptions: {
    aggregateTimeout: 100
  },

  // allow to use source-maps only in development version for debbuging
    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

    // define plugins
    plugins: [

      // plugin don't allow to end build if there are some mistakes
      new webpack.NoErrorsPlugin(),

      // plugin define NODE_ENV variable (from EnvironmentPlugin)
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV)
      }),

      // plugin create file common.js with code that is the same in all entry files
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2
      })

    ],

    // define modules
    module: {
      loaders: [

        // babel-loader to transpile ES6 into ES5
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015']
          }
        }
      ]
    }

};

// compress files in production version
  if (NODE_ENV === 'production') {
    module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // don't show unreacheable variables etc
          warnings:      false,
          drop_console:  true,
          unsafe:        true
        }
      })
    );
  }
