const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // 获取要删除的用户 id
    const id = req.query.id;
    // 根据 id 删除用户
    await User.findOneAndDelete({ _id: id });
    // 重定向到用户列表页面
    res.redirect('/admin/user');
}