<!--
 * @Author: huangyuhui
 * @since: 2020-06-01 08:48:25
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 11:32:21
 * @message: 表单Item组件
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\index.vue
-->
<template>
  <FormItem :label="options.label" :prop="options.modelBin">
    <component
      :is="inputType"
      :modelBin="modelBin"
      :formData="formData"
      :options="options"
      @handleRule="(rule) => $emit('handleRule', rule)"
      @checkingInput="(target) => $emit('checkingInput', target)"
    >
    </component>
  </FormItem>
</template>

<script>
import { FormItem } from "element-ui";

export default {
  name: "XyFormItem",
  props: {
    options: {
      props: Object,
      required: true,
    },

    formData: {
      type: Object,
      required: true,
    },

    modelBin: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      inputType: (this.options.type || "string") + "Component",
    };
  },
  components: {
    FormItem,
    stringComponent: () => import("@/Components/Form/FormItem/String.vue"),
    numberComponent: () => import("@/Components/Form/FormItem/Number.vue"),
    checkboxComponent: () => import("@/Components/Form/FormItem/Checkbox.vue"),
    switchComponent: () => import("@/Components/Form/FormItem/Switch.vue"),
    selectComponent: () => import("@/Components/Form/FormItem/Select.vue"),
    searchStringComponent: () =>
      import("@/Components/Form/FormItem/searchString"),
    lazyTreeSelectComponent: () =>
      import("@/Components/Form/FormItem/LezyTreeSelect.vue"),
    timeComponent: () => import("@/Components/Form/FormItem/Time.vue"),
    dateComponent: () => import("@/Components/Form/FormItem/Date.vue"),
  },
};
</script>

<style></style>
