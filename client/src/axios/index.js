import ajax from './ajax'

// 登陆
export const login = data => ajax({url: '/login', data, method: 'post'})
// 注册
export const register = data => ajax({url: '/register', data, method: 'post'})
// 更新用户信息
export const updateUser = data => ajax({url: '/update_user', data, method: 'post'})