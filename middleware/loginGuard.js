const guard = (req, res, next) => {
    // 判断用户访问的是否是登录页面
    // 判断用户的登录状态 如果已登录，则请求放行
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 如果用户是登录状态，并且是一个普通用户
        if (req.session.role == 'normal') {
            // 让它跳转到博客首页 阻止程序向下执行
            res.redirect('/home/');
        }
        // 用户是登录状态，将请求放行
        next();
    }
}

module.exports = guard;