<template>
    <div class="home">
        <div class="home-index col align-c">
            <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/sign-header.png" alt="">
            <span class="fs-s fc-white">承君此诺　必守一生</span>
        </div>

        <div class="home-topic">
            <div class="home-topic-info row con-b">
                <div class="home-topic-info-content col con-c align-c">
                    <h2 class="fs-x fc-default">独行的灵魂</h2>
                    <span class="fs-m fc-default">一路走来　聚少离多　我们总是有各自要去的地方</span>
                    <span class="fs-m fc-default">我想　是在寻找内心深处的真实</span>
                    <span class="fs-m fc-default">全文</span>
                </div>
                <div class="home-topic-info-cover row con-e align-c">
                    <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/cover-1.png" alt="">
                </div>
            </div>

            <div class="home-topic-info row con-b">
                <div class="home-topic-info-cover row align-c">
                    <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/cover-2.png" alt="">
                </div>
                <div class="home-topic-info-content col con-c align-c">
                    <h2 class="fs-x fc-default">末了</h2>
                    <span class="fs-m fc-default">在空荡荡的空间里　他静静的看向别处　若有所思</span>
                    <span class="fs-m fc-default">而我　静静的看着他　若有所感</span>
                    <span class="fs-m fc-default">灵魂深处的纠结在他的领悟里淡化　释然</span>
                    <span class="fs-m fc-default">全文</span>
                </div>
            </div>

            <div class="home-topic-info row con-b">
                <div class="home-topic-info-content col con-c align-c">
                    <h2 class="fs-x fc-default">若是花开　若是花尽</h2>
                    <span class="fs-m fc-default">如今　想必已经开花了吧</span>
                    <span class="fs-m fc-default">花开的盛景　早已印于我心　何须多此一行　成全一时执念呢</span>
                    <span class="fs-m fc-default">我记得　至今不忘</span>
                    <span class="fs-m fc-default">全文</span>
                </div>
                <div class="home-topic-info-cover row align-c">
                    <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/cover-3.png" alt="">
                </div>
            </div>
        </div>

        <div class="home-dictum row con-c align-c">
            <span class="fs-s fc-default">羡君之心　至死方休</span>
        </div>

        <!-- <div class="home-album">
            <div class="row con-b align-c">
                <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/album-1.png" alt="">
                <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/album-2.png" alt="">
            </div>
            <div class="row con-b align-c">
                <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/album-3.png" alt="">
                <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/album-4.png" alt="">
            </div>
        </div> -->
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
    .home {
        background: #ffffff;
    }

    .home-index {
        width: 1280px;
        height: 720px;
        background-image: url("https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/home.png");
        background-repeat:no-repeat;
        background-position:center;
    }

    .home-index img {
        margin-top: 330px;
        margin-bottom: 78px;
    }

    .home-index span,
    .home-dictum span {
        letter-spacing: 80px;
    }

    .home-topic {
        padding: 0 64px;
    }

    .home-topic span {
        margin-bottom: 24px;
    }

    .home-topic-info {
        width: 100%;
        height: 412px;
        padding-top: 64px;
    }

    .home-topic-info-cover,
    .home-topic-info-content {
        width: 560px;
        height: 348px;
    }

    .home-topic-info-cover img {
        width: 560px;
        height: 348px;
    }

    .home-topic-info-content h2 {
        margin-bottom: 34px;
    }

    .home-dictum {
        height: 192px;
    }

    .home-album {
        padding: 0 64px 88px 64px;
    }

    .home-album div {
        width: 1152px;
        height: 348px;
        margin-top: 32px;
    }
</style>