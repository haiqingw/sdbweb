
<template>
    <div class="share-view">
        <!-- swiper -->
        <swiper :options="swiperOption">
            <swiper-slide v-for="item in renderData.share" :key="item">
                <img :src="item" alt="">
            </swiper-slide>
            <!-- <swiper-slide v-for="item in renderData.share" :key="item">
                <img src="@/assets/images/bg.jpg" alt="">
            </swiper-slide> -->
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
        <Footer></Footer>
    </div>
</template>


<script>
import {getServer} from "@/api/index";
import response from "@/assets/js/response.js";
import Footer from "@/components/footerNav/footer";
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
    data() {
        return {
            queryData: {
                share: {
                    requestType: "sharecode",
                    requestKeywords: "qrcode",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            },
            renderData: {
                share: []
            },
            // swiperOption: {
            //     observer: true, //修改swiper自己或子元素时，自动初始化swiper
            //     observeParents: true, //修改swiper的父元素时，自动初始化swiper
            //     effect: "coverflow",
            //     grabCursor: true,
            //     centeredSlides: true,
            //     slidesPerView: "auto",
            //     coverflowEffect: {
            //         rotate: 50,
            //         stretch: 0,
            //         depth: 100,
            //         modifier: 1,
            //         slideShadows: true
            //     },
            //     pagination: {
            //         el: ".swiper-pagination"
            //     }
            // }
            swiperOption: {
                autoplay: 3000,
                slidesPerView: 1.2,
                loop: true,
                spaceBetween: 10,
                centeredSlides: true,
            }
        };
    },
    components: {
        Footer
    },
    methods: {
        shareFunc() {
            // console.log(this.queryData.share)
            getServer(this.queryData.share).then(res => {
                // console.log(res.data)
                if( res.data.responseStatus === 1 ) {
                    this.renderData.share = res.data.qrcode;
                } 
            });
        },
    },
    mounted() {
　　    this.$nextTick(function(){  
    　　})
    },
    created() {
        this.shareFunc()
    }
};
</script>

<style>
/* body {
    padding-bottom: 1.6rem;
} */
.share-view {
    margin-top: 0.38rem;
    height: 11rem;
    padding-bottom: 1.4rem;
    background: #fff;
}
.share-view .swiper-wrapper img {
    height: 100%;
}
.swiper-inner {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
}
.share-view  .swiper-slide {
    background-position: center;
    background-size: cover;
    /* width: 6rem !important; */
    height: 11rem;
}
</style>


