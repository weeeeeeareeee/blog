const { Configuration } = require("webpack")
const path = require('path')
// const { VueLoaderPlugin } = require('vue-loader');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');
/**
 * @type Configuration
 */
const config = {
    module: {
        rules: [
            {
                test: /\.dataurl$/,
                use: path.resolve(__dirname, './loader/dataurlLoader.js')
            }
        ]
    },
}

module.exports = config