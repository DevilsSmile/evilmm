<template>
    <div class="topics">
        <div class="topics-list row">
            <div v-for="item in topics" v-bind:key="item.id" v-on:click="queryTopicInfo(item.id)">
                <div class="topics-title">
                    <h2 class="fs-l fc-default">{{item.title}}</h2>
                </div>
                <div class="topics-info">
                    <span class="fs-s fc-default">{{item.time}}</span>
                </div>
                <div class="topics-content">
                    <p class="fs-s fc-default">{{item.abstract}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/common/js/corvus/corvus.js'
    
    export default {
        name: 'EditArticle',
        data: function () {
            return {
                topics: []
            }
        },

        mounted: function () {
            this.$store.commit('menuSetIndex', 2)
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
    .topics {
        min-height: 720px;
        padding-bottom: 128px;
        background: #ffffff;
    }

    .topics-list {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0 64px;
    }

    .topics-list > div {
        width: 560px;
        height: 192px;
        margin-bottom: 32px;
        padding: 32px;
        background: #d6e5e3;
    }

    .topics-title {
        margin-bottom: 4px;
    }

    .topics-info {
        margin-bottom: 12px;
    }
    
    .topics-content p {
        line-height: 18px;
    }
</style>