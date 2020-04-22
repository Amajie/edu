import ajax from './ajax'

// 登陆
export const login = data => ajax({url: '/login', data, method: 'post'})
// 注册
export const register = data => ajax({url: '/register', data, method: 'post'})
// 更新用户信息
export const updateUser = data => ajax({url: '/update_user', data, method: 'post'})
// 创建视频集
export const setTitle = data => ajax({url: '/set_title', data, method: 'post'})
// 获取视频集
export const getTitle = data => ajax({url: '/get_title', data, method: 'post'})
