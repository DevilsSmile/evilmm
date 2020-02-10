<template>
    <div class="edit-album row">
        <input accept="image/png,image/jpeg,image/gif,image/jpg,txt" name="img" id="upload_file" type="file" v-on:change="eventUploadImageBase64">
        <button v-on:click="eventUploadImageFormData">上传图片</button>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/npm/corvus/corvus.js'

    import Aside from '@/components/aside'

    export default {
        name: 'EditAlbum',
        components: {
            Aside: Aside
        },
        data: function () {
            return {

            }
        },
        mounted: function () {

        },
        methods: {
            /**
             *  base64 方式上传图片
             *  @function
             *  @param {object} event
             *  @returns
             */
            eventUploadImageBase64: function (event) {
                var funFile = event.target.files[0]
                var funFileReader = new FileReader()
                funFileReader.readAsDataURL(funFile)
                funFileReader.onload = function () {
                    
                    imCorvus({
                        url: 'album/insertAlbumImage',
                        data: this.result
                    })
                    .then(function (funResult) {
                        console.log('funResult', funResult)
                    })
                    .catch(function (funError) {
                        console.log('funError', funError)
                    })
                }
            },

            /**
             *  formdata 方式上传图片
             *  @function
             *  @param {object} event
             *  @returns
             */
            eventUploadImageFormData: function (event) {
                // formdata 传输方式
                let funFormData = new FormData()
                funFormData.append('img', event.target.files[0])
                imCorvus({
                    url: 'album/insertAlbumImage',
                    type: 'file',
                    data: funFormData, 
                })
                .then(function (funResult) {
                    console.log('funResult', funResult)
                })
                .catch(function (funError) {
                    console.log('funError', funError)
                })
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
                
                imCorvus.init({
                    baseURL: 'http://127.0.0.1:8888/'
                })
                imCorvus.request({
                    url: 'journal/insertJournalInfo',
                    data: {
                        time: imMiment().format('YYYY-MM-DD hh:mm:ss'),
                        title: this.title,
                        content: funResult,
                    }
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