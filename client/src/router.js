import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/teach',
            name: 'teaching',
            component: () => import('@/views/Teaching.vue')
        },
        {
            path: '/vdetail',
            name: 'videoDetail',
            component: () => import('@/views/VideoDetail.vue')
        },
        {
            path: '/vplay',
            name: 'videoPlay',
            component: () => import('@/views/VideoPlay.vue')
        },
        {
            path: '/person',
            name: 'Person',
            component: () => import('@/views/Person.vue')
        }
    ]
})