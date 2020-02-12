import Vue from 'vue'
import Router from 'vue-router'


// import HelloWorld from '@/components/HelloWorld'

// 前端页面
import Home from '@/page/display/home'
import Album from '@/page/display/album'
import Topic from '@/page/display/topic'
import TopicInfo from '@/page/display/topic-info'

// 后台页面
import Backstage from '@/page/backstage/backstage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        }, {
            path: '/album',
            name: ' Album',
            component: Album
        }, {
            path: '/topic',
            name: 'Topic',
            component: Topic
        }, {
            path: '/topic/info/*',
            name: 'TopicInfo',
            component: TopicInfo
        }, {
            path: '/backstage',
            name: 'Backstage',
            component: Backstage,
        }, 
    ]
})
