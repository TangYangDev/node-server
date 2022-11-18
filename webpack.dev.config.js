const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    // mode: 'production',
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, './dist')
        //publicPath: '/'
    },
    resolve: {
        //导入别名
        alias: {},
        //这些扩展名设置模块如何被解析
        extensions: ['.js', '.ts', '.tsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/template.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    }
};
