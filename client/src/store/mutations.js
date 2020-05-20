// mutations
export default {
    // 传入这个对象即可
    setUsers(state, users){
        state.users = users
    },
    // 设置是否现实loding
    setLoading(state, spinShow){
        state.spinShow = spinShow
    }

}