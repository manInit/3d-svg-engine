const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const webpackConfig = {
  entry: './src/ts/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false
    }),
    new MiniCssExtractPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
		static: './dist',
		open: true,
		hot: true
	}
}

module.exports = webpackConfig