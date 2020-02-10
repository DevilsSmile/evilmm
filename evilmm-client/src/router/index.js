import Vue from 'vue'
import Router from 'vue-router'


// import HelloWorld from '@/components/HelloWorld'

// 前端页面
import Home from '@/page/display/home'
import Topics from '@/page/display/topics'
import Content from '@/page/display/content'

// 后台页面
import Backstage from '@/page/backstage/backstage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        }, {
            path: '/topics',
            name: 'topics',
            component: Topics
        }, {
            path: '/topics/content/*',
            name: 'content',
            component: Content
        }, {
            path: '/backstage',
            name: 'backstage',
            component: Backstage,
        }, 
    ]
})
