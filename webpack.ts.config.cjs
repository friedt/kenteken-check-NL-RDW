
// eslint-disable-next-line @typescript-eslint/no-require-imports
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const CopyPlugin = require("copy-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

// eslint-disable-next-line no-undef
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
        // eslint-disable-next-line no-undef
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
