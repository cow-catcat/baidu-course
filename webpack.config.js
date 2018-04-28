const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlExtract = require('html-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: './css/app.css'
});
const htmlExtract = new HtmlExtract({
    filename: './index.html',
    template: './src/index.html'
});

const _config = {
    entry: './src/index.js',
    output: {
        path: __dirname +'/dist',
        filename: './js/app.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: ['css-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        extractLess,
        htmlExtract
    ]
}
module.exports = _config;