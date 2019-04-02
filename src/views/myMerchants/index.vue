<template>
    <div>
        <!-- header -->
        <mt-header fixed title="组织架构">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div style="height:40px;"></div>
        <!-- myMerchants -->
        <div class="myMerchantsHeaderMain">
            <div class="myMerchantsHeaderTopMain flex">
                <span>当前位置：
                    <b>任勇强</b>
                </span>
                <em>关闭</em>
            </div>
            <div class="myMerchantsHeaderSubMain">
                <span>当前所属：</span>
                <div class="flex">
                    <em>任勇强</em><img src="@/assets/images/notice-list-more.png" alt="">
                    <em>任勇强</em><img src="@/assets/images/notice-list-more.png" alt="">
                    <em>任勇强</em>
                </div>
            </div>
        </div>
        <div class="myMerchantsBodyMain">
            <div class="myMerchantsBodyTopMain line_bottom">
                <span>任勇强</span>
                <em>下属用户</em>
            </div>
            <div class="myMerchantsBodySubMain">
                <em class="moreEm" @click="openSub">史晓宇(157****2396)【5】</em>
                <em>智伟(157****4545)</em>
                <em>韩建文(157****5656)</em>
                <em>任向文(157****7878)</em>
            </div>
        </div>
        <!-- 下级Pupon -->
        <div class="overlazySub" v-if="popupVisible" @click="openSub"></div>
        <div class="subPuponMain" v-if="popupVisible">
            <div class="line_bottom">
                <em @click="openSub">关闭</em>
            </div>
            <div>
                <em>任二永(132****5462)</em>
                <em class="moreEm">任勇强(132****5462)【3】</em>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            popupVisible: false
        };
    },
    methods: {
        openSub() {
            this.popupVisible = !this.popupVisible;
        }
    }
};
</script>
<style lang="scss">
.myMerchantsHeaderTopMain {
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    color: #fff;
    background: #26a2ff;
    em {
        border-radius: 5px;
        border: 1px solid #fff;
        box-sizing: border-box;
        padding: 0 5px;
        font-size: 12px;
    }
}
.myMerchantsHeaderSubMain {
    height: 40px;
    line-height: 40px;
    background: #f1f1f1;
    padding: 0 10px;
    font-size: 14px;
    span {
        float: left;
    }
    div {
        padding-top: 4px;
        img {
            width: 15px;
            height: 15px;
            display: inline-block;
            margin: 0 2px;
            position: relative;
            top: 8px;
        }
        em {
            border: 1px solid #f1f1f1;
            background: #fff;
            line-height: 30px;
            font-size: 14px;
            padding: 0 10px;
            display: block;
            max-width: 56px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align:center;
        }
    }
}
.myMerchantsBodyMain {
    padding: 10px;
}
.myMerchantsBodyTopMain {
    font-size: 16px;
    padding-bottom: 10px;
    span {
        padding-left: 8px;
        border-left: 2px solid #ccc;
        font-weight: bold;
    }
    em {
        font-size: 12px;
        padding-left: 5px;
        color: #333;
    }
}
.myMerchantsBodySubMain {
    overflow: hidden;
    padding: 10px 0;
    em {
        font-size: 14px;
        line-height: 30px;
        border: 1px solid #f1f1f1;
        color: #333;
        display: block;
        padding: 0 0.1rem;
        float: left;
        margin: 0 10px 10px 0;
    }
}
em.moreEm {
    padding-right: 20px;
    position: relative;
}
em.moreEm::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-right: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    position: absolute;
    right: 7px;
    top: 50%;
    margin-top: -4px;
}
.subPuponMain {
    width: 70%;
    position: fixed;
    right: 0;
    top: 40px;
    bottom: 0;
    background: #fff;
    z-index: 999;
    div:first-of-type {
        padding: 10px;
        overflow: hidden;
        em {
            font-size: 12px;
            border: 1px solid #f1f1f1;
            padding: 0 7px;
            border-radius: 5px;
            display: block;
            float: right;
        }
    }
    div:last-of-type {
        padding: 10px;
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        em {
            font-size: 14px;
            line-height: 30px;
            border: 1px solid #f1f1f1;
            color: #333;
            display: block;
            padding: 0 10px;
            float: left;
            margin: 0 10px 10px 0;
        }
    }
}
.overlazySub {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
}
</style>
