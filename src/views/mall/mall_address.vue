<template>
    <div>
        <!-- header -->
        <mt-header fixed title="收货地址">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- addressList -->
        <div class="addressContainer">
            <ul class="addressListUl">
                <li class="isDft">
                    <div>
                        <span>任勇强</span>
                        <em>13296905340</em>
                    </div>
                    <p class="line_bottom">内蒙古呼和浩特市新城区兴安北路鼎盛华世纪广场10005</p>
                    <div class="operationAddress flex">
                        <em class="editorIcon"><img src="@/assets/images/editorIcon.png" alt="编辑">编辑</em>
                        <em class="deleteIcon"><img src="@/assets/images/shanchu.png" alt="删除">删除</em>
                    </div>
                </li>
                <li>
                    <div>
                        <span>任勇强</span>
                        <em>13296905340</em>
                    </div>
                    <p class="line_bottom">内蒙古呼和浩特市新城区兴安北路鼎盛华世纪广场10005</p>
                    <div class="operationAddress flex">
                        <em class="editorIcon"><img src="@/assets/images/editorIcon.png" alt="编辑">编辑</em>
                        <em class="deleteIcon"><img src="@/assets/images/shanchu.png" alt="删除">删除</em>
                    </div>
                </li>
            </ul>
            <!-- 暂无收货地址 -->
            <div class="noDataMain" style="display:none;">
                <img src="@/assets/images/noDataIcon.png" alt="暂无数据">
                <p>暂无收货地址</p>
            </div>
        </div>
        <div class="footerBottomBtn line_top">
            <router-link to="/mall/mall_addAddress"><a href="javascript:;">添加收货地址</a></router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "mall_address",
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="scss">
.addressContainer {
    padding:50px 10px 70px;
}

.addressListUl li {
    margin-bottom: 10px;
    background: #fff;
    padding: 0 10px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 5px #ccc;
}

.addressListUl li.isDft::after {
    content: "默认";
    display: block;
    height: 20px;
    width: 70px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    background: #0096fe;
    position: absolute;
    right: -19px;
    bottom: 6px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}

.addressListUl li:last-of-type {
    margin-bottom: 0;
}

.addressListUl li > div:first-of-type {
    overflow: hidden;
    line-height: 30px;
    height: 30px;
    padding-top: 10px;
    font-size: 16px;
}

.addressListUl li > div:first-of-type span {
    float: left;
    font-weight: bold;
}

.addressListUl li > div:first-of-type em {
    float: right;
}

.addressListUl li > p {
    line-height: 22px;
    font-size: 16px;
    padding-bottom: 10px;
}

div.operationAddress {
    overflow: hidden;
    justify-content: space-around;
}

.operationAddress > em {
    display: block;
    width: 100%;
    text-align: center;
    padding: 8px 0;
    font-size: 14px;
}

.operationAddress > em img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    position: relative;
    top: -2px;
}

.footerBottomBtn {
    position: fixed;
    left: 0;
    bottom: 0;
    padding:10px;
    width: 100%;
    box-sizing: border-box;
}

.footerBottomBtn a{
    display: block;
    width:100%;
    height: 40px;
    line-height: 41px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    border-radius: 5px;
    background: #0096fe;
    margin: 0 auto;
    overflow: hidden;
}

.noAddressDataBox {
    text-align: center;
    padding-top: 40%;
}

.noAddressDataBox img {
    width: 110px;
    height: 110px;
}

.noAddressDataBox p {
    line-height: 30px;
    font-size: 16px;
}

.noAddressDataBox a {
    width: 150px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    color: #0096fe;
    border: 1px solid #0096fe;
    display: block;
    margin: 40px auto 0;
    border-radius: 35px;
}
</style>
