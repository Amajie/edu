import axios from 'axios'
import $router from '@/router'
import $store from '@/store/store'

import cookies from 'vue-cookies'

import {Modal} from 'view-design'


const instance = axios.create({
    baseURL: '/api'
})

// 取消请求
const CancelToken = axios.CancelToken

// 请求拦截器
instance.interceptors.request.use(
    config =>{

        if(config.auth && !cookies.get('users')){
            Modal.confirm({
                title: '没有权限',
                content: '亲，请先登陆，才能继续操作',
                cancelText: '取消',
                okText: '确认',
                onOk: () =>{
                    $router.replace('/login')
                }
            })
            config.cancelToken = new CancelToken(function executor(c){
                // 取消请求
                c()
            })
        }else{
            // 现实loding
            $store.commit('setLoading', true)
        }

        return config
    },
    err =>{
        // 关闭loding
        $store.commit('setLoading', false)
        return Promise.reject(err)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response =>{
        // 关闭loding
        $store.commit('setLoading', false)
        
        return response

    },
    err =>{
        // 关闭loding
        $store.commit('setLoading', false)
        return Promise.reject(err)
    }
)


export default instance