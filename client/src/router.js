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
            path: '/vdetail/:listId',
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
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/play/:listId/:videoIndex',
            name: 'play',
            component: () => import('@/views/Play.vue')
        },
        {
            path: '/blog/:userId/:articleId',
            name: 'blog',
            component: () => import('@/views/Blog.vue')
        }
    ]
})