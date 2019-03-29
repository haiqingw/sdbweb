
<template>
    <div class="share-view">
      <!-- swiper -->
        <swiper :options="swiperOption">
            <swiper-slide v-for="item in renderData.share" :key="item">
                <img :src="item" alt="">
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
    </div>
</template>


<script>
    import {share} from '@/api/share'
    import response from '@/assets/js/response.js'
    import { Indicator } from 'mint-ui'
    export default {
        data() {
            return {
                queryData: {
                    share: {
                        requestType:'personal',
                        requestKeywords:'getqrcode',
                        platformID: this.$store.state.user.pid,
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone
                    }
                },
                renderData: {
                    share: []
                },
                swiperOption: {
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows : true
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            }
        },
        // computed: {
        //     swiper() {
        //         return this.$refs.mySwiper.swiper
        //     }
        // },
        methods: {
            shareFunc() {
                Indicator.open()
                share(this.queryData.share).then( res => {
                    // console.log(res)
                    if(res.data.responseStatus === 1) {
                         Indicator.close()
                        this.renderData.share = res.data.qrcode
                    }
                })
            },
            parentImplement() {
                this.renderData.share = []
                this.shareFunc()
            }
        },
        mounted () {
            // this.$nextTick(function () {// })
        },
       
        created() {
            
        }
    }
</script>

<style>
/* body {
    padding-bottom: 1.6rem;
} */
.share-view {
    margin-top: .38rem;
}
.share-view img {
    height: 11rem;
}
.swiper-inner {
    width: 100%;
    height: 11rem;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 11rem;
  }

</style>


