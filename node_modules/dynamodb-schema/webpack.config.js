const path = require('path');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

const config = {
    mode:'none',
    entry: './index.ts',
    devtool: 'source-map',
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx'
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: [
        new TypedocWebpackPlugin({
            out: '../docs',
            module: 'commonjs',
            target: 'es2015',
            exclude: [
                '**/node_modules/**/*.*',
                '**/dist/**/*.*',
                '**/test/**/*.*',
            ],
            experimentalDecorators: true,
            excludeExternals: true
        }, './src')
    ]
};


module.exports = config;