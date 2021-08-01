// 引用 express 框架
const express = require('express');
// 处理路径
const path = require('path');
// 导入express-session模块
const session = require('express-session');
// 导入 art-template 模板引擎
const template = require('art-template');
// 导入 dataformat 第三方模块
const dateFormat = require('dateformat');
// 导入 morgan 第三方模块
const morgan = require('morgan');
// 导入 config 模块
const config = require('config');

// 创建网站服务器
const app = express();

// 数据库连接
require('./model/connect');
// 处理 post 请求参数
app.use(express.urlencoded({ extended: false }));

// 配置 session
app.use(session({ secret: 'secret key', cookie: { maxAge: null }, resave: true, saveUninitialized: true }));

// 告诉 express 框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉 express 框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为 art 的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入 dateFormat 变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

console.log(config.get('title'));

// // 获取系统环境变量 返回值是对象
// if (process.env.NODE_ENV == 'development') {
//     // 当前是开发环境
//     console.log('当前是开发环境');
//     // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
//     app.use(morgan('dev'))
// } else {
//     console.log('当前是生产环境');
// }

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});

// 监听端口
app.listen(8080);
console.log('网站服务器启动成功，8080端口监听中...');