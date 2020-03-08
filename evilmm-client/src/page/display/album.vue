<template>
    <div class="album row con-c">
        <div class="album-col col" v-for="(row, index) in album" v-bind:key="index">
            <div class="album-item col" v-for="item in row" v-bind:key="item.id" v-on:click="queryAlbumImage(item.url)">
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
                album: [[], [], []],
                isLarge: false,
                activeLarge: '',
                sizeSmall: '?imageView2/2/w/384',
                sizeLarge: '?imageView2/2/w/740/h/767',
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
                        number: 16
                    })
                })
                .then(function (funResult) {
                    let funResultData = JSON.parse(funResult)
                    let funClientWidth = 1280

                    let funColumn = This.album.length
                    let funAlbumIndex = 0
                    let funAlbumFirstNumber = This.album[0].length

                    // 定位需要添加图片的最小起始列
                    for (let i = 1; i < funColumn; i++) {
                        if (This.album[i - 1].length > This.album[i].length) {
                            funAlbumIndex = i
                            break
                        }
                    }

                    // 追加图片
                    for (let i = 0, len = funResultData.data.length; i < len; i++) {
                        This.album[funAlbumIndex].push(funResultData.data[i])
                        funAlbumIndex = funAlbumIndex + 1
                        if (funAlbumIndex > funColumn - 1) {
                            funAlbumIndex = 0
                        }
                    }
                    
                    console.log('This.album', This.album)
                })
                .catch(function (funError) {
                    console.log('funError', funError)
                })
            },

            /**
             *  查看原始图片
             *  @function
             *  @param {string} funImageUrl
             *  @returns
             */
            queryAlbumImage: function (funImageUrl) {
                console.log('queryAlbumImage', funImageUrl)
                this.isLarge = true
                this.activeLarge = funImageUrl
            },

            /**
             *  将每列图片汇总到一个数组
             *  @function
             *  @param {array} funArray
             *  @returns {array}
             */
            mergeItem: function (funArray) {
                let funItems = []
                for (let i = 0, len = funArray.length; i < len; i++) {
                    funItems.concat(funArray[i])
                }

                return funItems
            },

            /**
             *  将所有图片重新分配到指定个数的数组
             *  @function
             *  @param {number} funColumn
             *  @param {array} funItems
             *  @returns {array}
             */
            assignedItem: function (funColumn, funItems) {
                let funNewArray = []
                let funIndex = 0
                let funAlbumIndex = 0

                for (let i = 0; i < funColumn; i++) {
                    funNewArray.push([])
                }

                while (funIndex < funItems.length) {
                    funNewArray[funAlbumIndex].push(funItems[funIndex])
                    funIndex++
                    funAlbumIndex++
                    if (funColumn <= funAlbumIndex) {
                        funAlbumIndex = 0
                    }
                }

                return funNewArray
            },
        },
    }
</script>
    
<style>
    .album {
        position: relative;
        min-height: 720px;
        padding-bottom: 60px;
        background: #ffffff;
    }

    .album-col {
        padding: 0 8px;
        margin-bottom: 6px;
    }

    .album-large {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #ffffff;
    }

    .album-item {
        margin: 8px 0;
    }
</style>