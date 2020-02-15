<template>
    <div class="backstage row">
        <!-- <Aside></Aside> -->
        <div class="main">
            <EditAlbum v-if="$store.state.aside === 'album' ? true : false"></EditAlbum>
            <EditTopic v-if="$store.state.aside === 'topic' ? true : false"></EditTopic>
            <EditRecord v-if="$store.state.aside === 'record' ? true : false"></EditRecord>
        </div>
    </div>
</template>

<script>
    import imMiment from 'miment'
    import imCorvus from '@/common/js/corvus/corvus.js'

    import Aside from '@/components/aside'
    import EditAlbum from '@/page/backstage/edit-album'
    import EditTopic from '@/page/backstage/edit-topic'
    import EditRecord from '@/page/backstage/edit-record'
    
    export default {
        name: 'Backstage',
        components: {
            Aside: Aside,
            EditAlbum: EditAlbum,
            EditTopic: EditTopic,
            EditRecord: EditRecord,
        },
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
    .backstage {
        min-height: 720px;
        background: #ffffff;
    }
</style>