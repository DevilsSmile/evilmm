<template>
    <div class="topic">
        <div class="topic-title">
            <h2>{{topicInfo.title}}</h2>
        </div>
        <div class="topic-other">
            <span>{{topicInfo.time}}</span>
            <span>{{topicInfo.agree}}</span>
            <span>{{topicInfo.browse}}</span>
        </div>
        <div v-html='topicInfo.content'></div>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/npm/corvus/corvus.js'
    
    export default {
        name: 'TopicContent',
        data: function () {
            return {
                topicInfo: {}
            }
        },
        mounted: function () {
            let This = this
            let funRegExp = new RegExp('(?<=\/topics\/content\/)[A-Za-z0-9]+')
            let funResult = this.$route.path.toString().match(funRegExp)
            
            imCorvus.init({
                baseURL: 'http://127.0.0.1:8888/'
            })
            imCorvus.request({
                url: 'topics/queryTopicInfo',
                data: {
                    id: funResult[0]
                }
            })
            .then(function (funResult) {
                This.topicInfo = JSON.parse(funResult).data[0]
                console.log('funResult', funResult)
            })
            .catch(function (funError) {
                console.log('funError', funError)
            })
        },
        
        methods: {
            /**
             *  格式化日志文本，并提交日志信息至服务器。
             *  @function
             *  @param {string} paramUpdateInfo - { "name": xx, "avatar": xx, "password": xx }
             *  @returns {string}
             */
            queryTopicContent: function () {

            },
        },
    }
</script>
    
<style>
    li {
        display: inline-block;
        list-style-type: none;
    }
    
    .edit {
        width: 80%;
    }
    
    .edit-range-title {
        white-space:nowrap;
    }
    
    .edit-range-content {
        min-height: 600px;
        border: 1px #808080 solid;
    }
</style>