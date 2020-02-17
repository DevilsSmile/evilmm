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
    </div>
</template>

<script>
    import imCorvus from '@/common/js/corvus/corvus.js'
    
    export default {
        name: 'Home',
        data: function () {
            return {

            }
        },

        mounted: function () {
            console.log('home')
        },
        
        methods: {
            
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
</style>