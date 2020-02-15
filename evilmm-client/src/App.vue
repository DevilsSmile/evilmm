<template>
    <div id="app">
        <Menu></Menu>
        <router-view/>
        <Footer></Footer>
    </div>
</template>

<script>
    import Menu from '@/components/menu'
    import Footer from '@/components/footer'

    export default {
        name: 'App',
        components: {
            Menu: Menu,
            Footer: Footer
        },
    }
</script>

<style>
    #app {
        width: 1280px;
        margin: 0 auto;
    }
</style>
