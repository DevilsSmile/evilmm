<template>
    <div class="record">
        <div class="record-info">
            <div>
                <div class="record-info-title">
                    <h2 class="fs-xl fc-default">{{recordInfo.title}}</h2>
                </div>
                <div class="record-info-other">
                    <span class="fs-s fc-default fs-date">{{recordInfo.time}}</span>
                    <span class="fs-s fc-default">{{recordInfo.agree}}</span>
                    <span class="fs-s fc-default">{{recordInfo.browse}}</span>
                </div>
                <div class="record-content" v-html='recordInfo.content'></div>
            </div>
        </div>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/common/js/corvus/corvus.js'
    
    export default {
        name: 'RecordInfo',
        data: function () {
            return {
                recordInfo: {}
            }
        },

        mounted: function () {
            let This = this
            let funRegExp = new RegExp('(?<=\/record\/info\/)[A-Za-z0-9]+')
            let funResult = this.$route.path.toString().match(funRegExp)
            console.log('id', funResult[0])
            
            imCorvus({
                url: 'record/queryRecordInfo', 
                data: JSON.stringify({
                    id: funResult[0]
                })
            })
            .then(function (funResult) {
                This.recordInfo = JSON.parse(funResult).data[0]
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
            queryRecordContent: function () {

            },
        },
    }
</script>
    
<style>
    .record-info {
        padding: 0 212px;
        background: #ffffff;
    }

    .record-info > div {
        width: 856px;
        min-height: 720px;
    }

    .record-info-other {
        margin-top: 8px;
        margin-bottom: 32px;
        padding-bottom: 8px;
        border-bottom: 2px #f0f0f0 solid;
    }

    .record-list > div {
        width: 856px;
        height: 192px;
        padding: 32px;
        background: #d6e5e3;
    }

    .record-title {
        margin-bottom: 4px;
    }

    .record-info {
        margin-bottom: 12px;
    }
    
    .record-content p {
        line-height: 18px;
    }
</style>