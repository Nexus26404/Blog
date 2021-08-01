// 引入文章集合规则
const { Article } = require('../../model/article');
// 引入 formidable 第三方模块
const formidable = require('formidable');
const path = require('path');

module.exports = async(req, res) => {
    const id = req.query.id;
    // 1. 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2. 配置上传文件的存放地址
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3. 保留上传文件的后缀
    form.keepExtensions = true;
    // 4. 解析表单
    form.parse(req, async(err, fields, files) => {
        await Article.updateOne({ _id: id }, {
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        // 将页面重定向到文章列表页面
        res.redirect('/admin/article');
    });
}