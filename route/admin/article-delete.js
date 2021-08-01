const { Article } = require('../../model/article')

module.exports = async(req, res) => {
    // 获取要删除的文章 id
    const id = req.query.id;
    // 根据 id 删除对应文章
    await Article.findOneAndDelete({ _id: id });
    // 重定向到用户列表页面
    res.redirect('/admin/article');
}