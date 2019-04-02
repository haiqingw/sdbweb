

<template>
    <div class="my-terminal">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="backOff"/>
            <span>我的终端</span>
        </div>
        <div class="my-terminal-choice">
            <el-select v-model="byProduct.value" placeholder="请选择" @change="byProductChange">
                <el-option
                v-for="item in byProduct.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="usageState.value" placeholder="请选择" @change="usageStateChange">
                <el-option
                v-for="item in usageState.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="byBatch.value" placeholder="请选择" @change="byBatchChange">
                <el-option
                v-for="item in byBatch.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="my-terminal-list">
            <ul>
                <li>
                    <div class="name-state">
                        <h3>闪POS</h3>
                        <el-tag type="danger">未使用</el-tag>
                    </div>
                    <div class="terminal-number">
                        000000000000000000000
                    </div>
                    <div class="time-batch">
                        <time>2000-00-00 00:00:00</time>    
                        <span>PC001</span>
                    </div>
                </li>
                <li>
                    <div class="name-state">
                        <h3>闪POS</h3>
                        <el-tag type="success">已使用</el-tag>
                    </div>
                    <div class="terminal-number">
                        000000000000000000000
                    </div>
                    <div class="time-batch">
                        <time>2000-00-00 00:00:00</time>    
                        <span>PC001</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                byProduct: {
                    options: [
                        {   
                            value: "1",
                            label: '黄金糕'
                        }, 
                        {   
                            value: "2",
                            label: '黄金糕'
                        }, 
                        {
                            value: "3",
                            label: '黄金糕'
                        }, 
                    ],
                    value: ''
                },
                usageState: {
                    options: [
                        {
                            value: "1",
                            label: '已使用'
                        }, 
                        {
                            value: "2",
                            label: '未使用'
                        }, 
                    ],
                    value: ''
                },
                byBatch: {
                    options: [
                        {
                            value: "1",
                            label: '黄金糕'
                        }, 
                    ],
                    value: ''
                }
            }
        },
        methods: {
            backOff () {
                this.$router.go(-1)
            },
            byProductChange () {
                
            },
            usageStateChange () {

            },
            byBatchChange (){
                
            }
        }
    }
</script>

<style>
.my-terminal .my-terminal-choice {
    display: flex;
    font-size: 0.28rem;
    text-align: center;
    line-height: .4rem;
    padding: .1rem 0;
}
.my-terminal .my-terminal-choice .el-select {
    flex: 1;
    background: url(../../assets/images/my-terminal-choice-drop-down.png) no-repeat 2rem center;
    background-size: 10%;
}
.my-terminal .my-terminal-choice .el-select input {
    border: none;
}
.my-terminal .mint-popup {
    width: 100%;
}
.my-terminal .mint-popup .picker-slot.picker-slot-right {
    text-align: center;
}
.my-terminal-list {
    margin-top: 0.1rem;
}
.my-terminal-list ul {
    padding: 0 .2rem;
}
.my-terminal-list ul li {
    padding: .2rem;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    margin-bottom: .3rem;
}
.my-terminal-list ul li .name-state {
    overflow: hidden;
}
.my-terminal-list ul li .name-state h3 {
    float: left;
    font-size: 0.3rem;
    line-height: 0.6rem;
    color: #303133;
}
.my-terminal-list ul li .name-state span {
    float: right;
}
.my-terminal-list ul li .terminal-number {
    font-size: .4rem;
    text-align: center;
    color: #FF3300;
    font-weight: normal;
    padding: .3rem 0;
}
.my-terminal-list ul li .time-batch {
    overflow: hidden;
    color: #ccc;
    font-size: 0.26rem;
    line-height: 0.4rem;
}
.my-terminal-list ul li .time-batch time {
    float: left;
}
.my-terminal-list ul li .time-batch span {
    float: right;
}
</style>


