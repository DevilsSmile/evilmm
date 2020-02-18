<template>
    <div class="album">
        <div class="album-row row con-b align-c" v-for="(row, index) in album" v-bind:key="index">
            <div class="album-item" v-for="item in row" v-bind:key="item.id">
                <img class="image" v-bind:src="item.url + sizeSmall" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/common/js/corvus/corvus.js'
    
    export default {
        name: 'Album',
        data: function () {
            return {
                album: [],
                sizeSmall: '?imageView2/3/w/280/h/290',
                sizeLarge: '?imageView2/2/w/2220/h/2300',
            }
        },

        mounted: function () {
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
                imCorvus({
                    url: 'album/queryAlbum', 
                    data: JSON.stringify({ 
                        index: 0,
                        number: 12
                    })
                })
                .then(function (funResult) {
                    let funResultData = JSON.parse(funResult)

                    if (funResultData.data === 0) {
                        This.album = []
                    } else {
                        let funImageRow = []
                        for (let i = 0, len = funResultData.data.length; i < len; i++) {
                            funImageRow.push(funResultData.data[i])
                            if (funImageRow.length === 4) {
                                This.album.push(funImageRow)
                                funImageRow = []
                            }
                        }

                        if (funImageRow.length > 0) {
                            This.album.push(funImageRow)
                        }
                    }
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
            },
        },
    }
</script>
    
<style>
    .album {
        min-height: 720px;
        padding-bottom: 60px;
        background: #ffffff;
    }

    .album-row {
        padding: 0 64px;
        margin-bottom: 6px;
    }
</style>