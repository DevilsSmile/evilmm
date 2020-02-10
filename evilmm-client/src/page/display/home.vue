<template>
    <div class="topics">
        <span>主页</span>
        
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/npm/corvus/corvus.js'
    
    export default {
        name: 'EditArticle',
        data: function () {
            return {
                msg: 'Welcome to Your Vue.js App',
                title: '',
                content: '',
                topics: []
            }
        },
        
        mounted: function () {

        },
        
        methods: {
            handleInputContent: function(funEvent) {
                this.content = funEvent.target.innerHTML
            },
            
            /**
             *  获取日志列表。
             *  @function
             *  @param {string} paramUpdateInfo - { "name": xx, "avatar": xx, "password": xx }
             *  @returns {string}
             */
            queryTopics: function () {
                let This = this
                console.log('topics queryTopics')
                imCorvus.init({
                    baseURL: 'http://127.0.0.1:8888/'
                })
                imCorvus.request({
                    url: 'topics/queryTopics',
                    data: {
                        page: 0
                    }
                })
                .then(function (funResult) {
                    let funResponse = JSON.parse(funResult)
                    This.topics = funResponse.data
                })
                .catch(function (funError) {
                    console.log('funError', funError)
                })
            },
            
            queryTopicContent: function (event) {
                // 防止添加重复路由而产生的错误
                if (this.$route.path !== '/topics/content/' + event) {
                    this.$router.push('/topics/content/' + event)
                }
                console.log(event, this.$route.path)
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