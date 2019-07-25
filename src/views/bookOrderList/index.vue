<template>
    <div class="bookOrderListContainer">
          <!-- header -->
        <div class="return">
            <router-link to="/mine"><img src="@/assets/images/return.png" alt="" /></router-link>
            <span>订货订单</span>
        </div>
        <div class="myOrderListMain">
            <ul class="myOrderListUl">
                <li>
                    <div class="myOrderListHeader line_bottom">
                        <span>海科融通支付通Q-pos</span>
                        <em>待付款</em>
                    </div>
                    <div class="myOrderListBody line_bottom">
                        <div>
                            <p>产品：鼎刷鼎POS</p>
                             <p>
                                <span>订货数量</span>
                                <em>x 10台</em>
                            </p>
                             <p>
                                <span>支付金额</span>
                                <em>
                                    <b>￥</b>
                                    <i>0.00</i>
                                </em>
                            </p>
                        </div>
                    </div>
                    <div class="myOrderListAddressMain line_bottom">
                        <h3>收货信息</h3>
                        <div class="myOrderListAddressBox">
                            <div class="myOrderListAddressTop">
                                <span>任勇强</span>
                                <span>13296905340</span>
                            </div>
                            <div class="myOrderListAddressSub">
                                内蒙古呼和浩特市新城区兴安北路鼎盛华世纪广场10005懒人科技
                            </div>
                        </div>
                    </div>
                    <div class="myOrderListOtherInfoMain line_bottom">
                        <h3>其他信息</h3>
                        <div>
                            <p>订单编号：4545612314567</p>
                            <p>下单时间：2019-07-25 12:00:00</p>
                            <p>发货时间：2019-07-25 12:00:00</p>
                        </div>
                    </div>
                    <div class="myOrderListFooter">
                        <a href="javascript:;">付款</a>
                        <a href="javascript:;">发货</a>
                        <a href="javascript:;">取消</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss">
.myOrderListMain{
    padding-top:0.8rem;
}
.myOrderListUl li {
  background: #fff;
  margin-bottom: 10px;
  padding: 0 10px;
  border-bottom:5px solid #f1f1f1;
}
.myOrderListHeader {
  overflow: hidden;
  height: 40px;
  line-height: 41px;
}
.myOrderListHeader > span {
  float: left;
  font-size:16px;
}
.myOrderListHeader > em {
  float: right;
  color: #f33;
  font-size:14px;
}
.myOrderListBody {
  overflow: hidden;
  padding: 12px 0 10px;
}
.myOrderListBody > div p {
  font-size: 14px;
  overflow: hidden;
}
.myOrderListBody > div p span {
  float: left;
  font-size: 14px;
}
.myOrderListBody > div p em {
  float: right;
  color: #f55f22;
}
.myOrderListBody > div p b {
  font-size: 12px;
}
.myOrderListBody > div p i{
    font-size:18px;
    font-weight:bold;
}
.myOrderListBody > div p:nth-of-type(2) {
  font-size: 14px;
  line-height: 28px;
  padding-top: 3px;
}
.myOrderListBody > div p:nth-of-type(2) b {
  color: #f55f22;
}
.myOrderListBody > div p:nth-of-type(2) i {
  color: #f55f22;
  font-size: 18px;
}
.myOrderListBody > div p:nth-of-type(3) {
  padding-top: 3px;
}
.myOrderListFooter {
  overflow: hidden;
  text-align: center;
  padding: 10px 0;
}
.myOrderListFooter > a {
  padding: 0 20px;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  display: block;
  float: right;
  box-sizing: border-box;
  margin-left: 10px;
  color:#fff;
  &:nth-of-type(1){
      background:#f33;
  }
  &:nth-of-type(2){
      background:#089cfe;
  }
  &:nth-of-type(3){
     background:#ccc;
  }
}
.myOrderListAddressMain{
    padding-bottom:11px;
    h3{
        line-height:40px;
        font-size:14px;
        font-weight:bold;
    }
   .myOrderListAddressTop{
       display:flex;
       justify-content: space-between;
       height:14px;
       align-items:center;
       span{
           font-size:14px;
       }
   } 
   .myOrderListAddressSub{
       padding-top:5px;
       line-height:18px;
       font-size:14px; 
       text-align:justify; 
   }
}
.myOrderListOtherInfoMain{
   padding-bottom:11px;
  h3{
        line-height:40px;
        font-size:14px;
        font-weight:bold;
    }  
    div{
        p{
            font-size:14px;
            line-height:20px;
        }
    }
}
</style>