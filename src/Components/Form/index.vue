<template>
  <div>
    <Form 
      :model="formData" 
      :rules='rules'
    >
      <div 
        v-for="(value, key) of groupFormConfig" 
        :key="`group_${key}`"
        :class="`form-group-${key}`"
      >
        <FormItem v-for="(cvalue, cindex) of value" 
          :formData='formData'
          :options='cvalue' 
          :modelBin='cvalue.modelBin'  
          :key="`form-group-item-${cindex}`"
        />
      </div>
    </Form>
  </div>
</template>

<script>

import { Form } from 'element-ui'
import FormItem from '@/Components/Form/FormItem/index.vue'
import { cloneData , traversalObject} from '@/utils/index'

var conf = {
  name: {
    /* 表单类型 */
    type: 'string',
    /* 表单 label */
    label: '姓名',
    /* 分组标识符 */
    group: 1,
    /* 当前组中的序号 */
    order: 2,
    /* 占位符 */
    placeholder: '姓名',
    /* 是否可清空 */
    clearable: true,
    /* 是否显示切换密码图标 */
    showPassword: true,
    /* 校验规则 */
    rules: [
      {
        validator(rule, value, handler) {
          handler()
        },
        trigger: 'blur',
        required: true
      }
    ]
  },
  password: {
    type: 'number',
    label: '密码',
    clearable: true,
    order: 1,
    group: 1
  },
  address: {
    type: 'string',
    label: '地址',
    group: 2
  }
}
export default {
  provide(){
    return {
      emit: this.emit,
      size: this.size
    }
  },
  name: 'XyForm',
  props: {
    /* 输入框的尺寸 */
    size: {
      type: String,
      default: 'small' /* medium / small / mini */
    },
    config: {
      type: Object,
      default: () => conf
    }
  },
  computed: {
    /**
     * 处理分组数据
     */
    groupFormConfig(){
      return this.handlerGroupFormConfig()
    },

    /**
     * 表单校验规则
     */
    rules(){
      return this.handlerGeneratorRules()
    },
  },
  mounted() {
    this.handlerReactData()
  },
  components: {
    Form,
    FormItem
  },

  data() {
    return {
      formData: {}
    }
  },
  methods: {
    /**
     * 初始化响应数据
     */
    handlerReactData(){
      for(const key in this.config){
        if(this.config.hasOwnProperty(key)){
          this.$set(this.formData, key, '')
        }
      }
    },

    /**
     * 向上emit
     */
    emit(methodName, data){
      this.$emit(methodName, data)
    },

    /**
     * 重新生成分组数据
     */
    handlerGroupFormConfig(){
      const oldConf = this.config // 深克隆方法暂时有bug
      const groupData = {}
      for(const key in oldConf) {
        if(oldConf.hasOwnProperty(key)) {
          const { group = 1, ...options } = oldConf[key]
          options.modelBin = key
          if(groupData[group] === undefined){
            groupData[group] = []
          }
          groupData[group].push(options)
        }
      }
      // 排序
      for(const key in groupData){
        if(groupData.hasOwnProperty(key)){
          const value = groupData[key];
          value.sort(({order: lOrder},{order: rOrder})=>{
            if(lOrder > rOrder){
              return 1
            }else if (lOrder<rOrder){
              return -1
            }else{
              return 0
            }
          })
        }
      }
      return groupData
    },

    /**
     * 根据表单配置生成校验规则
     */
    handlerGeneratorRules() {
      const generateRules = {}
      traversalObject(this.config, (key, { rules }) => {
        if ( rules ) {
          generateRules[key] = rules
        }
      })
      return generateRules
    }
  }
}
</script>

<style>

</style>