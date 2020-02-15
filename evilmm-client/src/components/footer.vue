<template>
    <div class="footer row con-b align-c">
        <div class="footer-info col con-c align-s">
            <span class="footer-info-dictum fs-l fc-white">记录过往　莫失莫忘</span>
            <span class="fs-s fc-white">地址：厦门湖里区</span>
            <span class="fs-s fc-white">邮箱：evilmm@foxmail.com</span>
        </div>
        <div class="row con-c align-c">
            <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/sign-footer.png" alt="" v-on:click="eventSignInBackstage">
        </div>
        <div class="footer-code row con-e align-c">
            <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/code-1.png" alt="">
            <img src="https://image-1256588539.cos.ap-shanghai.myqcloud.com/home/code-2.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data: function () {
            return {

            }
        },

        methods: {
            eventSignInBackstage: function () {
                if (this.$route.path !== '/backstage') {
                    this.$router.push('/backstage')
                }
            },
        },
    }
</script>
    
<style>
    .footer {
        width: 1280px;
        height: 336px;
        padding: 0 64px;
        background-image: url('../assets/vein.png');
    }

    .footer-info,
    .footer-code {
        width: 444px;
        height: 138px;
    }

    .footer-info-dictum {
        margin-bottom: 20px;
    }

    .footer-code img {
        margin-left: 32px;
    }
</style>