


<template>
    <div class="invitation-record-detailed">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>邀请记录详细</span>
        </div>
        <div class="invitation-record-detailed-contnet-top">
            三人共创(15888888888)累计为我赚了
            <span>0.00<em>元</em></span>
        </div>
        <div class="invitation-record-detailed-contnet-list">
            <h3>奖励明细</h3>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {

            }
        }        
    }
</script>

<style>
.invitation-record-detailed-contnet-top {
    background: #089cfe;
    color: #fff;
    font-size: 0.3rem;
    padding: .3rem .2rem;
}
.invitation-record-detailed-contnet-top span {
    font-size: 0.8rem;
    display: block;
    margin-top: 0.2rem;
}
.invitation-record-detailed-contnet-top span em {
    font-size: .3rem;
}
.invitation-record-detailed-contnet-list {
    margin-top: 0.2rem;
    padding: 0 .2rem;
}
.invitation-record-detailed-contnet-list h3 {
    font-weight: normal;
    font-size: 0.3rem;
    margin-bottom: 0.1rem;
}
.invitation-record-detailed-contnet-list ul li {
    
}
</style>

