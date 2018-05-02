// tslint:disable:no-var-requires
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'pointerify.js',
        path: path.resolve(__dirname, '../', 'bundle'),
        library: 'pointerify',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    }
};