<template>
    <div class="album">
        <div v-for="item in album" v-bind:key="item.id">
            <img class="image tt" v-bind:src="item.url" alt="">
        </div>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/npm/corvus/corvus.js'
    
    export default {
        name: 'Album',
        data: function () {
            return {
                album: [],
            }
        },
        
        mounted: function () {
            console.log('album mounted')
            this.queryAlbum()
        },
        
        methods: {            
            /**
             *  获取相册图片列表
             *  @function
             *  @param {string} paramUpdateInfo - { "name": xx, "avatar": xx, "password": xx }
             *  @returns {string}
             */
            queryAlbum: function () {
                let This = this
                console.log('topics queryTopics')
                imCorvus({
                    url: 'album/queryAlbum', 
                    data: JSON.stringify({ 
                        index: 0,
                        number: 6
                    })
                })
                .then(function (funResult) {
                    console.log(funResult)
                    let funResultData = JSON.parse(funResult)
                    This.album = funResultData.data
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

    .image {
        width: 200px;
        height: 200px;
    }
</style>