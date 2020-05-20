// state

import cookies from 'vue-cookies'

const users = cookies.get('users')
export default {
    // 本地存在 去本地 否则{}
    users: users? users: {},
    spinShow: false
}