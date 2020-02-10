<template>
    <div class="menu">
        <ul class="row con-c align-c">
            <li v-on:click="eventHome">主页</li>
            <li v-on:click="eventAlbum">相册</li>
            <li v-on:click="eventTopics">日志</li>
        </ul>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/npm/corvus/corvus.js'
    
    export default {
        name: 'Menu',
        data: function () {
            return {
                msg: 'Welcome to Your Vue.js App',
                title: '',
                content: '',
            }
        },
        mounted: function () {
            console.log('mounted', this.$store.state.menu)
        },
        methods: {
            eventHome: function () {
                this.$router.push('/')
                console.log('home')
            },
            eventAlbum: function () {
                console.log('album')
            },
            eventTopics: function () {
                console.log('Topics')
                this.$router.push('/topics')
            },
        },
    }
</script>
    
<style>
    .menu li {
        display: inline-block;
        list-style-type: none;
        margin: 0 15px;
    }

    .menu ul {
        height: 70px;
        padding: 0 10px;
        border-bottom: 2px #f5f5f5 solid;
    }
</style>