import {debounce} from "components/common/utils"

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null
    }
  },
  mounted () {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {refresh()}
    this.$bus.$on('itemImgLoad',this.itemImgListener)
    // console.log('混入的东东');
  }
}