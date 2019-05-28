

<template>
    <div class>
        <div class="scroll-list-wrap">
            <cube-scroll
                    ref="scroll"
                    :data="list"
                    @pulling-down="onPullingDown"
                    @pulling-up="onPullingUp"
                    :options="options"
            >
                    <div class="list-item">
                        <div v-for="item in list" :key="item.id">{{item.id}}</div>
                    </div>
            </cube-scroll>
        </div>
        <div class="bottom">

        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            list: [
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                 {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },

                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
                {
                    id: 1
                },
            ],
           options: {
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: "刷新成功"
                }, // 配置下拉刷新
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: "上拉加载更多",
                        noMore: "没有更多数据"
                    }
                } // 配置上拉加载，若要关闭可直接 pullUpLoad：false
            },
        };
    },
    methods: {
        scrollTo() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        onPullingDown() {
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.terminalList();
        },
        // 触发上拉加载
        onPullingUp() {
            this.queryData.list.page++;
            this.terminalList();
        },
    }
};
</script>

<style lang="scss">
.scroll-list-wrap {
    height: 12.5rem;
    overflow: auto;
    .item {
        padding: 10px 10px;

        &:nth-child(2n + 1) {
            background: #ccc;
        }
    }
}
.cube-pullup-wrapper .before-trigger{
    padding: 0 !important;
}
.cube-pullup-wrapper {
    font-size: .3rem;
}
.list-item {
    /* height: 1000px;
    overflow: auto; */
    // margin-bottom: 3rem;
}
.bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 30px;
    background: red;
    width: 100%;
    z-index: 9999999;
}
</style>




