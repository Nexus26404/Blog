// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
// 导入 mongoose-sex-page 模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 接收客户端传递过来的页码
    const page = req.query.page;

    // 标识，标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'article';
    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库发送查询请求
    // 查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(10).display(5).populate('author').exec();
    let str = JSON.stringify(articles);
    let json = JSON.parse(str);

    // res.send(json);
    // 渲染文章列表页面模板
    res.render('admin/article.art', { articles: json });
}