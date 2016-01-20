var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  argv = require('yargs').argv;

module.exports = {
  cache: true,
  debug: true,
  devTool: 'inline-source-map',
  //devtool: 'sourcemap',
  entry: ["lodash","angular","angular-animate","angular-sanitize","angular-ui-router","ionic","ionicAngular","ionicFilterBar","js-data","js-data-angular","localforage-cordovasqlitedriver","/home/charl/Workspace/JsProjects/TouriscopieApp/src/app.js"],
  output: {
    path: path.join(__dirname, "www"),
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loaders: ['eslint-loader', 'ng-annotate']
      }
    ],
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: [/src\/lib/, /node_modules/],
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/font-woff&prefix=fonts'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/octet-stream&prefix=fonts'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/vnd.ms-fontobject&prefix=fonts'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=image/svg+xml&prefix=fonts'
      }
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      ionic: [path.join(__dirname, 'node_modules/ionic-sdk/release/js/ionic.js')],
      ionicAngular: [path.join(__dirname, 'node_modules/ionic-sdk/release/js/ionic-angular.js')],
      ionicMaterial: [path.join(__dirname, 'src/lib/ionic-material/ionic.material.js')],
      ionicFilterBar: [path.join(__dirname, 'src/lib/ionic-filter-bar/dist/ionic.filter.bar.js')],
      formlyIonic: [path.join(__dirname, 'node_modules', 'angular-formly-templates-ionic', 'dist', 'angular-formly-templates-ionic.js')],
      restangular: [path.join(__dirname, 'node_modules', 'restangular', 'dist', 'restangular.js')]
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(argv.env || 'development')
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
