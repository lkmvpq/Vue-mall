<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @itemClick="itemClick" :current-index="currentIndex"></detail-nav-bar>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll" 
            :probe-type="3">
    <detail-swiper :images="topImage"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
    <good-list ref="recommend" :goods="recommends"></good-list>
    
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodList from "components/content/goods/GoodsList"
import DetailBottomBar from "./childComps/DetailBottomBar"
import BackTop from "components/content/backTop/BackTop"

// import Toast from 'components/common/toast/Toast'

import Scroll from "components/common/scroll/Scroll"

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail'
import {debounce} from "components/common/utils"
import {itemListenerMixin} from "common/mixin"
import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      currentIndex: 0,
      themeTopYs: [],
      isShowBackTop: false
    }
  },
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  created () {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      this.topImage = data.itemInfo.topImages
      //获取商品信息
      // this.goods = new Goods(data.itemInfo, data.columns, data.itemInfo.services)
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //保存商品详情数据
      this.detailInfo = data.detailInfo

      // 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //评论
      if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
    }),
      getRecommend().then((res, error) => {
          // console.log(res);
          this.recommends = res.data.list;
          if (error) return
          this.recommendList = res.data.list
        })
  },
  mounted () {
   
  },
  methods: {
    ...mapActions({
      addCart: 'addCart'
    }),
    getThemeTopY ()  {
        // console.log('----');
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },
    imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
    },
    itemClick (index) {
      console.log(index)
      this.currentIndex = index
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll (position) {
      // console.log(position);
      //获取Y值
      const getThemeTopY = -position.y
      //和themeTopYs对比
      let length = this.themeTopYs.length
      // console.log(length);
      // for (let i =0; i < length; i++) {
      //   if (i < length - 1 && getThemeTopY >= this.themeTopYs[i] && getThemeTopY 
      //   < this.themeTopYs[i+1] 
      //   || (i === length - 1 && getThemeTopY >= this.themeTopYs[i])) {
      //     // console.log(i);
      //     this.currentIndex = i
      //   }
      // }
      for (let i =0; i < length - 1; i++) {
        if(this.currentIndex !== i && 
        (getThemeTopY >= this.themeTopYs[i] && getThemeTopY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
        }
      }
      this.isShowBackTop = (-position.y) >1000

    },
    backClick () {
    this.$refs.scroll.scrollTo(0, 0, 500)
   },
  addToCart () {
    //获取信息
    // 1.创建对象
    const obj = {}
    // 2.对象信息
    obj.iid = this.iid;
    obj.imgURL = this.topImage[0]
    obj.title = this.goods.title
    obj.desc = this.goods.desc;
    obj.newPrice = this.goods.nowPrice;
    // console.log(obj);
    //把商品添加
    // this.$store.commit('addCart', obj)
    // this.$store.dispatch('addCart', obj).then(() => {
    //   console.log(res);
    // })
    this.addCart(obj).then((res) => {
      this.$toast.show(res, 1000)
      // console.log(res);
    })

   }

  }
  
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .nav-bar {
    position: relative;
    z-index: 9;
    margin-top: -1px;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>