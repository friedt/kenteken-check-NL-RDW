const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'RDW kentekencheck',
            template:  'src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/example.css", to: "example.css" },
                { from: "src/Kenteken.ttf", to: "Kenteken.ttf" }
            ]
        }),]
};
