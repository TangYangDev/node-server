const path = require('path');
const express = require('express');
const open = require('open');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.dev.config.js');


//app.use(express.static(path.join(__dirname, 'example/static')));

// 读取指定端口
const argv = process.argv || [];
const PORT = Math.round(argv[2]) || 8089;

const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler, {
    //绑定中间件的公共路径,与webpack配置的路径相同
    publicPath:config.output.publicPath,
    // quiet: true  //向控制台显示任何内容 
});
app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler));

app.listen(PORT, '0.0.0.0', () => {
    open(`http://localhost:${PORT}`);
    console.log(`开发服务器启动中: 0.0.0.0:${PORT}`);
});
