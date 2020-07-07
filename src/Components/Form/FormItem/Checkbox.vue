<!--
 * @Author: huangyuhui
 * @since: 2020-07-06 17:49:12
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-07 11:59:40
 * @message: 
 * @FilePath: \XY-component-vue\src\Components\Form\FormItem\Checkbox.vue
--> 
<template>
  <CheckboxGroup
    :id='modelBin'
    :disabled="options.disabled"
    :readonly="options.readonly"
    :title="formData[modelBin]"
    v-model="formData[modelBin]"
    :placeholder="options.placeholder"
    :size="size"
  >
    <!-- 遍历 checkboxOptions -->
    <Checkbox
      v-for="item of options.checkboxOptions"
      :key="item.id"
      :label="item.id"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </Checkbox>
  </CheckboxGroup>
</template>

<script>
import { debounce, traversalObject } from "@/utils/index";
import { CheckboxGroup, Checkbox } from "element-ui";
import { valueChangeEventMixins } from "@/Components/Form/FormItem/mixin.js";

export default {
  mixins: [valueChangeEventMixins],

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
  components: {
    CheckboxGroup,
    Checkbox,
  },
  get methods() {
    return {
      /**
       * 向上传递事件
       */
      hanldeEmit(emitName, ...args) {
        let data = [];

        for (const id of this.formData[this.modelBin]) {
          const checkedData = this.options.checkboxOptions.find(
            (item) => item.id === id
          );
          if (checkedData) {
            data.push({ sourceData: { ...checkedData }, checked: true });
          }
        }
        /**
         * emie 数据结构
         * {
         *    // 原选项数据
         *    sourceData：{ id, value, ...data},
         *    // 是否选中
         *    checked: Boolean
         * }
         */
        this.emit(emitName, {
          target: this.modelBin,
          data,
        });
      },
    };
  },
};
</script>

<style></style>
