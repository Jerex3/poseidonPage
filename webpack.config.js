const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {   
        port: 9000,
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        historyApiFallback: true
    },
    resolve:{
        extensions: ['.js','.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
              },
              {
                test: /\.(svg)$/,
                use: [{
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ]
              },
              {
                test: /\.(png)$/i,
                use: [{
                    loader: 'file-loader',
                  },
                ]
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            favicon: "./src/favicon.ico"
        }),
    ]
}