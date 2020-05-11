import ajax from './ajax'

// 登陆
export const login = data => ajax({url: '/login', data, method: 'post'})
// 注册
export const register = data => ajax({url: '/register', data, method: 'post'})
// 更新用户信息
export const updateUser = data => ajax({url: '/update_user', data, method: 'post'})
// 创建视频集
export const setTitle = data => ajax({url: '/set_title', data, method: 'post'})
// 更新 视频集
export const upTitle = data => ajax({url: '/up_title', data, method: 'post'})
// 提交视频数据
export const insertVideo = data => ajax({url: '/insert_video', data, method: 'post'})
// 获取 首页数据
export const getHome = params => ajax({url: '/get_home', params})
// 获取 视频详情数据
export const getVdetail = params => ajax({url: '/get_vdetail', params})
// 获取视频数据
export const getCourse = params => ajax({url: '/get_course', params})
// 发表评论
export const insertVideoCommit = data => ajax({url: '/insert_video_commit', data, method: 'post'})


