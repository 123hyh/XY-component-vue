<!--
 * @Author: huangyuhui
 * @since: 2020-07-07 11:31:12
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 12:11:20
 * @message: 
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\Date.vue
-->
<template>
  <DatePicker
    :id="modelBin"
    :disabled="options.disabled"
    :readonly="options.readonly"
    :title="formData[modelBin]"
    v-model="formData[modelBin]"
    :type="options.dateType"
    :clearable="options.clearable"
    :size="size"
    start-placeholder="开始"
    end-placeholder="结束"
    :placeholder="options.placeholder"
    :picker-options="options.dateType === 'datetime' ? pickerOptions : null"
    :value-format="valueFormat"
    :format="valueFormat"
  >
  </DatePicker>
</template>

<script>
import { valueChangeEventMixins } from "@/Components/Form/FormItem/mixin.js";

import { DatePicker } from "element-ui";
export default {
  mixins: [valueChangeEventMixins],
  computed: {
    // 快捷方式
    pickerOptions: () => ({
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          },
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          },
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          },
        },
      ],
    }),
    valueFormat() {
      return this.options.valueFormat; /* || "yyyy-MM-dd HH:mm:ss"; */
    },
  },
  components: {
    DatePicker,
  },
  inject: {
    emit: {
      from: "emit",
      default: () => {},
    },
    size: ["size"],
  },

  props: {
    formData: {
      type: Object,
      required: true,
    },
    modelBin: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.el-date-editor {
  width: 100% !important;
  border-radius: 1px;
}
.el-range-editor.el-input__inner {
  padding: 3px 3px !important;
}
</style>
