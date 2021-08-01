const { Article } = require('../../model/article');

module.exports = async(req, res) => {

    // 标识，标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'article';

    // 获取到地址栏中的 id 参数
    const { message, id } = req.query;

    // 如果传递了 id 参数
    if (id) {
        let article = await Article.findOne({ _id: id });
        var date = new Date();
        // res.send(article);
        res.render('admin/article-edit.art', {
            article,
            link: `/admin/article-modify?id=${id}`,
            button: '修改',
            date
        });
    } else {
        res.render('admin/article-edit.art', {
            link: '/admin/article-add',
            button: '上传'
        });
    }

}