<template>
    <div class="aside">
        <ul class="col">
            <li v-on:click="eventEdit('album')">相册管理</li>
            <li v-on:click="eventEdit('topic')">日志编辑</li>
            <li v-on:click="eventEdit('record')">记录编辑</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Aside',
        data: function () {
            return {}
        },

        mounted: function () {
            console.log('mounted', this.$store.state.menu)
        },
        
        methods: {
            /**
             *  设置 store 中 aside 的状态数值，进入指定的编辑页面。
             *  @function
             *  @param {string} funType
             *  @returns
             */
            eventEdit: function (funType) {
                this.$store.commit('asideSetSelected', funType)
            },
        },
    }
</script>
    
<style>
    .aside {
        width: 160px;
        background: #ffffff;
    }

    li {
        display: inline-block;
        list-style-type: none;
        margin: 0 15px;
    }
</style>