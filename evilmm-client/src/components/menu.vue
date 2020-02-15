<template>
    <div class="menu col" v-bind:class="{ 'menu-home-style': $store.state.menu.isHome, 'menu-other-style': !$store.state.menu.isHome }">
        <div class="menu-item row con-b align-e" v-bind:class="{ 'menu-item-background': !$store.state.menu.isHome }">
            <ul class="row con-s">
                <li class="fs-m fc-white" v-for="(item, index) in menu" v-bind:key="index" v-on:click="handleSetMenu(index)">
                    {{item.text}}
                </li>
            </ul>
            <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/logo.png" alt="">
        </div>
        <div class="menu-blank" v-if="!$store.state.menu.isHome">
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Menu',

        data: function () {
            return {
                menu: [{
                    text: '主页',
                    path: '/',
                }, {
                    text: '相册',
                    path: '/album',
                }, {
                    text: '日志',
                    path: '/topic',
                }, {
                    text: '记录',
                    path: '/record',
                }, {
                    text: '在下',
                    path: '/about',
                }],
            }
        },

        mounted: function () {
            if (this.$route.path === '/') {
                this.$store.commit('menuSetIndex', 0)
            } else {
                this.$store.commit('menuSetIndex', 99)
            }
        },

        methods: {
            handleSetMenu: function (funIndex) {
                if (this.$route.path !== this.menu[funIndex].path) {
                    this.$router.push(this.menu[funIndex].path)
                    if (this.menu[funIndex].path === '/') {
                        this.$store.commit('menuSetIndex', funIndex)
                        console.log('funIndex', funIndex)
                        console.log(this.$store.state.menu.isHome)
                    } else {
                        this.$store.commit('menuSetIndex', funIndex)
                        console.log('funIndex', funIndex)
                        console.log(this.$store.state.menu.isHome)
                    }
                }
            },
        },
    }
</script>
    
<style>
    /* 主页菜单需要定位在图片之上 */
    .menu-home-style {
        position: absolute;
        top: 0;
        width: 1280px;
    }

    .menu-other-style {
        position: relative;
        width: 1280px;
    }

    .menu-item {
        height: 64px;
        padding: 0 64px;
    }

    .menu-item-background {
        background: #3f403d;
    }

    .menu img {
        width: 34px;
        height: 34px;
    }

    .menu li {
        display: inline-block;
        margin-right: 44px;
        list-style-type: none;
    }

    /* 主页之外的页面菜单样式 */
    .menu-blank {
        background: #ffffff;
    }

    .menu-blank div:nth-child(1) {
        width: 100%;
        height: 32px;
        background: #3f403d;
    }

    .menu-blank div:nth-child(2) {
        width: 100%;
        height: 32px;
        background: #ffffff;
    }
</style>