<template>
  <div class="resizeble-box">
    <div class="resizable-transtion">
      <div class="resizable">
        <!-- header -->
        <div class="resizable-header">
          <!-- 标题 -->
          <template v-if="title">
            <div>{{ title }}</div>
          </template>
          <template v-else-if="$slots.title">
            <slot name="title"></slot>
          </template>
          <!-- 关闭图标 -->
          <div @click.stop="handlerClose" class="resizable-close"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { registerResizable } from '@/utils/index.ts';
export default {
  mounted() {
    registerResizable({
      element: document.querySelector('.resizable'),
      minwidth: 140,
      minheight: 140,
    });
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    /**
     * 关闭弹窗
     */
    handlerClose() {
      this.$emit('handleClose');
    },
  },
  name: 'Zoom',
};
</script>
<style lang="scss">
.resizeble-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  .resizable-transtion {
    .resizable {
      border: 1px #ccc solid;
      height: 200px;
      width: 200px;
      position: relative;
      .resizable-header {
        position: relative;
        width: 100%;
        height: 50px;
        .resizable-close {
          position: absolute;
          right: 20px;
          top: 20px;
          cursor: pointer;
          display: inline-block;
          width: 15px;
          height: 2px;
          background: #999797;
          transform: rotate(45deg);
          &::after {
            content: '';
            display: block;
            width: 15px;
            height: 2px;
            background: #999797;
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
}

.resizable-se {
  right: 1px;
  bottom: 1px;
  position: absolute;
  z-index: 2500;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 10px solid #8a8a8a;
  border-left: 10px solid #ffffff;
  cursor: nwse-resize;
  &:hover {
    border-bottom-color: #4a77f3;
  }
}
.xy-component-zoom {
  position: fixed;
  width: 100vw;
  height: 100vh;

  .xy-component-zoom-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border: 1px solid #000;
    box-sizing: border-box;
  }
}
</style>
