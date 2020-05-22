<template>
  <div class="long-list-box">
    <!-- 头部 -->
    <slot name="header"></slot>
    <div class="long-list-container" ref="container">
      <div ref="container-top-box" :style="topContainerStyle"></div>
      <!-- 中间元素 -->
      <template v-for="(item, i) in currentList">
        <div
          :key="`current-list-item-${i}`"
          :ref="i | transformRef(currentList)"
        >
          <slot :data="item" />
        </div>
      </template>

      <!-- 支撑底部容器高度 -->
      <div :style="bottomContainerStyle" ref="container-bottom-box"></div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    transformRef(item, val) {
      if (item === 1) {
        return 'container-first-item';
      } else if (item === val.length - 1) {
        return 'container-last-item';
      }
    },
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
    // 分页条数
    pageSize:{
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      // 当前分页
      pageIndex: 1,
      // item的高度
      itemHeight: 0,
      // 当前渲染的列表数据
      currentList: [],
      // 判断当前是不是移动设备
      isMobile : /\s+Mobile\/.+/.test(window.navigator.userAgent),
      // 开关（避免在向下滚动时触发到上容器的可见）
      valve: false
    };
  },

  watch: {
    list: {
      handler() {
        this.currentList = this.list.slice(0, this.pageSize);
        this.$nextTick(() => {
          this.$options.mounted.forEach((item) => {
            item.call(this);
          });
        });
      },
      deep: true,
    },
  },

  computed: {
    
    // 当前item的总高度
    currentListHeight() {
      return this.currentList.length * this.itemHeight || 0;
    },

    // 容器的总高度
    totalHeight() {
      return this.list.length * this.itemHeight || 0;
    },

    // 翻页后数据的总高度
    topContainerHeight(){
      return  ((this.pageIndex - 1) * this.pageSize) * this.itemHeight
    },

    // 底部容器的高度
    bottomContainerStyle(){
      return {
        height: this.totalHeight - this.currentListHeight - (this.topContainerHeight / 2) + 'px' || '0px',
      };
    },
    // 顶部容器的高度
    topContainerStyle(){
      return {
        height: this.topContainerHeight / 2 +'px'
      }
    }
  },

  mounted() {
    const refs =
      this.$refs['container-first-item'] &&
      this.$refs['container-first-item'][0];

    // 计算容器内 item 的总高度
    if (refs) {
      this.itemHeight = this.handlerCalcHeight(
        this.$refs['container-first-item'][0]
      );
      this.$nextTick(()=>{
        this.handlerBottom()
        this.handlerTop()
      });
    }
  },

  methods: {

    // 计算高度
    handlerCalcHeight(target) {
      const itemHeight = window.getComputedStyle(target).height;
      return +itemHeight.match(/^\d+/)[0];
    },
    // 顶部的支撑容器可见
    handlerTop:( () => {
      let observe = null;
      return function handlerTop(){
        observe = observe || new IntersectionObserver(([entris]) => {
          if(entris.isIntersecting && this.valve &&  entris.boundingClientRect.height > 0){
            this.pageIndex-=1;
            const INDEX = (this.pageIndex - 1) * this.pageSize  / 2
            this.currentList = (
              this.list.slice(
                INDEX,
                INDEX + this.pageSize
              )
            );
          }
        })
        observe.observe(this.$refs['container-top-box'])
      }
    })(),
    // 底部的支撑容器可见
    handlerBottom: ( () => {
      let observe = null;
      let handler = null
      return function handlerBottom() {
        observe =
          observe ||
          new IntersectionObserver(([entris]) => {
            if (entris.isIntersecting ) {
              // 节流阀
              if(!handler){
              handler = setTimeout(()=>{
                this.pageIndex += 1;
                  const INDEX = (this.pageIndex - 1) * this.pageSize  / 2
                  this.currentList = (
                    this.list.slice(
                      INDEX,
                      INDEX + this.pageSize
                    )
                  );
                  this.$refs['container'].scrollTop  -= this.currentListHeight / 2 
                  setTimeout(()=>{
                    if(!this.isMobile){
                      // 移动端的浏览器上存在bug
                    }
                    // 设置开关
                    this.valve = true
                    handler = null
                  },0)
              },60)
              }
            }
          });
        observe.observe(this.$refs['container-bottom-box']);
      };
    })(),
  },
};
</script>

<style>
.long-list-box {
  width: 100%;
}

.long-list-box > .long-list-container {
  background: #f0f0f0;
  width: 100%;
  height: 600px;
  overflow: auto;
  -webkit-overflow-scrolling:touch;  
}
</style>
