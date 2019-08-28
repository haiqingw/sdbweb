

<template>
    <div>
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>设置提现密码</span>
        </div>
        <div class="remanufacturePwd" v-if="remanufacturePwd">
            <div class="one" v-if="remanufacturePwdOne">
                <van-password-input
                    style="margin-top: 2rem;"
                    :value="value"
                    info="为了您的安全请设置提现密码"
                    @focus="showKeyboard = true"
                />

                <!-- 数字键盘 -->
                <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
                    @blur="showKeyboard = false"
                />
            </div>
            <div class="two" v-if="remanufacturePwdTwo">
                <van-password-input
                    style="margin-top: 2rem;"
                    :value="value2"
                    info="再次输入提现密码"
                    @focus="showKeyboard2 = true"
                />
                <!-- 数字键盘 -->
                <van-number-keyboard
                    :show="showKeyboard2"
                    @input="onInput2"
                    @delete="onDelete2"
                    @blur="showKeyboard2 = false"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "mint-ui";
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            remanufacturePwd: true,
            remanufacturePwdOne: true,
            remanufacturePwdTwo: false,
            value: "",
            value2: "",
            showKeyboard: true,
            showKeyboard2: true,
            queryData: {},
            renderData: {}
        };
    },
    methods: {
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
            if (this.value.length === 6) {
                this.remanufacturePwdOne = false;
                this.remanufacturePwdTwo = true;
            }
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        onInput2(key) {
            this.value2 = (this.value2 + key).slice(0, 6);
            if (this.value2.length === 6) {
                if (this.value === this.value2) {
                    Toast("设置密码成功");
                    setTimeout(() => {
                        this.$router.push({
                            // path: "/loginoid",
                            path: "/home"
                        });
                    }, 500);
                } else {
                    Toast("俩次输入不一致");
                    this.remanufacturePwdTwo = false;
                    this.remanufacturePwdOne = true;
                    this.value = "";
                    this.value2 = "";
                }
            }
        },
        onDelete2() {
            this.value2 = this.value2.slice(0, this.value.length - 1);
        }
    }
};
</script>

</script>
<style lang="scss">
.remanufacturePwd {
    position: fixed;
    top: 0.8rem;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 9999;
}
</style>