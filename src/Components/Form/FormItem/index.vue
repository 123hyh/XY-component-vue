<template>
  <FormItem 
    :label="options.label" 
    :prop='options.modelBin'
  >
      <component
        :is='inputType'
        :modelBin='modelBin' 
        :formData='formData'
        :options='options'
      >
      </component>
  </FormItem>
</template>

<script>
import { FormItem } from 'element-ui'

export default {
  name: 'XyFormItem',
  props: {
    options:{
      props: Object,
      required: true
    },
    
    formData:{
      type: Object,
      required: true
    },

    modelBin: {
      type: String,
      require: true
    }
  },
  data(){
    return {
      inputType: this.options.type || 'string '
    }
  },
  components:{
    FormItem,
    string: ()=> import('@/Components/Form/FormItem/String.vue'),
    number: ()=>import('@/Components/Form/FormItem/Number.vue')
  },
}
</script>

<style >

</style>