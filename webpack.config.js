const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isDev = false

const webpackConfig = {
  entry: './src/ts/index.js',
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: '3dengine.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/textures', to: './textures' }
      ]
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  output: {
    filename: '3dengine.dist.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
		open: true,
	}
}

module.exports = webpackConfig