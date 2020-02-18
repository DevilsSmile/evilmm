<template>
    <div class="topic" ref="top">
        <div class="topic-info">
            <div>
                <div class="topic-info-title">
                    <h2 class="fs-xl fc-default">{{topicInfo.title}}</h2>
                </div>
                <div class="topic-info-other row align-c">
                    <span class="fs-s fc-default fs-date">发布时间：{{topicInfo.time}}</span>
                    <!-- <span class="fs-s fc-default fs-date">喜欢：{{topicInfo.agree}}</span>
                    <span class="fs-s fc-default fs-date">浏览：{{topicInfo.browse}}</span> -->
                </div>
                <div class="topic-content" v-html='topicInfo.content'></div>
            </div>
        </div>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/common/js/corvus/corvus.js'
    
    export default {
        name: 'TopicInfo',
        data: function () {
            return {
                topicInfo: {}
            }
        },

        mounted: function () {
            this.$store.commit('menuSetIndex', 2)                   // 设置菜单
            this.$refs.top.scrollTop = 0                            // 设置滚动条顶部

            let This = this
            let funRegExp = new RegExp('(?<=\/topic\/info\/)[A-Za-z0-9]+')
            let funResult = this.$route.path.toString().match(funRegExp)
            
            imCorvus({
                url: 'topic/queryTopicInfo', 
                data: JSON.stringify({
                    id: funResult[0]
                })
            })
            .then(function (funResult) {
                This.topicInfo = JSON.parse(funResult).data[0]
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
    .topic-info {
        padding: 0 212px;
        background: #ffffff;
    }

    .topic-info > div {
        width: 856px;
        min-height: 720px;
    }

    .topic-info-other {
        margin-top: 8px;
        margin-bottom: 32px;
        padding-bottom: 8px;
        border-bottom: 2px #f0f0f0 solid;
    }

    .topic-info-other span {
        margin-right: 16px
    }

    .topic-list > div {
        width: 856px;
        height: 192px;
        padding: 32px;
        background: #d6e5e3;
    }

    .topic-title {
        margin-bottom: 4px;
    }

    .topic-info {
        padding-bottom: 60px;
    }
    
    .topic-content p {
        color: #40403d;
        margin-bottom: 24px;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 4px;
    }
</style>