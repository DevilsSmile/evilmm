import Vue from 'vue'
import Router from 'vue-router'


// import HelloWorld from '@/components/HelloWorld'

// 前端
import Home from '@/page/display/home'
import Album from '@/page/display/album'
import Topic from '@/page/display/topic'
import TopicInfo from '@/page/display/topic-info'
import Record from '@/page/display/record'
import RecordInfo from '@/page/display/record-info'
import About from '@/page/display/About'

// 后台
import Backstage from '@/page/backstage/backstage'

// 404
import Unknown from '@/page/display/404'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        }, {
            path: '/about',
            name: 'About',
            component: About
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
            path: '/record',
            name: 'Record',
            component: Record
        }, {
            path: '/record/info/*',
            name: 'RecordInfo',
            component: RecordInfo
        }, {
            path: '/backstage',
            name: 'Backstage',
            component: Backstage,
        }, {
            path: '*',
            name: 'Unknown',
            component: Unknown,
        }, 
    ],
    mode: 'history'
})
