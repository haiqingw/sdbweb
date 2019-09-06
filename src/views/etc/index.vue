
<template>
    <div class="etc">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>ETC</span>
        </div>
        <div class="bin-img">
            <img src="@/assets/images/etc-big-img.jpg" alt />
        </div>
        <div class="etc-list">
            <ul>
                <li
                    @click="ETC('https://m.hhrcard.com/credit/miniprogram/copartner/cardlist?invitecode=12443774&bank_id=1019&oas=1&platform_id=1002')"
                >
                    <img src="@/assets/images/gh-bg.jpg" alt />
                </li>
                <li
                    @click="ETC('http://brksh5.payhc.cn/pages/homepage/applyandsignin.html?appuuid=58e0131e3d674041978e76f49b29d1c3&authorization=1974172_3ad2aa7e38ce44398ec67b9bb4c0d38c&bankId=200013&bankCardId=705693&authflag=authflag')"
                >
                    <img src="@/assets/images/jh-bg.jpg" alt />
                </li>
                <li
                    @click="ETC('http://brksh5.payhc.cn/pages/homepage/applyandsignin.html?appuuid=58e0131e3d674041978e76f49b29d1c3&authorization=1974172_3ad2aa7e38ce44398ec67b9bb4c0d38c&bankId=200013&bankCardId=809064&authflag=authflag')"
                >
                    <img src="@/assets/images/nh-bg.jpg" alt />
                </li>
                <li
                    @click="ETC('http://brksh5.payhc.cn/pages/homepage/applyandsignin.html?appuuid=58e0131e3d674041978e76f49b29d1c3&authorization=1974172_3ad2aa7e38ce44398ec67b9bb4c0d38c&bankId=200013&bankCardId=809853&authflag=authflag')"
                >
                    <img src="@/assets/images/jth-bg.jpg" alt />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        ETC(url) {
            if (url) {
                window.location.href = url;
            }
        }
    }
};
</script>

<style>
.etc {
    background: #3e3c3d;
    padding-bottom: 0.2rem;
}
.bin-img {
    margin-top: 0.8rem;
    margin-bottom: 0.3rem;
}
.etc-list {
    padding: 0 0.2rem;
}
.etc-list ul li {
    margin-bottom: 0.3rem;
}
</style>