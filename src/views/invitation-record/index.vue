


<template>
    <div class="invitation-record">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>邀请记录</span>
        </div>
        <div class="top-text">
            您邀请了<span>2</span>个新用户，领取了<span>0</span>台机器，赚了<span>0.00</span>元
        </div>
        <div class="invitation-record-list">
            <ul>
                <li>
                    <div class="title">
                        <h3>三人共创（15888888888）</h3>
                        <a href="tel:18688888888"></a>
                    </div>
                    <div class="content">
                        <div class="machine">
                            <em>0</em>
                            <span>领取机器(台)</span>
                        </div>
                        <div class="reward">
                            <em>0.00</em>
                            <span>邀请奖励(元)</span>
                        </div>
                    </div>
                    <div class="time-detailed">
                        <time>2000-00-00 00:00:00</time>
                        <router-link to="/invitationRecordDetailed">查看记录详细</router-link>
                    </div>
                </li>
                <li>
                    <div class="title">
                        <h3>三人共创（15888888888）</h3>
                        <a href=""></a>
                    </div>
                    <div class="content">
                        <div class="machine">
                            <em>0</em>
                            <span>领取机器(台)</span>
                        </div>
                        <div class="reward">
                            <em>0.00</em>
                            <span>邀请奖励(元)</span>
                        </div>
                    </div>
                    <div class="time-detailed">
                        <time>2000-00-00 00:00:00</time>
                        <router-link to="/invitationRecordDetailed">查看记录详细</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                
            }
        },
    }
</script>

<style>
.invitation-record .top-text {
    font-size: .28rem;
    text-align: center;
    line-height: 0.4rem;
    padding: 0.2rem 0;
    background: #f1f1f1;
}
.invitation-record .top-text span {
    color: #FF9900;
}
.invitation-record .invitation-record-list {
    margin-top: 0.2rem;
}
.invitation-record .invitation-record-list ul li {
    padding: .2rem 0;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    margin-bottom: .3rem;
}
.invitation-record .invitation-record-list ul li .title {
    overflow: hidden;
    padding: .1rem .2rem;
}
.invitation-record .invitation-record-list ul li .title h3 {
    float: left;
    font-size: 0.3rem;
    font-weight: normal;
    line-height: .4rem;
}
.invitation-record .invitation-record-list ul li .title a {
    float: right;
    width: .4rem;
    height: .4rem;
    background: url(../../assets/images/invitation-record-lis-telephone.png) no-repeat;
    background-size: 100%;
}
.invitation-record .invitation-record-list ul li .content {
    border: .01rem solid #ccc;
    border-left: none;
    border-right: none;
    padding: .2rem 0;
    margin: .1rem 0;
    overflow: hidden;
}
.invitation-record .invitation-record-list ul li .content>div {
    width: 50%;
    float: left;
    font-size: 0.28rem;
    text-align: center;
    margin-bottom: .2rem;
}
.invitation-record .invitation-record-list ul li .content>div em {
    display: block;
    color: red;
    margin: 0.2rem 0;
    font-weight: bold;
    font-size: .38rem;
}
.invitation-record .invitation-record-list ul li .content .machine {
    border-right: .01rem solid #ccc;
    box-sizing: border-box;
}
.invitation-record .invitation-record-list ul li .time-detailed {
    padding: .1rem .2rem;
    overflow: hidden;
    font-size: .28rem;
    color: #ccc;
}
.invitation-record .invitation-record-list ul li .time-detailed time {
    float: left;
}
.invitation-record .invitation-record-list ul li .time-detailed a {
    float: right;
    color: #089cfe;
}
</style>


