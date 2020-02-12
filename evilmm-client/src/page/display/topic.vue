<template>
    <div class="topics">
        <span>话题列表</span>
        <div v-for="item in topics" v-bind:key="item.id">
            <p v-on:click="queryTopicInfo(item.id)">{{item.title}}</p>
        </div>
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
            console.log('topics mounted')
            this.queryTopics()
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
                imCorvus({
                    url: 'topic/queryTopics',
                    data: JSON.stringify({
                        page: 0
                    })
                })
                .then(function (funResult) {
                    let funResultData = JSON.parse(funResult)
                    This.topics = funResultData.data
                })
                .catch(function (funError) {
                    console.log('funError', funError)
                })
            },
            
            queryTopicInfo: function (event) {
                let funRoutePath = '/topic/info/'
                if (this.$route.path !== funRoutePath + event) {
                    this.$router.push(funRoutePath + event)
                }
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