const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { allowTsInNodeModules: true }
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle-ts.js',
        path: path.resolve(__dirname, 'dist'),
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
        }),],
};
