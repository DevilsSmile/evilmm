<template>
    <div class="edit-topic col tt">
        <!-- <div class="edit-tool">
            <button v-on:click="format('bold')">加粗</button>
        </div> -->
        <div class="edit-range col">
            <div class="edit-range-title row align-c">
                <input type="text" placeholder="标题" v-model="title">
            </div>
            <div class="edit-range-content" contenteditable="true" v-on:input="handleInputContent"></div>
        </div>
        <div class="edit-save">
            <button v-on:click="articleDraft()">保存草稿</button>
            <button v-on:click="articleRelease()">发布</button>
        </div>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/common/js/corvus/corvus.js'

    import Aside from '@/components/aside'
    
    export default {
        name: 'EditTopic',
        components: {
            Aside: Aside
        },
        data: function () {
            return {
                msg: 'Welcome to Your Vue.js App',
                title: '',
                content: ''
            }
        },
        methods: {
            format: function (name, args = null) {
                document.execCommand(name, false, args)
            },
             
            handleInputContent: function(funEvent) {
                this.content = funEvent.target.innerHTML
            },
            
            articleDraft: function () {
                console.log('saveDraft')
            },
            
            /**
             *  格式化日志文本，并提交日志信息至服务器。
             *  @function
             *  @param {string} paramUpdateInfo - { "name": xx, "avatar": xx, "password": xx }
             *  @returns {string}
             */
            articleRelease: function () {
                let funRegExp = new RegExp('.*?(?=<div>)')
                let funResult = this.content.match(funRegExp)

                if(this.content.match(funRegExp) !== null) {
                    funResult = this.content.match(funRegExp)[0]
                    switch (funResult) {
                        // 处理 <br><div>xxxxx</div><div>xxxxx</div> 格式字符
                        case '<br>':
                            funRegExp = new RegExp('(?=<div>).*', 'g')
                            funResult = this.content.match(funRegExp)[0]
                            break
                            
                        // 处理 <div>xxxxx</div><div>xxxxx</div> 格式字符
                        case '':
                            funRegExp = new RegExp('(?=<div>).*', 'g')
                            funResult = this.content.match(funRegExp)[0]
                            break
                            
                        // 处理 xxxxx<div>xxxxx</div> 格式字符
                        default:
                            funRegExp = new RegExp('(?=<div>).*', 'g')
                            funResult = '<div>' + funResult + '</div>' + this.content.match(funRegExp)[0]
                            break
                    }
                } else {
                    // 处理 xxxxx 格式字符
                    funRegExp = new RegExp('.*', 'g')
                    funResult = this.content.match(funRegExp)[0]
                    funResult = '<div>' + funResult + '</div>'
                }

                funRegExp = new RegExp('<div><br></div>', 'g')
                funResult = funResult.replace(funRegExp, '')
                funRegExp = new RegExp('<div>', 'g')
                funResult = funResult.replace(funRegExp, '<p>')
                funRegExp = new RegExp('</div>', 'g')
                funResult = funResult.replace(funRegExp, '</p>')
                
                imCorvus({
                    url: 'topic/insertTopicInfo',
                    data: JSON.stringify({
                        time: imMiment().format('YYYY-MM-DD hh:mm:ss'),
                        title: this.title,
                        abstract: '',
                        content: funResult,
                    })
                })
                .then(function (funResult) {
                    console.log('funResult', funResult)
                })
                .catch(function (funError) {
                    console.log('funError', funError)
                })
            },
        },
    }
</script>
    
<style>
    .edit-topic {
        width: 100%;
    }

    .edit-range {
        width: 50%;
    }

    .edit-range-title {
        white-space: nowrap;
    }

    .edit-range-title input {
        width: 100%;
        height: 30px;
        margin: 10px 0;
        padding: 0 10px;
        border: 1px #bbbbbb solid;
        border-radius: 5px;
    }
    
    .edit-range-content {
        min-height: 600px;
        border: 1px #808080 solid;
        text-align: left;
    }
</style>