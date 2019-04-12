<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="收货地址">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>收货地址</span>
        </div>
        <!-- addressList -->
        <div class="addressContainer">
            <ul class="addressListUl">
                <li :class="{isDft : item.defaultState === '1' }" v-for="item in renderData.addressList" :key="item.id">
                    <div @click="setDefault(item.id)">
                        <span>{{item.name}}</span>
                        <em>{{item.phone}}</em>
                    </div>
                    <p @click="setDefault(item.id)" class="line_bottom">{{item.province}}{{item.city}}{{item.area}}{{item.detailedaddress}}</p>
                    <div class="operationAddress flex">
                        <!-- :to="{name: 'msgDetails', params: item}" -->
                        <router-link class="editorIcon" tag="em" :to="{ name: 'mallAddAddress', params: {id: item.id} }">
                            编辑
                            <img src="@/assets/images/editorIcon.png" alt="编辑">
                        </router-link>
                        <em @click="deleteAddress(item.id)" class="deleteIcon"><img src="@/assets/images/shanchu.png" alt="删除">删除</em>
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
            <router-link  
                :to="{ name: 'mallAddAddress', params: {id: 0} }" 
            >
                <a href="javascript:;">添加收货地址</a>
            </router-link>
        </div>
    </div>
</template>
<script>
import { getServer} from '@/api/index'
import { MessageBox, Toast } from 'mint-ui'
import response from '@/assets/js/response.js'
export default {
    name: "mall_address",
    data() {
        return {
             queryData: {
                addressList: {
                    requestType: 'list', 
                    requestKeywords: 'shippingaddress', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid,  
                    userPhone: this.$store.state.user.uphone
                },
                deleteAddress: {
                    requestType: 'operating', 
                    requestKeywords: 'delshipping', 
                    id: ""
                },
                setDefault: {
                    requestType: 'operating', 
                    requestKeywords: 'addrdefultstatus', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid, 
                    userPhone: this.$store.state.user.uphone,
                    id: ""
                }
            },
            renderData: {
                addressList: []
            }
        };
    },
    methods: {
        addressList () {
            getServer(this.queryData.addressList).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.addressList = res.data.data
                }
            })
        },
        deleteAddress (id) {
            this.queryData.deleteAddress.id = id
            MessageBox.confirm('您确定要删除该地址吗?', '删除')
                .then(action => {
                    getServer(this.queryData.deleteAddress).then( res => {
                        console.log(response[res.data.responseStatus])
                        if( res.data.responseStatus === 1 ) {
                            Toast("删除地址成功")
                            this.addressList()
                        }else {
                            Toast("删除地址失败")
                        }
                    })
                })
                .catch(() => {
                });  
        },
        setDefault (id) {
            this.queryData.setDefault.id = id
            MessageBox.confirm('您确定要将该地址设为默认吗?', '设为默认')
                .then(action => {
                    getServer(this.queryData.setDefault).then( res => {
                        // console.log(response[res.data.responseStatus])
                        if( res.data.responseStatus === 1 ) {
                            Toast("设为默认成功")
                            this.addressList()
                        }else {
                            Toast("设为默认失败")
                        }
                    })
                })
                .catch(() => {
                });  
        }
    },
    created () {
        this.addressList()
    },
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
    padding: .2rem 0;
    font-size: 14px;
}

.operationAddress > em img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    position: relative;
    top: -2px;
    float: right;
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
