<template>
    <div class="about">
        <p class="fs-m fc-default">
            每次要写自我介绍就很头疼，人嘛，一直都是复杂的，多面的。仅靠三言两语来描述一个人是什么样子，大抵都是简单粗暴的贴上标签，未免太过武断。
        </p>
        <p class="fs-m fc-default">
            在与人相处这一面上，简单，坦诚，直接是我的态度。
        </p>
        <p class="fs-m fc-default">
            早期在影棚做着与摄影相关的工作，拍照嘛，也是我喜欢做的事情。通过镜头，以不同的视角去观察这个世界，去发现这个世界微妙的地方。同时，与文字不同，照片是另一种记录生活与表达情感的方式。
        </p>
        <p class="fs-m fc-default">
            而对于编程这件事，也是喜欢做的事情之一。它源于一个热爱游戏，想做游戏的梦想。从大学开始使用魔兽争霸的地图编辑器制作自己的地图，到现在做自己的站点，编程带给我的是一种实现自我的快感。
        </p>
        <p class="fs-m fc-default">
            没有喜欢的页面板式诶，那就自己设计。明明可以交给计算机去做的事，就想办法写个插件解决。凡是能动手的，绝对不逼逼。
        </p>
        <p class="fs-m fc-default">
            关于这个站点一年前已经做过一版，不过那时只有前端部分是自己做的，后端部分借用了框架。如今重启，它已是完完全全出自我之手，满足了我为所欲为的念想。未来的日子里，我会将它变得更好，更强大。
        </p>
        <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/about.png" alt="">
    </div>
</template>

<script>    
    export default {
        name: 'About',
        data: function () {
            return {
                
            }
        },

        mounted: function () {
            this.$store.commit('menuSetIndex', 4)
        },
        
        methods: {

        },
    }
</script>
    
<style>
    .about {
        min-height: 720px;
        padding: 0 212px 60px 212px;
        background: #ffffff;
    }
    
    .about p {
        color: #40403d;
        margin-bottom: 24px;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 4px;
    }
</style>