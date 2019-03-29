


<template>
    <div class="settings">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="$router.go(-1)"/>
            <span>设置中心</span>
        </div>
        <div class="settings-list">
            <ul>
                <li @click="logout">
                    <span>退出登录</span>
                    <i></i>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
    import { MessageBox, Toast } from 'mint-ui';
    import {profitList} from '@/api/profit'
    export default {
        data () {
            return {}
        },
        methods: {
            logout () {
                MessageBox.confirm('您确定要退出吗?', '退出')
                .then(action => {
                    this.$store.dispatch('LogOut').then(() => {
                        location.reload() 
                    })
                })
                .catch(() => {
                });  
            }
        },
    }
</script>


<style>
    .settings-list {
        margin-top: .2rem;
    }
    .settings-list ul  {
        padding: 0 .2rem;
    }
    .settings-list ul li {
        font-size: .26rem;
        overflow: hidden;
        line-height: .5rem;
        padding: .1rem 0;
        color: #000;
    }
    .settings-list ul li span {
        float: left;
    }
    .settings-list ul li i {
        float: right;
        width: .2rem;
        height: .2rem;
        background: url(../../assets/images/settings-ico.png) no-repeat;
        background-size: 100%;
        margin-top: .13rem;
    }
</style>


