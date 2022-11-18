const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

// 入口文件配置
const entry = {
    sfuxInject: './src/index.ts'
};

module.exports = {
    // mode: 'production',
    mode: 'development',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    entry: {
        //需要打包文件
        ...entry
    },
    optimization: {
        moduleIds: 'named' //名称优化
    },
    resolve: {
        //导入别名
        alias: {},
        //这些扩展名设置模块如何被解析
        extensions: ['.js', '.ts', '.tsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'inject-ts',
            inject: true,
            // chunks: chunks,//页面要引入的包
            filename: 'index.html', // 文件名
            template: './src/template.html' // 模板地址
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        {
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    ]
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // replace ExtractTextPlugin.extract({..})
                    'css-loader'
                ]
            },
        ]
    },
    output: {
        filename: '[name].min.js',
        chunkFilename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    }
};
