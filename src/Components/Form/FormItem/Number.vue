<template>
  <div class="form-item-number-box">
    <InputNumber 
      class="form-item-number"
      :title='formData[modelBin]'
      v-model="formData[modelBin]"
      :placeholder="options.placeholder"
      :disabled='options.disabled'
      :size="size"
      :clearable='options.clearable'
      :controls='false'
      @focus="() => hanldeEmit('handleFocus')"
      @blur="() => hanldeEmit('handleBlur')"
    />
    <!-- 清除图标 -->
    <div v-show="showCloseIcon" class="clear-icon el-icon-circle-close" @click.stop="handleClear"></div>
  </div>
  
</template>

<script>

import { InputNumber } from 'element-ui'

export default {
  inject: {
    emit: {
      from: 'emit',
      default: () => {}
    },
    size: ['size']
  },

  props: {
    formData: {
      type: Object,
      required:true
    },

    modelBin: {
      type: String,
      required: true
    },

    options: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      showCloseIcon: false
    }
  },
  components: {
    InputNumber
  },
  methods:{
    /**
     * 向上传递事件
     */
    hanldeEmit(emitName){
      const beforeEvent = {
        handleFocus: () => this.showCloseIcon = true,
        handleBlur: () => setTimeout(() => {
          this.showCloseIcon = false
        }, 300)
      }
      beforeEvent[emitName] && beforeEvent[emitName]()

      this.emit(
        emitName, 
        {
          target: this.modelBin, data: this.formData[this.modelBin]
        }
      )
    },
    /**
     * 清空数据
     */
    handleClear(){
      this.formData[this.modelBin] = ''
    }
  }
}
</script>

<style lang='scss'>
.form-item-number-box{
  position: relative;
  .form-item-number{
    width: 100%;
    input {
      text-align: left !important;
    }
  }
  .clear-icon{
    &:hover{
      color: #C0C4CC;
    }
    cursor: pointer;
    color: #C0C4CC;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(-50%, -80%);
    z-index: 212312;
  }
}

</style>