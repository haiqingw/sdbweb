

<template>
    <div class="advertisement">
        <img src="@/assets/images/advertisement.png" alt />
        <div class="btn">
            <a href="tel:0471-3484527">一键拨号(0471-3484527)</a>
        </div>
    </div>
</template>

<style>
.advertisement img {
    margin-bottom: 1rem;
}
.advertisement .btn {
    background: #ffff00;
    color: #061b3a;
    font-size: .3rem;
    position: fixed;
    left: 0;
    bottom: 0;
    line-height: 1rem;
    text-align: center;
    width: 100%;
}
.advertisement .btn a {
    color: #061b3a;
    background: url(../../assets/images/advertisement-phone-ico.png) no-repeat left center;
    background-size: 10%;
    padding: .2rem 0;
    padding-left: .5rem;
}
</style>