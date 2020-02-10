<template>
    <div class="footer">
        <span>页脚</span>
        <button v-on:click="eventSignInBackstage">后台登录</button>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data: function () {
            return {

            }
        },

        mounted: function () {
            console.log('mounted', this.$store.state.menu)
        },

        methods: {
            eventSignInBackstage: function () {
                console.log('Backstag')
                if (this.$route.path !== '/backstage') {
                    this.$router.push('/backstage')
                }
            },
        },
    }
</script>
    
<style>
    .footer {
        height: 200px;
        background: #f2f2f2;
    }
</style>