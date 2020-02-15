<template>
    <div class="unknown row con-c align-c">
        <div class="col align-c">
            <span>页面不存在···</span>
            <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/404.png" alt="">
        </div>
    </div>
</template>

<script>    
    export default {
        name: 'unkonwn',
        data: function () {
            return {

            }
        },

        mounted: function () {
            this.$store.commit('menuSetIndex', 99)
        },
        
        methods: {            
            
        },
    }
</script>
    
<style>
    .unknown {
        min-height: 720px;
        padding: 0 64px;
        background:#ffffff;
    }

    .unknown span {
        font-size: 60px;
        letter-spacing: 20px;
    }
</style>