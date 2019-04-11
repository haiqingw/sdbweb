<template>
    <div class="add-address">
        <!-- header -->
        <mt-header fixed title="添加收货地址">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- addAddress -->
        <section class="addAddressSection">
            <el-form :model="queryData.addAddress" :rules="rules" ref="dataForm" class="demo-ruleForm">
                <div class="from">
                    <el-form-item prop="name">
                        <el-input v-model="queryData.addAddress.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="consigeephone">
                        <el-input v-model="queryData.addAddress.consigeephone" placeholder="请输入电话"></el-input>
                    </el-form-item>
                    <SelectAddress
                        @Province="getProvince"
                        @City="getCity"
                        @District="getDistrict"
                        :provinceProp="queryData.addAddress.province"
                        :cityProp="queryData.addAddress.city"
                        :areaProp="queryData.addAddress.area"
                    ></SelectAddress>
                    <span class="add-address-tips" v-if="addAddressTips">请添加地址</span>
                    <el-form-item prop="address">
                        <el-input v-model="queryData.addAddress.address" placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                    <div class="SetToDefault">
                        <mt-switch v-model="value" v-if="$route.params.id == 0">设为默认</mt-switch>
                    </div>
                </div>
            </el-form>
            <div class="submitView">
                <!-- <mt-button type="primary" size="large" @click="confirmSubmission">确认提交</mt-button> -->
                <mt-button 
                    type="primary" 
                    size="large" 
                    @click="$route.params.id != 0 ? editConfirmSubmission() : confirmSubmission()"
                >
                    确认提交
                </mt-button>
            </div>
        </section>
    </div>
</template>
<script>
import SelectAddress from '@/components/selectAddress/selectAddress'
import { getServer} from '@/api/index'
import { Toast } from 'mint-ui';
import {checkPhone} from '@/utils/verification'
import response from '@/assets/js/response.js'
export default {
    // name: "mallAddAddress",
    data() {
        return {
            addAddressTips: false,
            addressDetails: "",
            value: false,
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                consigeephone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkPhone,  trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入详细信息', trigger: 'blur' },
                ]
            },
            queryData: {
                addAddress: {
                    requestType: 'operating', 
                    requestKeywords: 'shippingaddr', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid, 
                    userPhone: this.$store.state.user.uphone, 
                    name: "", 
                    consigeephone: "", 
                    province: "", 
                    city: "", 
                    area: "", 
                    address: "", 
                    defaultState: ""
                },
                editInfo: {
                    requestType: 'personal', 
                    requestKeywords: 'getshipping', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid, 
                    userPhone: this.$store.state.user.uphone,
                    id: this.$route.params.id
                },
                // editAddress: {
                //     requestType: 'operating', 
                //     requestKeywords: 'editshippingaddress', 
                //     id: "", 
                //     name: "", 
                //     consigeephone: e.detail.value.tel, 
                //     province: e.detail.value.provinces, 
                //     city: e.detail.value.city, 
                //     area: e.detail.value.area, 
                //     address: e.detail.value.address
                // }
            }
        };
    },
    methods: {
        confirmSubmission () {
            // console.log(this.$route.params.id)
            if( this.queryData.addAddress.province == "" ) {
                this.addAddressTips = true
                this.$refs['dataForm'].validate((valid) => {})
            } else {
                this.addAddressTips = false
                this.$refs['dataForm'].validate((valid) => {
                    if( valid ) {
                        if( this.value ) {
                            this.queryData.addAddress.defaultState = "1"
                        } else {
                            this.queryData.addAddress.defaultState = "2"
                        }
                        getServer(this.queryData.addAddress).then( res => {
                            // console.log(response[res.data.responseStatus])
                            if( res.data.responseStatus === 1 ) {
                                Toast('添加地址成功')
                                setTimeout(() => {
                                    this.$router.go(-1)
                                }, 800);
                            }
                        })
                    }
                })
            }
        },
        editInfo () {
            getServer(this.queryData.editInfo).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.queryData.addAddress.name = res.data.data.name
                    this.queryData.addAddress.consigeephone = res.data.data.phone
                    this.queryData.addAddress.province = res.data.data.province
                    this.queryData.addAddress.city = res.data.data.city
                    this.queryData.addAddress.area = res.data.data.area
                    this.queryData.addAddress.address = res.data.data.address
                }
            })
        },
        editConfirmSubmission() {
            console.log("编辑")
            if( this.queryData.addAddress.province == "" ) {
                this.addAddressTips = true
                this.$refs['dataForm'].validate((valid) => {})
            } else {
                this.addAddressTips = false
                this.$refs['dataForm'].validate((valid) => {
                    if( valid ) {
                        console.log(123)
                        if( this.value ) {
                            this.queryData.addAddress.defaultState = "1"
                        } else {
                            this.queryData.addAddress.defaultState = "2"
                        }
                        this.queryData.addAddress.id = this.$route.params.id
                        this.queryData.addAddress.requestKeywords = "editshippingaddress"
                        console.log(this.queryData.addAddress)
                        getServer(this.queryData.addAddress).then( res => {
                            console.log(response[res.data.responseStatus])
                            if( res.data.responseStatus === 1 ) {
                                Toast('编辑地址成功')
                                setTimeout(() => {
                                    this.$router.go(-1)
                                }, 800);
                            }
                        })
                    }
                })
            }      
        },
        getProvince (province) {
            this.queryData.addAddress.province = province
        },
        getCity (city) {
            this.queryData.addAddress.city = city
        },
        getDistrict (district) {
            this.queryData.addAddress.area = district
        }
    },
    created () {
        this.editInfo()
    },
    components:{
      SelectAddress  
    }
};
</script>
<style lang="scss">
    .add-address-tips {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        margin-top: -20px;
        // padding-left: .2rem;
        display: block;
    }
    .add-address .from {
        padding: 0 .2rem;
    }
    .add-address .el-input {
        border-bottom: .02rem solid #DCDFE6;
    }
    .add-address .el-input__inner {
        border: none;
        font-size: .26rem;
        height: .6rem;
        line-height: .6rem;
    }
    .addAddressSection{
        width:100%;
        height:100%;
        position: fixed;
        left:0;
        bottom:0;
        // padding-top: .8rem;
        // margin-top: .8rem;
        top: .8rem;
        // background: #fff;
    } 
   .submitView{
       padding:15px;
   }
   .SetToDefault{
       font-size:16px;
       padding:15px;
   }
</style>