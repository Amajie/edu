import ajax from './ajax'

// 登陆
export const login = data => ajax({url: '/login', data, method: 'post'})
// 注册
export const register = data => ajax({url: '/register', data, method: 'post'})
// 获取 用户数据
export const getUser = params => ajax({url: '/get_user', params})
// 更新用户信息
export const updateUser = data => ajax({url: '/update_user', data, method: 'post', auth: true})
// 更新用户名
export const updateName = data => ajax({url: '/update_name', data, method: 'post', auth: true})
// 创建视频集
export const setList = data => ajax({url: '/set_list', data, method: 'post', auth: true})
// 更新 视频集
export const upList = data => ajax({url: '/up_list', data, method: 'post', auth: true})
// 提交视频数据
export const insertVideo = data => ajax({url: '/insert_video', data, method: 'post', auth: true})
// 获取 首页数据
export const getHome = params => ajax({url: '/get_home', params})
// 获取 视频详情数据
export const getVdetail = params => ajax({url: '/get_vdetail', params})
// 获取视频数据
export const getCourse = params => ajax({url: '/get_course', params})
// 搜索视频数据
export const searchVideo = params => ajax({url: '/search_video', params})
// 发表评论
export const insertVideoCommit = data => ajax({url: '/insert_video_commit', data, method: 'post', auth: true})
// 上传问答图片
export const upBlogPic = data => ajax({url: '/up_blog_pic', data, method: 'post', auth: true})
// 写博客
export const write = data => ajax({url: '/write', data, method: 'post', auth: true})
// 更新博客数据
export const upWrite = data => ajax({url: '/up_write', data, method: 'post', auth: true})
// 发表评论
export const commit = data => ajax({url: '/commit', data, method: 'post', auth: true})
// 获取文章数据
export const getWrite = params => ajax({url: '/get_write', params})
// 获取 个人 文章 数据
export const getMyWrite = params => ajax({url: '/get_my_write', params, auth: true})
// 获取 个人 收藏视频
export const getCollectVideo = params => ajax({url: '/get_collect_video', params, auth: true})
// 获取 个人 收藏文章
export const getCollectWrite = params => ajax({url: '/get_collect_write', params, auth: true})
// 取消收藏 个人 收藏文章
export const reCollectWrite = data => ajax({url: '/re_collect_write', data, method: 'post', auth: true})
// 取消收藏 个人 收藏视频
export const reCollectVideo = data => ajax({url: '/re_collect_video', data, method: 'post', auth: true})
// 删除 个人 收藏文章
export const deCollectWrite = data => ajax({url: '/de_collect_write', data, method: 'post', auth: true})
// 搜索文章
export const searchWrite = params => ajax({url: '/search_write', params})


