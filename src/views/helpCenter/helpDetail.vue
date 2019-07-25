<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="帮助中心">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
        </mt-header>-->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>帮助中心</span>
        </div>
        <!-- body -->
        <div class="helpCenterDetailMain">
            <div class="top line_bottom">
                <h3>{{renderData.detail.title}}</h3>
                <time>{{renderData.detail.createTime}}</time>
            </div>
            <div class="helpCenterDetailBox">{{renderData.detail.content}}</div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
export default {
    data() {
        return {
            queryData: {
                detail: {
                    requestType: "listdetail",
                    requestKeywords: "helpcenter",
                    platformID: this.$store.state.user.pid,
                    id: this.$route.params.id
                }
            },
            renderData: {
                detail: ""
            }
        };
    },
    methods: {
        detail() {
            getServer(this.queryData.detail).then(res => {
                if (res.data.responseStatus === 1) {
                    res.data.data.content = res.data.data.content.replace(
                        /<[^>]+>/g,
                        ""
                    );
                    this.renderData.detail = res.data.data;
                }
            });
        }
    },
    created() {
        this.detail();
    }
};
</script>
<style lang="scss">
.helpCenterDetailMain {
    padding-top: 40px;
    text-align: justify;
    overflow: hidden;
    .top {
        overflow: hidden;
        h3 {
            padding: 10px;
            font-size: 16px;
            font-weight: bold;
            line-height: 24px;
            float: left;
        }
        time {
            float: right;
            color: #ccc;
            font-size: 0.2rem;
            line-height: 0.78rem;
            margin-right: 10px;
        }
    }
}
.helpCenterDetailBox {
    padding: 10px;
    line-height: 20px;
    font-size: 14px;
}
</style>
