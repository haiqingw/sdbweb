<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="帮助中心">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
        </mt-header>-->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>帮助中心</span>
        </div>
        <!-- body -->
        <div class="helpCenterHeaderMain">
            <img src="@/assets/images/helpCenterHeaderImg.jpg" alt="在线客服">
            <div>
                <h3>在线客服</h3>
                <!-- {{renderData.top}} -->
                <!-- <a :href="'tel:'+ renderData.top.mobile">立即咨询</a> -->
                <!-- <a :href="'tel:'+ renderData.top.landline">立即咨询</a> -->
                <p>
                    座机：{{renderData.top.mobile}}
                    <a :href="'tel:'+ renderData.top.mobile">立即咨询</a>
                </p>
                <p>
                    电话：{{renderData.top.landline}}
                    <a :href="'tel:'+ renderData.top.mobile">立即咨询</a>
                </p>
                <p>人工服务时间：工作日{{renderData.top.dates}}</p>
            </div>
        </div>
        <div class="helpCenterBodyMain" v-if="isData">
            <div v-for="item in renderData.list" :key="item.classUrl">
                <div class="oneLevelTitle">
                    <span>{{item.class}}</span>
                </div>
                <div class="listViewMain">
                    <router-link
                        tag="div"
                        class="listViewItem line_bottom"
                        v-for="i in item.list"
                        :key="i.id"
                        :to="{name: 'helpDetail', params: { id: i.id } }"
                    >
                        <img :src="i.helpUrl">
                        <span>{{i.title}}</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="no-data" v-else>
            <img src="@/assets/images/no-data.png" alt>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
export default {
    data() {
        return {
            isDownLoading: false, //下拉刷新
            isUpLoading: false, //上拉加载
            upFinished: false, //上拉加载完毕
            offset: 10, //滚动条与底部距离小于 offset 时触发load事件
            isData: true,
            queryData: {
                top: {
                    requestType: "system",
                    requestKeywords: "getsystem",
                    platformID: this.$store.state.user.pid,
                    type: "customerservicetelephone"
                },
                list: {
                    requestType: "list",
                    requestKeywords: "apphelp",
                    platformID: this.$store.state.user.pid
                }
            },
            renderData: {
                phone: "",
                list: [],
                dates: "",
                top: ""
            }
        };
    },
    methods: {
        top() {
            getServer(this.queryData.top).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.top = res.data.content;
                }
            });
        },
        list() {
            getServer(this.queryData.list).then(res => {
                if (res.data.responseStatus === 1) {
                    this.isData = true;
                    this.renderData.list = res.data.data;
                } else if (res.data.responseStatus === 300) {
                    this.isData = false;
                }
            });
        }
    },
    created() {
        this.top();
        this.list();
    }
};
</script>
<style lang="scss">
.helpCenterHeaderMain {
    //   margin-top: 40px;
    margin-top: 0.8rem;
    // height: 150px;
    height: 3.2rem;
    position: relative;
    img {
        height: 100%;
    }
    div {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        h3 {
            font-size: 18px;
            color: #fff;
            padding-top: 25px;
        }
        p {
            font-size: 14px;
            padding-top: 10px;
            color: #fff;
            span {
                margin-right: .1rem;
            }
        }
        a {
            // display: block;
            padding: 0.04rem 0.1rem;
            width: 100px;
            height: 30px;
            line-height: 29px;
            text-align: center;
            color: #fff;
            border: 1px solid #fff;
            box-sizing: border-box;
            font-size: 14px;
            margin: 15px auto 0;
            border-radius: 5px;
        }
    }
}
.oneLevelTitle {
    background: #f1f1f1;
}
.oneLevelTitle > span {
    padding: 0 10px;
    display: block;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
}
.listViewMain {
    background: #fff;
}
.listViewMain > div:last-of-type {
    background: #fff;
}
.listViewItem {
    height: 60px;
    line-height: 60px;
    padding: 0 20px 0 10px;
    position: relative;
}
.listViewItem > img {
    width: 26px;
    height: 26px;
    float: left;
    margin-right: 10px;
    margin-top: 17px;
}
.listViewItem > span {
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.listViewItem::after {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -5px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}
</style>
