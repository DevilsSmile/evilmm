<template>
    <div id="app">
        <Menu></Menu>
        <router-view/>
        <Footer></Footer>
    </div>
</template>

<script>
import imCorvus from '@/npm/corvus/corvus.js'
import Menu from '@/components/menu'
import Footer from '@/components/footer'

export default {
    name: 'App',
    components: {
        Menu: Menu,
        Footer: Footer
    },
    created: function () {
        // http://127.0.0.1:8888/user/selectuserinfo
        // console.log('created')
        // let funCorvus = imCorvus({
        //     baseURL: 'http://127.0.0.1:8888/'
        // })
        // funCorvus.request({
        //     url: 'user/selectuserinfo',
        //     data: {
        //         user: 123456,
        //         password: 111111
        //     }
        // })
        // .then(function (funResponse) {
        //     console.log('request data: ', funResponse)
        // })
        // .catch(function (funResponse) {
        //     console.log('request error: ', funResponse)
        // })
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
