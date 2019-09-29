<template>
    <div>
        <!-- header -->
        <div class="return">
            <router-link to="/mine">
                <img src="@/assets/images/return.png" alt />
            </router-link>
            <span>实名认证</span>
        </div>
        <!-- body -->
        <div class="certificationCompleteMain">
            <img src="@/assets/images/cerSuccessIcon.png" alt="认证成功" />
            <h3>恭喜您，您已通过认证</h3>
        </div>
    </div>
</template>
<script>
import wx from "weixin-js-sdk";
export default {
    data() {
        return {};
    },
    methods: {
        onBrowserBack() {
            // 这里写点击返回键时候的事件
            // 比如判断需求执行back()或者go(-2)或者PopupShow=false隐藏弹框
            wx.closeWindow();
        }
    },
    mounted() {
        // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
        window.history.pushState(null, null, document.URL);
        // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
        window.addEventListener("popstate", this.onBrowserBack, false);
    },
    destroyed() {
        // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
        window.removeEventListener("popstate", this.onBrowserBack, false);
    }
};
</script>
<style lang="scss">
.certificationCompleteMain {
    text-align: center;
    padding-top: 40px;
    img {
        display: block;
        width: 70px;
        height: 70px;
        margin: 40% auto 0;
    }
    h3 {
        font-size: 18px;
        font-weight: bold;
        line-height: 50px;
        color: #333;
        padding-top: 20px;
    }
}
</style>
