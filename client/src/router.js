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
    ]
})