import * as path from 'path';
import * as webpack from 'webpack';

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'pointerify.js',
        path: path.resolve(__dirname, '../', 'bundle'),
        library: 'pointerify',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ],
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