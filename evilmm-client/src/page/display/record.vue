<template>
    <div class="records">
        <div class="records-list row">
            <div v-for="item in record" v-bind:key="item.id" v-on:click="queryRecordInfo(item.id)">
                <div class="records-title">
                    <h2 class="fs-l fc-default">{{item.title}}</h2>
                </div>
                <div class="records-info">
                    <span class="fs-s fc-default">{{item.time}}</span>
                </div>
                <div class="records-content">
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
        name: 'RecordList',
        data: function () {
            return {
                record: []
            }
        },
        
        mounted: function () {
            this.queryRecord()
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
            queryRecord: function () {
                let This = this
                imCorvus({
                    url: 'record/queryRecord',
                    data: JSON.stringify({
                        page: 0
                    })
                })
                .then(function (funResult) {
                    let funResultData = JSON.parse(funResult)
                    This.record = funResultData.data
                })
                .catch(function (funError) {
                    console.log('funError', funError)
                })
            },
            
            queryRecordInfo: function (event) {
                let funRoutePath = '/record/info/'
                if (this.$route.path !== funRoutePath + event) {
                    this.$router.push(funRoutePath + event)
                }
            },
        },
    }
</script>
    
<style>
    .records {
        min-height: 720px;
        padding-bottom: 128px;
        background: #ffffff;
    }

    .records-list {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0 64px;
    }

    .records-list > div {
        width: 560px;
        height: 192px;
        margin-bottom: 32px;
        padding: 32px;
        background: #d6e5e3;
    }

    .records-title {
        margin-bottom: 4px;
    }

    .records-info {
        margin-bottom: 12px;
    }
    
    .records-content p {
        line-height: 18px;
    }
</style>