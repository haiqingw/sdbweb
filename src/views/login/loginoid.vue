

<template>
    <div>
        loginoid
    </div>
</template>

<script>
    import {getServer} from '@/api/index'
    export default {
        data () {
           return {
                getUrl: {
                    requestType: 'wchat',
                    requestKeywords: 'getopenid',
                    code: "code"
                }
           }
        },
        methods: {

        },
        created () {
            // getServer(this.getUrl).then( res => {
            //     console.log(res)
            // })
            window.location.href = 'http://ttsplus.xylrcs.cn/index.php/App/Wchat/getOpenid'
        }     
    }
</script>

<style>

</style>


