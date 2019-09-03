

<template>
    <div class="footerNavbar">
        <div class="footerNavMain flex line_top">
            <div
                class="footerNavItem"
                :class="{'active': selected === '/home'}"
                @click="switchTo('/home')"
            >
                <img :src="selected == '/home' ? footer.index.imgActive : footer.index.img" />
                {{footer.index.title}}
            </div>
            <div
                class="footerNavItem"
                :class="{'active': selected === '/dataCenter'}"
                @click="switchTo('/dataCenter')"
            >
                <img :src="selected == '/dataCenter' ? footer.data.imgActive : footer.data.img" />
                {{footer.data.title}}
            </div>
            <div
                class="footerNavItem"
                id="share"
                :class="{'active': selected === '/share'}"
                @click="switchTo('/share')"
            >
                <img :src="footer.share.imgActive" />
                {{footer.share.title}}
            </div>

            <div
                class="footerNavItem"
                :class="{'active': selected === '/message'}"
                @click="switchTo('/message')"
            >
                <el-badge
                    :value="renderData.rnum"
                    :hidden="renderData.rnum <= 0"
                    :max="99"
                    class="item"
                >
                    <img :src="selected == '/message' ? footer.news.imgActive : footer.news.img" />
                    {{footer.news.title}}
                </el-badge>
            </div>

            <div
                class="footerNavItem"
                :class="{'active': selected === '/mine'}"
                @click="switchTo('/mine')"
            >
                <img :src="selected == '/mine' ? footer.my.imgActive : footer.my.img" />
                {{footer.my.title}}
            </div>
        </div>
    </div>
</template>

<script>
import { getServer } from "@/api/index";
export default {
    data() {
        return {
            msgStatus: true,
            selected: this.$route.path,
            footer: {
                index: {
                    title: "首页",
                    img: require("@/assets/images/footer01.png"),
                    imgActive: require("@/assets/images/footer01_active.png")
                },
                data: {
                    title: "数据",
                    img: require("@/assets/images/footer02.png"),
                    imgActive: require("@/assets/images/footer02_active.png")
                },
                share: {
                    title: "分享",
                    img: require("@/assets/images/footer-share.png"),
                    imgActive: require("@/assets/images/footer-share-active.png")
                },
                news: {
                    title: "消息",
                    img: require("@/assets/images/footer03.png"),
                    imgActive: require("@/assets/images/footer03_active.png")
                },
                my: {
                    title: "我的",
                    img: require("@/assets/images/footer04.png"),
                    imgActive: require("@/assets/images/footer04_active.png")
                }
            },
            queryData: {
                msg: {
                    requestType: "messagemanage",
                    requestKeywords: "totalnotnum",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            },
            renderData: {
                rnum: 0
            }
        };
    },
    components: {},
    methods: {
        msg() {
            this.$store
            .dispatch("getMsgNum", this.queryData.msg)
            .then(() => {
                // location.reload();
                this.renderData.rnum = this.$store.state.msg.msgNum
                this.msgStatus = false
            });
        },
        switchTo(path) {
            // this.$set(this.selected, path);
            this.selected = path;
            this.$router.replace(path);
        }
    },
    watch: {
        // selected:{
        //     selected (val, oldval) {
        //         this.selected = val
        //     },
        //     deep: true,
        // }
    },
    created() {
        if(this.msgStatus) {
           this.msg();
        }
    }
};
</script>

<style>
.footerNavbar {
    padding-top: 0.28rem;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #fff;
    z-index: 999999;
}
.active {
    color: #089cfe;
}
.bp16 {
    padding-bottom: 1.6rem;
}
.index {
    background: #eeeeee;
}
.footer {
    height: 1.1rem;
    padding-top: 0.2rem;
    box-sizing: border-box;
    line-height: 0.4rem;
    background: #fff;
    font-size: 0.24rem;
    color: #b8c1cb;
    margin-top: 0.5rem;
}
.footer img {
    width: 0.36rem;
    margin-bottom: 0.1rem;
}
.mint-tabbar .mint-tab-item {
    background: rgba(255, 255, 255, 0);
}
.mint-tabbar > .mint-tab-item.is-selected {
    background: rgba(255, 255, 255, 0);
}
.footer .is-selected .mint-tab-item-label {
    color: #099ffe;
}
.footer .mint-tab-item {
    padding: 0;
}
.footer .share {
    margin-top: -0.5rem;
    /* background: #fff; */
}
.footer .share img {
    width: 0.88rem;
}
.footer .is-selected.share .mint-tab-item-label {
    color: #b8c1cb;
}
.footerNavMain {
    justify-content: space-around;
    padding-bottom: 5px;
    background: #f7f7f8;
}
.footerNavItem {
    font-size: 12px;
    text-align: center;
    padding-top: 10px;
}
.footerNavItem img {
    /* width: 20px;
    height: 20px; */
    width: 0.4rem;
    display: block;
    margin: 0 auto 7px;
}
#share {
    margin-top: -20px;
    position: relative;
    z-index: 999;
}
#share img {
    width: 40px;
    height: 40px;
}
</style>


