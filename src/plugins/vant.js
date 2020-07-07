import Vue from 'vue'
import 'vant/lib/button/style';

// 在这里引入你所需的组件
import {
    Swipe,
    SwipeItem,
    Lazyload,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
} from 'vant'

// 按需引入UI组件
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
