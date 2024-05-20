const { Configuration } = require("webpack")
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
/**
 * @type Configuration
 */
const config = {
    entry: {
        app1: {
            import: "./src/app1/app1.js",
            filename: '[name]/[name].bundle.js'
        },
        app2: {
            import: "./src/app2/app2.js",
            filename: '[name]/[name].bundle.js'
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, `dist`),
        clean: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './app1.html',
            filename: 'app1/app1.html',
            chunks: ['app1']
        }),
        new HtmlWebpackPlugin({
            template: './app2.html',
            filename: 'app2/app2.html',
            chunks: ['app2']
        }),
    ]
}

module.exports = config