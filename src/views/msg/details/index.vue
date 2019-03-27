

<template>
    <div class="msg-details">
         <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>详细</span>
        </div>
    </div>
</template>

<script>
    import {getMsgDetails} from '@/api/msg'
    import { Indicator } from 'mint-ui'
    export default {
        data () {
            return {
                queryData: {
                    msgDetails: {
                        requestType: 'messagemanage',
                        requestKeywords: 'details', 
                        userID: this.$store.state.user.uid, 
                        platformID: this.$store.state.user.pid, 
                        userPhone: this.$store.state.user.uphone, 
                        mid: this.$route.params.id
                    }
                },
                renderData: {
                    listData: []
                }
            }
        },
        methods: {
            mgDetails () {
                Indicator.open()
                getMsgDetails(this.queryData.msgDetails).then( res => {
                    if(res.data.responseStatus === 1) {
                        Indicator.close()
                        console.log(res)
                    }
                })
            }
        },
        created () {
            this.mgDetails()
        }
    }
</script>


<style>

</style>

