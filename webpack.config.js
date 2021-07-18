const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.jsx',
  },
  devtool: 'inline-source-map',
 devServer: {
   contentBase: './public',
 },
 module: {
     rules: [
       {
         test: /\.m?(js|jsx)$/,
         exclude: /(node_modules|bower_components)/,
         use: {
             loader: 'babel-loader',
             options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [ 
                  "@babel/plugin-proposal-class-properties" 
                ] 
             }
         }
        },
        {
          test: /\.scss$/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'},
            {loader: 'sass-loader'}
          ]
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
        },
        {
          test: /\.css$/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'}
          ]
       }
    ],
 },
 resolve: {
   extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
 },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  }, 
};