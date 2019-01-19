import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/configuration',
            name: 'configuration',
            component: () => import('./views/Configuration')
        },
        {
            path: '/updater',
            name: 'updater',
            component: () => import('./views/Updater')
        },
        {
            path: '/servers/:uuid/update',
            name: 'server_edit',
            component: () => import('./views/server/Update')
        },
        {
            path: '/servers/create',
            name: 'server_create',
            component: () => import('./views/server/Create')
        }
    ]
})
