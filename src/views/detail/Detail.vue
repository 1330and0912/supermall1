<template>
    <div id="detail">

        <detail-nav-bar @titleClick="titleClick" ref="navbar"/>
        <scroll :probe-type="3" @scroll="scrollTo" class="contant" ref="scroll">
            <detail-swiper :swiper-image="swiperImage"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info ref="goods" :detail-info="detailInfo"/>
            <detail-params-info ref="params" :item-params="itemParams"/>
            <detail-comment-info ref="comment" :rate="rate"/>
            <div class="recommend-wrap" ref="recommend">
                <header>推荐商品</header>
                <goods-list class="recommend" :goods-list="recommend"/>
            </div>
        </scroll>
        <detail-bottom-bar/>
    </div>
</template>

<script>
    import DetailNavBar from './childrenComponents/DetailNavBar'
    import DetailSwiper from './childrenComponents/DetailSwiper'
    import DetailBaseInfo from './childrenComponents/DetailBaseInfo'
    import DetailShopInfo from './childrenComponents/DetailShopInfo'
    import DetailGoodsInfo from './childrenComponents/DetailGoodsInfo'
    import DetailParamsInfo from './childrenComponents/DetailParamsInfo'
    import DetailCommentInfo from './childrenComponents/DetailCommentInfo'
    import DetailBottomBar from './childrenComponents/DetailBottomBar'


    import GoodsList from 'components/content/goods/GoodsList'

    import {getDetail, Goods, Shop, getRecommend} from "network/detail";

    import {debounce} from "common/utils";
    import Scroll from "components/common/scroll/Scroll";

    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamsInfo,
            DetailCommentInfo,
            DetailBottomBar,
            GoodsList,
            Scroll
        },
        props: ['id'],
        data() {
            return {
                iid: null,
                swiperImage: [],
                goods: {},
                shop: {},
                detailInfo: {},//商品详情信息
                itemParams: {//商品参数信息
                    info: [],
                    sizes: []
                },
                rate: {},//评论信息,
                recommend: [],
                themeTopY: [],
                imgCount: 0,
            }
        },
        created() {
            this.iid = this.id

            //推荐栏信息
            getRecommend().then(
                res => {
                    this.recommend = res.data.list
                }
            )
            getDetail(this.iid).then(res => {
                //console.log(res)

                //商品详情数据
                const {result: data} = res

                //轮播图图片
                this.swiperImage = data.itemInfo.topImages

                //商品数据
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                //店铺信息
                this.shop = new Shop(data.shopInfo)

                // 商品详细信息
                this.detailInfo = data.detailInfo

                //商品参数
                this.itemParams.info = data.itemParams.info.set
                this.itemParams.sizes = data.itemParams.rule.tables

                // 商品评论数据
                this.rate = data.rate

            })

        },
        mounted() {
            this.$nextTick(() => {
                this.imgLoad()
            })
        },
        watch: {
            imgCount(newValue) {
                this.themeTopY = [];
                this.themeTopY.push(0);
                this.themeTopY.push(this.$refs.params.$el.offsetTop)
                this.themeTopY.push(this.$refs.comment.$el.offsetTop)
                this.themeTopY.push(this.$refs.recommend.offsetTop)
                this.themeTopY = this.themeTopY.map(item => item - 44)
                this.themeTopY[0] = 0;
            }
        },
        methods: {
            imgLoad() {
                let refresh = debounce(this.$refs.scroll.refresh, 100)
                let debounceGetThemeTopY = debounce(this.getThemeTopY, 100)
                this.$bus.$on('imgLoad', () => {
                    refresh && refresh()
                    this.imgCount++
                    //console.log(this.$refs.recommend.offsetTop)
                })
            },
            titleClick(index) {
                this.$refs.scroll.scrollTop(0, -this.themeTopY[index], 0)
            },
            scrollTo({y}) {
                y = -y
                if (y >= this.themeTopY[0] && y < this.themeTopY[1]) {
                    this.$refs.navbar.currentIndex = 0
                } else if (y >= this.themeTopY[1] && y < this.themeTopY[2]) {
                    this.$refs.navbar.currentIndex = 1
                } else if (y >= this.themeTopY[2] && y < this.themeTopY[3]) {
                    this.$refs.navbar.currentIndex = 2
                } else if (y >= this.themeTopY[3]) {
                    this.$refs.navbar.currentIndex = 3
                }
                console.log(this.$refs.scroll.scroll.movingDirectionY);
            }
        }
    }
</script>

<style scoped>
    #detail {
        display: revert;
        z-index: 99991;
        margin-top: 44px;
        height: 100vh;
    }

    .contant {
        height: calc(100% - 88px);
    }

    .recommend-wrap {
        padding: 0 5px;
    }

    header {
        margin: 10px;
    }

    .recommend {
        margin-top: 20px;
    }
</style>