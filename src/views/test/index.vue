

<template>
    <div>
        <van-pull-refresh
            v-model="isDownLoading"
            @refresh="onDownRefresh"
        >
            <van-list
                v-model="isUpLoading"                 
                :finished="upFinished"
                finished-text="没有跟多了"
                :offset= "offset"
                @load="onLoadList"
            >
                <div class="list-item">
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div><div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div><div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div><div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                    <div>123</div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>


<script>
export default {
    data () {
        return {
            isDownLoading: false,//下拉刷新
            isUpLoading: false,//上拉加载
            upFinished: false,//上拉加载完毕
            offset: 50,//滚动条与底部距离小于 offset 时触发load事件
            isData: true,
        }
    },
    methods: {
        onLoadList(){
            this.isUpLoading = true
            console.log("上滑加载")
            setTimeout( () => {
                this.isUpLoading = false
            }, 1000)
        },
        onDownRefresh(){
            console.log("下拉刷新")
            setTimeout( () => {
                this.isDownLoading = false
            }, 1000)
        }
    }
}
</script>

<style>
.list-item {
    /* height: 1000px;
    overflow: auto; */
}
</style>




