<template>
    <van-goods-action class="detail-bottom-bar">
        <van-goods-action-icon icon="chat-o" text="客服"/>
        <van-goods-action-icon icon="shop-o" text="店铺"/>
        <van-goods-action-button color="#be99ff" type="warning" text="加入购物车"/>
        <van-goods-action-button color="#7232dd" type="danger" text="立即购买"/>
    </van-goods-action>
</template>

<script>
    export default {
        name: "DetailBottomBar"
    }
</script>

<style lang="less" scoped>
    .detail-bottom-bar {
        box-shadow:1px 0 5px rgba(55,55,55,.2);
        background-color: #fff;
        position: fixed;
        height: 49px;
        bottom: 0px;
        left: 0px;
        right: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        .van-goods-action-icon {
            flex: 2;
        }
        .van-goods-action-button {
            flex: 3;
        }
    }
</style>