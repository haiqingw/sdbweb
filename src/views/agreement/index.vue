
<template>
    <div>
        <div class="return">
            <!-- <img src="@/assets/images/return.png" alt @click="$router.go(-1)" /> -->
            <span>用户协议</span>
        </div>
        <div
            class="content"
            id="content"
            v-html="content"
        ></div>
        <div class="btn" :class="{ 'active': state }">
            <el-button type="primary" @click="agree" :disabled="!state">
                我已阅读并同意
                <span v-if="isTime">{{time}}s</span>
            </el-button>
        </div>
    </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import { getServer } from "@/api/index";
export default {
    data() {
        return {
            isTime: true,
            time: 10,
            state: false,
            timer: null,
            content: "",
            queryData: {
                getData: {
                    requestType: "securitycode",
                    requestKeywords: "disagreement",
                    platformID: this.$store.state.user.pid
                }
            }
        };
    },
    methods: {
        agree() {
            if (this.state) {
                if (this.$route.params.state === "modify") {
                    this.$router.push({
                        name: "modifyInfo"
                    });
                } else if (this.$route.params.state === "add") {
                    this.$router.push({
                        name: "certification"
                    });
                }
            }
        },
        getData() {
            getServer(this.queryData.getData).then(res => {
                if( res.data.responseStatus === 1 ) {
                    this.content = res.data.content
                }
            });
        },
        timeFunc() {
            this.timer = setInterval(() => {
                this.time--;
                if (this.time == 0) {
                    this.isTime = false;
                    this.state = true;
                    clearInterval(this.timer);
                }
            }, 1000);
        }
    },
    mounted() {},
    created() {
        this.timeFunc();
        this.getData()
    }
};
</script>

<style lang="scss">
.content {
    font-size: 0.3rem;
    margin-top: 0.8rem;
    line-height: 0.5rem;
    padding: 0 0.1rem;
    padding-bottom: 1rem;
}
.btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
.btn .el-button {
    width: 100%;
    border-radius: 0%;
}
</style>