<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    //创建BS对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    //监听滚动位置
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
      // console.log(position);
    })

    //监听上拉事件

    // this.scroll.on('pullingUp', () => {
    //   console.log('上拉加载');
    //   this.$emit('pullingUp')
    // })
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('到底部了');
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo (x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style>

</style>