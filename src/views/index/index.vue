

<template>
    <div>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="index">
                <Index></Index>
            </mt-tab-container-item>
            <mt-tab-container-item id="data">
                数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据数据
            </mt-tab-container-item>
            <mt-tab-container-item id="share">
                <Share></Share>
            </mt-tab-container-item>
            <mt-tab-container-item id="news">
                <msg />
            </mt-tab-container-item>
            <mt-tab-container-item id="my">
                我的
            </mt-tab-container-item>
        </mt-tab-container>
        <mt-tabbar v-model="selected" fixed class="footer">
            <mt-tab-item id="index">
                <img :src="selected == 'index' ? footer.index.imgActive : footer.index.img">
                {{footer.index.title}}
            </mt-tab-item>
            <mt-tab-item id="data">
                <img :src="selected == 'data' ? footer.data.imgActive : footer.data.img">
                {{footer.data.title}}
            </mt-tab-item>
            <mt-tab-item id="share" class="share">
                <img :src="footer.share.imgActive">
                {{footer.share.title}}
            </mt-tab-item>
            <mt-tab-item id="news">
                <img :src="selected == 'news' ? footer.news.imgActive : footer.news.img">
                {{footer.news.title}}
            </mt-tab-item>
            <mt-tab-item id="my">
                <img :src="selected == 'my' ? footer.my.imgActive : footer.my.img">
                {{footer.my.title}}
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    import Index from '@/components/index'
    import Share from '@/components/share'
    import Msg from '@/components/msg'
    import { test } from '@/api/test'
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                selected: "index",
                footer: {
                    index: {
                        title: "首页",
                        img: require('@/assets/images/footer-index.png'),
                        imgActive: require('@/assets/images/footer-index-active.png'),
                    },
                    data: {
                        title: "数据",
                        img: require('@/assets/images/footer-data.png'),
                        imgActive: require('@/assets/images/footer-data-active.png'),
                    },
                    share: {
                        title: "分享",
                        img: require('@/assets/images/footer-share.png'),
                        imgActive: require('@/assets/images/footer-share-active.png'),
                    },
                    news: {
                        title: "消息",
                        img: require('@/assets/images/footer-news.png'),
                        imgActive: require('@/assets/images/footer-news-active.png'),
                    },
                    my: {
                        title: "我的",
                        img: require('@/assets/images/footer-my.png'),
                        imgActive: require('@/assets/images/footer-my-active.png'),
                    }
                },
            }
        },
        components: {
            Index,
            Share,
            Msg
        },
        methods: {
           routerSelected () {
               
           }
        },
        created() {
          
        }
    }
</script>

<style>
body {
    padding-bottom: 1.6rem;
}
.index {
    background: #eeeeee;
}
.footer {
    height: 1.1rem;
    padding-top: 0.2rem;
    box-sizing: border-box;
    line-height: .4rem;
    background: #fff;
    font-size: 0.24rem;
    color: #b8c1cb;
    margin-top: .5rem;
}
.footer img {
    width: .36rem;
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
    margin-top: -.5rem;
    /* background: #fff; */
}
.footer .share img {
    width: 0.88rem;
}
.footer .is-selected.share .mint-tab-item-label {
    color: #b8c1cb;
}
</style>


